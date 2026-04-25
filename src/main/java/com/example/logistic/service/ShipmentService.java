package com.example.logistic.service;

import com.example.logistic.DTO.CustomerDTO.UpdateDTO;
import com.example.logistic.DTO.Declarations.LaneAndLogDTO;
import com.example.logistic.DTO.Declarations.LogDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.DTO.RequestDTO.CargoDTO;
import com.example.logistic.DTO.ShipmentDTO.ListDTO;
import com.example.logistic.DTO.ShipmentDTO.OverViewDTO;
import com.example.logistic.DTO.ShipmentDTO.Page1DTO.InformationDTO;
import com.example.logistic.DTO.ShipmentDTO.StatusDTO;
import com.example.logistic.DTO.ShipmentDTO.TruckInforDTO;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShipmentService implements  IShipmentService{
    @Autowired
    private IShipmentRepository shipmentRepository;
    @Autowired
    private ICusDeclarationRepository cusDeclarationRepository;
    @Autowired
    private IVesselBookingRepository vesselBookingRepository;
    @Autowired
    private ILogDeclarationRepository logDeclarationRepository;
    @Autowired
    private IShipmentStatusRepository shipmentStatusRepository;
    @Autowired
    private ITruckRepository truckRepository;
    @Autowired
    private ITruckStatusRepository truckStatusRepository;

    @Override
    public List<ListDTO> findAll() {
        return shipmentRepository.findAllByOrderByShipmentCodeDesc()
                .stream()
                .map(this:: mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(Shipments shipments) {
        ListDTO dto= new ListDTO();
        dto.setShipmentCode(shipments.getShipmentCode());
        dto.setCompanyName(shipments.getContract().getQuotations().getRequest().getCustomer().getCompanyName());
        dto.setOrigin(shipments.getOrigin());
        dto.setDestination(shipments.getDestination());
        dto.setDepartureDate(shipments.getDepartureDate());
        dto.setEstimatedArrival(shipments.getEstimatedArrival());
        dto.setCreatedAt(shipments.getCreatedAt());
        dto.setStatus(shipments.getStatus());
        return dto;
    }

    @Override
    public List<ListDTO> searchAndFilter(String search, String filter) {
        List<Shipments> shipments= shipmentRepository.searchAndFilterShipment(
                (search == null || search.isEmpty()) ? null : search,
                (filter == null || filter.isEmpty()) ? null : filter
        );
        return shipments.stream()
                .map(this::mapToListDTO)
                .toList();
    }

    @Override
    @Transactional
    public InformationDTO detailInfor(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw new RuntimeException("Shipment not found");
        }
        InformationDTO informationDTO= new InformationDTO();
        informationDTO.setShipmentCode(shipments.getShipmentCode());
        informationDTO.setContractCode(shipments.getContract().getContractCode());
        informationDTO.setDepartureDate(shipments.getDepartureDate());
        informationDTO.setEstimatedArrival(shipments.getEstimatedArrival());
        informationDTO.setOrigin(shipments.getOrigin());
        informationDTO.setDestination(shipments.getDestination());

        List<String> serviceName= shipments.getContract().getQuotations()
                                            .getQuotationDetails()
                                            .stream()
                                            .map(rs -> rs.getService().getServiceName())
                                            .toList();
        informationDTO.setService(serviceName);

        Customers customers= shipments.getContract().getQuotations().getRequest().getCustomer();

        UpdateDTO customerDTO= new UpdateDTO();
        customerDTO.setCompanyName(customers.getCompanyName());
        customerDTO.setContactName(customers.getContactName());
        customerDTO.setPhone(customers.getContactPhone());
        customerDTO.setEmail(customers.getCustomerEmail());
        customerDTO.setCustomerAddress(customers.getCustomerAddress());
        customerDTO.setTaxCode(customers.getTaxCode());

        informationDTO.setCustomer(customerDTO);

        Cargo cargo= shipments.getCargo();
        CargoDTO cargoDTO= new CargoDTO();
        cargoDTO.setCargoName(cargo.getCargoName());
        cargoDTO.setCargoCategory(cargo.getCargoCategory());
        cargoDTO.setPackageCount(cargo.getPackageCount());
        cargoDTO.setGrossWeight(cargo.getTotalWeight());
        cargoDTO.setCargoValue(cargo.getGoodValue());

        informationDTO.setCargo(cargoDTO);

        Employees employees= shipments.getContract().getQuotations().getEmployee();
        ActivityDTO activity= new ActivityDTO();
        activity.setAction("Shipment information");
        activity.setTimestamp(shipments.getCreatedAt()!=null
                ? shipments.getCreatedAt().toString():null);
        activity.setUser(employees.getUser().getUserName());
        informationDTO.setActivity(activity);

        return informationDTO;
    }

    @Override
    @Transactional
    public String updateStatus(String shipmentCode, StatusDTO dto) {
        Shipments shipments = shipmentRepository.findByShipmentCode(shipmentCode);
        if (shipments == null) {
            throw new RuntimeException("Shipment not found");
        }

        String status = dto.getStatus().toUpperCase();

        CusDeclarations cusDeclarations = cusDeclarationRepository.findByShipmentCode(shipmentCode);
        VesselBookings vesselBookings = vesselBookingRepository.findByShipment(shipments);
        List<Trucks> trucks= truckRepository.findAllByShipment(shipments);
        if ("CLEARANCE".equals(status)) {


            cusDeclarations.setStatus("DONE");
            shipments.setStatus("Clearance");
            saveShipmentStatus(shipments, "Clearance");

            shipments.setStatus("Transportation");
            saveShipmentStatus(shipments, "Transportation");

            LogDeclarations log = new LogDeclarations();
            log.setDeclarations(cusDeclarations);
            log.setTitle(status);
            log.setCreatedAt(LocalDateTime.now());
            log.setDescription("Lô hàng đã được thông quan");
            logDeclarationRepository.save(log);

        } else if ("TRANSPORT".equals(status)) {

            vesselBookings.setStatus("DONE");
            for(Trucks t: trucks){
                t.setStatus("Booking Confirmed");
            }
            truckRepository.saveAll(trucks);
            shipments.setStatus("Transportation");
            saveShipmentStatus(shipments, "Transportation");
        }
        shipmentRepository.save(shipments);
        return "Update Successfully";
    }

    @Override
    public List<OverViewDTO> getView(String shipmentCode) {

        Shipments shipment = shipmentRepository.findByShipmentCode(shipmentCode);
        if (shipment == null) {
            throw new RuntimeException("Shipment not found");
        }

        CusDeclarations declaration = cusDeclarationRepository.findByShipmentCode(shipmentCode);

        List<ShipmentStatus> histories = shipmentStatusRepository.findByShipmentOrderByUpdatedAtAsc(shipment);

        List<OverViewDTO> result = new ArrayList<>();

        for (ShipmentStatus h : histories) {

            OverViewDTO dto = new OverViewDTO();

            dto.setStatus(h.getStatus());
            dto.setUpdatedAt(h.getUpdatedAt());

            if ("Customs Declaration".equalsIgnoreCase(h.getStatus())
                    && declaration != null) {

                LogDeclarations logEntity = logDeclarationRepository.findTopByDeclarationsOrderByCreatedAtDesc(declaration);

                LaneAndLogDTO laneAndLog = new LaneAndLogDTO();
                laneAndLog.setLane(declaration.getLane());

                if (logEntity != null) {
                    LogDTO logDTO = new LogDTO();
                    logDTO.setTitle(logEntity.getTitle());
                    logDTO.setCreatedAt(logEntity.getCreatedAt());
                    logDTO.setDescription(logEntity.getDescription());
                    laneAndLog.setLogDTO(logDTO);
                }

                dto.setDto(laneAndLog);

            }
            else if("Transportation".equalsIgnoreCase(h.getStatus())){
                List<Trucks> trucksList= truckRepository.findAllByShipment(shipment);

                List<TruckInforDTO> inforDTOS= new ArrayList<>();
                boolean allDelivered = true;
                for(Trucks t: trucksList){
                    TruckStatus late= truckStatusRepository.findLatestByTruckId(t.getId());

                    TruckInforDTO info= new TruckInforDTO();
                    info.setTruckCode(t.getTruckCode());
                    info.setStatus(t.getStatus());
                    if(late !=null){
                        info.setLocation(late.getLocation());
                        info.setUpdateAt(late.getUpdatedAt());
                    }
                    inforDTOS.add(info);

                    if(!"Delivered".equalsIgnoreCase(t.getStatus())){
                        allDelivered= false;
                    }
                }
                dto.setTruckInforDTO(inforDTOS);

                if (allDelivered && !trucksList.isEmpty()) {
                    shipment.setStatus("Completed");
                    shipmentRepository.save(shipment);
                }
            }
            else {
                dto.setDto(null);
            }

            result.add(dto);
        }

        return result;
    }

    private void saveShipmentStatus(Shipments shipments, String status) {
        ShipmentStatus shipmentStatus = new ShipmentStatus();
        shipmentStatus.setShipment(shipments);
        shipmentStatus.setStatus(status);
        shipmentStatus.setUpdatedAt(LocalDate.now());
        shipmentStatusRepository.save(shipmentStatus);
    }

}
