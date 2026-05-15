package com.example.logistic.service;

import com.example.logistic.DTO.RequestDTO.*;
import com.example.logistic.common.LocationAPI;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RequestService implements IRequestService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ICustomerRepository customerRepository;

    @Autowired
    private IServiceRepository serviceRepository;
    @Autowired
    private IRequestRepository requestRepository;
    @Autowired
    private LocationAPI locationAPI;

    @Autowired
    private IServiceDetailRepository serviceDetailRepository;

    @Override
    public List<ListRespDTO> findAll() {
        return requestRepository.findAllByOrderByRequestCodeDesc()
                .stream()
                .map(req -> new ListRespDTO(
                        req.getRequestCode(),
                        req.getCustomer().getCompanyName(),
                        req.getCustomer().getContactName(),
                        req.getCustomer().getContactPhone(),
                        req.getCustomer().getCustomerEmail(),
                        req.getStatus(),
                        req.getCreatedAt()
                ))
                .toList();
    }

    @Transactional
    @Override
    public ListRespDTO createRequest(CreateRequestDTO requestDTO) {

        CustomerDTO customerDTO = requestDTO.getCustomer();
        Customers customers = customerRepository.findByCustomerEmail(customerDTO.getEmail())
                .orElseGet(() -> {
                    Customers newCustomer = new Customers();
                    newCustomer.setCompanyName(customerDTO.getCompanyName());
                    newCustomer.setContactName(customerDTO.getContactName());
                    newCustomer.setCustomerEmail(customerDTO.getEmail());
                    newCustomer.setContactPhone(customerDTO.getPhone());
                    newCustomer.setCustomerAddress(customerDTO.getCustomerAddress());
                    newCustomer.setTaxCode(customerDTO.getTaxCode());
                    return customerRepository.save(newCustomer);
                });
        // Service
       List<String> serviceCode= requestDTO.getCustomer().getService();
       List<Services> listService= serviceRepository.findActiveServices(serviceCode);

       if(listService.isEmpty()){
           throw new RuntimeException("No services found for codes: "+serviceCode);
       }


        // Request
        Requests req = new Requests();
        req.setCustomer(customers);
        req.setCargoName(requestDTO.getCargo().getCargoName());
        req.setCargoCategory(requestDTO.getCargo().getCargoCategory());
        req.setPackageCount(requestDTO.getCargo().getPackageCount());
        req.setGrossWeight(requestDTO.getCargo().getGrossWeight());
        req.setCargoValue(requestDTO.getCargo().getCargoValue());

        req.setOrigin(requestDTO.getTransport().getOrigin());
        req.setDestination(requestDTO.getTransport().getDestination());
        req.setIncoterm(requestDTO.getTransport().getIncoterm());
        req.setContainerType(requestDTO.getTransport().getContainerType());

        req.setQuantityContainer(1);
        req.setStatus("NEW");
        req.setCreatedAt(requestDTO.getTransport().getDate());

        requestRepository.save(req);
        entityManager.refresh(req);


        for(Services s:listService){
            int quantity=1;
            String containerType = requestDTO.getTransport().getContainerType();

            if (containerType != null
                    && containerType.equalsIgnoreCase(s.getUnit())
                    && s.getCapacity() > 0) {

                quantity = (int) Math.ceil(
                        (double) requestDTO.getCargo().getGrossWeight() / s.getCapacity()
                );

            } else {
                // 👉 các service khác
                quantity = 1;
            }
            req.setQuantityContainer(quantity);
            ServiceDetail rs= new ServiceDetail();
            rs.setService(s);
            rs.setRequest(req);
            serviceDetailRepository.save(rs);
        }

        return new ListRespDTO(
                req.getRequestCode(),
                customers.getCompanyName(),
                customers.getContactName(),
                customers.getContactPhone(),
                customers.getCustomerEmail(),
                req.getStatus(),
                req.getCreatedAt()
        );
    }

    @Override
    public RequestResponeDTO detailRequest(String requestCode) {
        Requests requests=requestRepository.findByRequestCode(requestCode);
        if(requests==null){
            throw  new RuntimeException("Request not found");
        }

        return mapToDTO(requests);
    }

    @Override
    public ResponseEntity<String> deleteRequest(String requestCode) {
        Requests requests=requestRepository.findByRequestCode(requestCode);
        requestRepository.delete(requests);
        return  ResponseEntity.ok("Delete successfully");
    }

    @Override
    public List<ListRespDTO> search(String phone,String status) {
        List<Requests> list = requestRepository.findByCustomerPhoneAndFilter(phone,status);

        return list.stream()
                .map(req -> new ListRespDTO(
                        req.getRequestCode(),
                        req.getCustomer().getCompanyName(),
                        req.getCustomer().getContactName(),
                        req.getCustomer().getContactPhone(),
                        req.getCustomer().getCustomerEmail(),
                        req.getStatus(),
                        req.getCreatedAt()
                ))
                .toList();

    }



    private RequestResponeDTO mapToDTO(Requests req) {
        RequestResponeDTO dto =new RequestResponeDTO();

        dto.setRequestCode(req.getRequestCode());
        dto.setStatus(req.getStatus());
        dto.setCompanyName(req.getCustomer().getCompanyName());
        dto.setContactName(req.getCustomer().getContactName());
        dto.setCustomerAddress(req.getCustomer().getCustomerAddress());
        dto.setContactPhone(req.getCustomer().getContactPhone());
        dto.setCustomerEmail(req.getCustomer().getCustomerEmail());
        dto.setTaxCode(req.getCustomer().getTaxCode());
        dto.setCreatedAt(req.getCreatedAt() != null ? LocalDate.parse(req.getCreatedAt().toString()) : null);

        dto.setCargoName(req.getCargoName());
        dto.setCargoCategory(req.getCargoCategory());
        dto.setGrossWeight(req.getGrossWeight());
        dto.setPackageCount(req.getPackageCount());
        dto.setQuantityContainer(req.getQuantityContainer());
        dto.setCargoValue(req.getCargoValue());

        dto.setIncoterm(req.getIncoterm());
        dto.setOrigin(req.getOrigin());
        dto.setDestination(req.getDestination());
        dto.setContainerType(req.getContainerType());

        List<String> serviceCodes = req.getRequestServices()
                .stream()
                .map(rs -> rs.getService().getServiceName())
                .toList();

        dto.setServiceCode(serviceCodes);

        return dto;
    }
    //Sort trạng thái V
}
