package com.example.logistic.service;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.example.logistic.DTO.Contracts.Detail.ContentDTO;
import com.example.logistic.DTO.Contracts.Detail.CustomerContractDTO;
import com.example.logistic.DTO.Contracts.Detail.RespDTO;
import com.example.logistic.DTO.Contracts.ListDTO;
import com.example.logistic.DTO.Contracts.RequestDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.common.FileService;
import com.example.logistic.common.LocationAPI;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class ContractService implements IContractService{

    @Autowired
    private IContractRepository contractRepository;
    @Autowired
    private IQuotationRepository quotationRepository;
    @Autowired
    private ICargoRepository cargoRepository;
    @Autowired
    private IShipmentRepository shipmentRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private LocationAPI locationAPI;

    @Autowired
    private IShipmentStatusRepository shipmentStatusRepository;
    public static final String UPLOAD_DIR = "D:/TTTN/Uploads/contracts/";
    @Override
    public List<ListDTO> findAll() {
        return contractRepository.findAllByOrderByContractCodeDesc()
                .stream().map(this ::mapToListDTO)
                .toList();
    }

    @Override
    public RespDTO DetailContract(String contractCode) throws IOException {
        Contracts contracts = contractRepository.findByContractCode(contractCode);
        if(contracts == null ){
            throw new RuntimeException("Contract not found");
        }
        RespDTO dto= new RespDTO();
        dto.setContractCode(contracts.getContractCode());
        dto.setContractNumber(contracts.getContractNumber());
        dto.setContractName(contracts.getContractName());
        dto.setQuotationCode(contracts.getQuotations().getQuotationCode());
        dto.setSignedDate(contracts.getSignedDate());
        dto.setExpiredDate(contracts.getExpiredDate());
        dto.setContractStatus(contracts.getContractStatus());

        Customers customers= contracts.getQuotations().getRequest().getCustomer();

        CustomerContractDTO customerDTO= new CustomerContractDTO();
        customerDTO.setCompanyName(customers.getCompanyName());
        customerDTO.setCustomerEmail(customers.getCustomerEmail());
        customerDTO.setContactName(customers.getContactName());
        customerDTO.setContactPhone(customers.getContactPhone());
        dto.setCustomer(customerDTO);

        Employees employees= contracts.getQuotations().getEmployee();
        ActivityDTO activityDTO= new ActivityDTO();
        activityDTO.setAction("View the contract");
        activityDTO.setUser(employees.getUser().getUserName());
        activityDTO.setTimestamp(contracts.getCreatedAt()!=null
                ? contracts.getCreatedAt().toString():null
        );
        dto.setActivity(activityDTO);

        if(contracts.getAttachment() != null){
            AttachmentDTO attachmentDTO= fileService.buildAttachment(
                    contracts.getAttachment(),
                    UPLOAD_DIR,
                    "/contracts/"+contractCode+"/file"
            );
            dto.setAttachment(attachmentDTO);
        }
        return dto;
    }
    @Override
    public ResponseEntity<Resource> loadFile(String contractCode) throws IOException {
        Contracts contracts = contractRepository.findByContractCode(contractCode);
        if (contracts == null || contracts.getAttachment() == null) {
            return ResponseEntity.notFound().build();
        }
        return fileService.loadFile(contracts.getAttachment(),UPLOAD_DIR);
    }

    @Override
    public List<ListDTO> searchAndFilter(String search, String filter) {
        List<Contracts> contracts= contractRepository.findBySearchAndFilter(
                (search == null || search.isEmpty()) ? null : search,
                (filter == null || filter.isEmpty()) ? null : filter
        );
        return contracts.stream()
                .map(this::mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(Contracts contracts) {
        ListDTO dto=new ListDTO();
        dto.setContractCode(contracts.getContractCode());
        dto.setContractNumber(contracts.getContractNumber());
        dto.setContractName(contracts.getContractName());
        dto.setSignedDate(contracts.getSignedDate());
        dto.setExpiredDate(contracts.getExpiredDate());
        dto.setContractStatus(contracts.getContractStatus());
        return dto;
    }


    @Override
    @Transactional
    public String createContract(RequestDTO dto, MultipartFile file) throws IOException {
        Quotations quotations=quotationRepository.findByQuotationCode(dto.getQuotationCode()).orElseThrow(()-> new RuntimeException("Quotation not found"));
        if(contractRepository.existsByQuotations(quotations)){
            throw new RuntimeException("This quote has already been contracted. It cannot be renewed.");
        }
        quotations.setStatus("DONE");
        if(dto.getContractNumber()!=null){
            throw new RuntimeException("Contract number already!");
        }
        String attachment= fileService.uploadFile(file,UPLOAD_DIR);
        Contracts contracts= new Contracts();
        contracts.setQuotations(quotations);
        contracts.setContractName(dto.getContractName());
        contracts.setContractNumber(dto.getContractNumber());
        contracts.setSignedDate(dto.getSignedDate());
        contracts.setExpiredDate(dto.getExpiredDate());
        contracts.setContractStatus("ACTIVE");
        contracts.setCreatedAt(LocalDate.now());
        contracts.setAttachment(attachment);

        contractRepository.save(contracts);

        Requests req= quotations.getRequest();
        Cargo cargo= new Cargo();
        cargo.setCargoName(req.getCargoName());
        cargo.setCargoCategory(req.getCargoCategory());
        cargo.setTotalWeight(req.getGrossWeight());
        cargo.setQuantity(req.getQuantityContainer());
        cargo.setPackageCount(req.getPackageCount());
        cargo.setGoodValue(req.getCargoValue());
        cargoRepository.save(cargo);

        Shipments shipments= new Shipments();

        shipments.setContract(contracts);
        shipments.setCargo(cargo);
        shipments.setOrigin(req.getOrigin());

        // địa chỉ khách hàng

        Map<String,Double> geo= locationAPI.getLatLongFromAddress(req.getOrigin());
        if(geo!= null){
           shipments.setLatitude(geo.get("lat"));
            shipments.setLongitude(geo.get("lon"));
        }
        shipments.setDestination(req.getDestination());
        shipments.setDepartureDate(req.getCreatedAt());
        shipments.setEstimatedArrival(contracts.getExpiredDate());
        shipments.setStatus("Document Update");
        shipments.setCreatedAt(LocalDate.now());
        shipmentRepository.save(shipments);

        ShipmentStatus shipmentStatus= new ShipmentStatus();

        shipmentStatus.setShipment(shipments);
        shipmentStatus.setStatus(shipments.getStatus());
        shipmentStatus.setUpdatedAt(shipments.getCreatedAt());
        shipmentStatusRepository.save(shipmentStatus);

        return contracts.getContractCode();
    }

}
