package com.example.logistic.service;

import com.example.logistic.DTO.QuotationDTO.ListQuoDTO;
import com.example.logistic.DTO.QuotationDTO.QuotationResponseDTO;
import com.example.logistic.DTO.QuotationDTO.SummaryDTO;
import com.example.logistic.DTO.QuotationDTO.UpdateQuotationDTO;
import com.example.logistic.DTO.RequestDTO.*;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service

public class QuotationService implements IQuotationService{
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private IRequestRepository repository;
    @Autowired
    private IServiceRepository serviceRepository;
    @Autowired
    private IQuotationRepository quotationRepository;
    @Autowired
    private IQuotationDetailRepository quotationDetailRepository;
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Override
    public List<ListQuoDTO> findAll() {
        return quotationRepository.findAllByOrderByQuotationCodeDesc()
                .stream()
                .map(req ->new ListQuoDTO(
                        req.getQuotationCode(),
                        req.getRequest().getCustomer().getContactName(),
                        req.getRequest().getCustomer().getCompanyName(),
                        req.getEmployee().getUser().getUserName(),
                        req.getCreatedAt(),
                        req.getTotalPrice(),
                        req.getStatus()
                ))
                .toList();
    }


    @Override
    @Transactional
    public QuotationResponseDTO createQuotation(String requestCode, String employeeCode) {

        Requests requests=repository.findByRequestCode(requestCode);
        if(requests ==null){
            throw new RuntimeException("Request not found");
        }
        Quotations check=quotationRepository.findByRequest(requests);
        if(check !=null){
            throw  new RuntimeException("Quotation for this request already exists");
        }
        requests.setStatus("DONE");
        repository.save(requests);
        Employees employees= employeeRepository.findByEmployeeCode(employeeCode);
        Quotations quotations=new Quotations();
        quotations.setRequest(requests);
        quotations.setEmployee(employees);
        quotations.setStatus("DRAFT");
        quotations.setCreatedAt(LocalDate.now());

        quotationRepository.save(quotations);
        entityManager.refresh(quotations);

        List<ServiceDetail> list= requests.getRequestServices();
        double total=0;
        List<QuotationDetail> details= new ArrayList<>();

        for(ServiceDetail rs: list){
            Services services= rs.getService();
            int quantity=1;
            if(requests.getContainerType().equalsIgnoreCase(services.getUnit())){
                quantity=(int) Math.ceil(
                        requests.getGrossWeight()/services.getCapacity()
                );
            }
            QuotationDetail detail=new QuotationDetail();
            detail.setQuotation(quotations);
            detail.setService(services);
            detail.setQuantity(quantity);
            quotationDetailRepository.save(detail);
            details.add(detail);
            total+=quantity*services.getPrice();
        }
        quotations.setTotalPrice(total);
        quotationRepository.save(quotations);
        return mapToRespone(quotations,details,requests);

    }

    @Override
    public QuotationResponseDTO detailQuotation(String quotationCode) {
        Quotations quotations=quotationRepository.findByQuotationCode(quotationCode)
                .orElseThrow(()-> new RuntimeException("Quotation not found"));
        List<QuotationDetail> detail=quotationDetailRepository.findByQuotationId(quotations.getId());
        Requests requests=quotations.getRequest();
        return mapToRespone(quotations,detail,requests);
    }

    @Override
    @Transactional
    public void updateStatus(String quotationCode, String status) {
        Quotations quotations= quotationRepository.findByQuotationCode(quotationCode).orElseThrow(()->new RuntimeException("Not Found"));
        quotations.setStatus(status);
        quotationRepository.save(quotations);
    }

    @Override
    public List<ListQuoDTO> searchAndFilter(String search, String filter) {
        List<Quotations> quotations = quotationRepository.findBySearchAndFilter(
                (search == null || search.isEmpty()) ? null : search,
                (filter == null || filter.isEmpty()) ? null : filter
        );
        return quotations.stream()
                .map(req -> new ListQuoDTO(
                        req.getQuotationCode(),
                        req.getRequest().getCustomer().getContactName(),
                        req.getRequest().getCustomer().getCompanyName(),
                        req.getEmployee().getUser().getUserName(),
                        req.getCreatedAt(),
                        req.getTotalPrice(),
                        req.getStatus()
                ))
                .toList();
    }

    @Override
    @Transactional
    public void updateQuotation(String quotationCode,UpdateQuotationDTO dto) {
        Quotations quotations= quotationRepository.findByQuotationCode(quotationCode)
                .orElseThrow(()-> new RuntimeException("Quotation not found"));
       List<QuotationDetail> details = quotationDetailRepository.findByQuotationId(quotations.getId());
       Map<String, QuotationDetail> mapExisting = details.stream()
                .collect(Collectors.toMap(d -> d.getService().getServiceCode(), d -> d));
       double total=0;
       List<QuotationDetail> updateDetails= new ArrayList<>();
       for(ItemDTO itemDTO: dto.getData()){
           QuotationDetail detail;
           if(mapExisting.containsKey(itemDTO.getId())){
               detail=mapExisting.get(itemDTO.getId());
               detail.setQuantity(itemDTO.getQuantity());
           }else{
               Services services= serviceRepository.findByServiceCode(itemDTO.getId());
               detail =new QuotationDetail();
               detail.setQuotation(quotations);
               detail.setService(services);
               detail.setQuantity(itemDTO.getQuantity());
               quotationDetailRepository.save(detail);
           }
           updateDetails.add(detail);
           total+=detail.getQuantity() *detail.getService().getPrice();
       }
       for(QuotationDetail oldDetail: details){
           if(dto.getData().stream().noneMatch(i->i.getId().equalsIgnoreCase(oldDetail.getService().getServiceCode()))){
               quotationDetailRepository.delete(oldDetail);
           }
       }
       quotations.setTotalPrice(total);
       quotationRepository.save(quotations);
    }


    private QuotationResponseDTO mapToRespone(
            Quotations quotations, List<QuotationDetail> detail,
            Requests requests) {

        QuotationResponseDTO res = new QuotationResponseDTO();

        res.setId(quotations.getQuotationCode());
        res.setStatus(quotations.getStatus());
        res.setCreatedAt(quotations.getCreatedAt()!=null
                        ? quotations.getCreatedAt().toString():null
        );

// customer
        CustomerDTO cus = new CustomerDTO();
        cus.setCompanyName(requests.getCustomer().getCompanyName());
        cus.setContactName(requests.getCustomer().getContactName());
        cus.setPhone(requests.getCustomer().getContactPhone());
        cus.setEmail(requests.getCustomer().getCustomerEmail());
        cus.setCustomerAddress(requests.getCustomer().getCustomerAddress());
        cus.setTaxCode(requests.getCustomer().getTaxCode());
        cus.setService(
                requests.getRequestServices() !=null
                ? requests.getRequestServices()
                        .stream()
                        .map(sd->sd.getService().getServiceCode())
                        .toList()
                        :List.of()
        );
        res.setCustomer(cus);


        TransportDTO transportDTO= new TransportDTO();
        transportDTO.setOrigin(requests.getOrigin());
        transportDTO.setDestination(requests.getDestination());
        transportDTO.setIncoterm(requests.getIncoterm());
        transportDTO.setContainerType(requests.getContainerType());
        transportDTO.setDate(requests.getCreatedAt());
        res.setTransportDTO(transportDTO);

// cargo
        CargoDTO cargo = new CargoDTO();
        cargo.setCargoName(requests.getCargoName());
        cargo.setCargoCategory(requests.getCargoCategory());
        cargo.setPackageCount(requests.getPackageCount());
        cargo.setGrossWeight(requests.getGrossWeight());
        cargo.setCargoValue((int) requests.getCargoValue());
        res.setCargo(cargo);

// item
        List<ItemDTO> items = detail.stream().map(d -> {

            double subtotal = d.getQuantity() * d.getService().getPrice();

            ItemDTO item = new ItemDTO();
            item.setId(d.getService().getServiceCode());
            item.setName(d.getService().getServiceName());
            item.setQuantity(d.getQuantity());
            item.setUnit(d.getService().getUnit());
            item.setUnitPrice(d.getService().getPrice());
            item.setTotal(subtotal);

            return item;

        }).collect(Collectors.toList());

        res.setItems(items);

// summary
        double subtotal = items.stream()
                .mapToDouble(ItemDTO::getTotal)
                .sum();

        double vat = subtotal * 0.1;
        double totalAmount = subtotal + vat;

        SummaryDTO summary = new SummaryDTO();
        summary.setTotalItems(
                items.stream().mapToInt(ItemDTO::getQuantity).sum()
        );
        summary.setSubtotal(subtotal);
        summary.setVatPercent(10);
        summary.setVatAmount(vat);
        summary.setTotalAmount(totalAmount);

        res.setSummary(summary);

        //employee

        ActivityDTO activityDTO=new ActivityDTO();
        activityDTO.setAction("Create a quote");
        activityDTO.setUser(quotations.getEmployee().getUser().getUserName());
        activityDTO.setTimestamp(
                quotations.getCreatedAt() !=null
                ? quotations.getCreatedAt().toString()
                        :null
        );
        res.setActivityLogs(List.of(activityDTO));

        return res;

    }
}
