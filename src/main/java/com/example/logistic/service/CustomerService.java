package com.example.logistic.service;

import com.example.logistic.DTO.CustomerDTO.*;
import com.example.logistic.common.LocationAPI;
import com.example.logistic.entity.Customers;
import com.example.logistic.entity.Services;
import com.example.logistic.repository.ICustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService implements ICustomerService{
    @Autowired
    private ICustomerRepository customerRepository;


    @Autowired
    private LocationAPI locationAPI;
    @Override
    public List<ListDTO> findAll() {
        return customerRepository.findAll()
                .stream()
                .map(req -> new ListDTO(
                        req.getCustomerCode(),
                        req.getCompanyName(),
                        req.getContactName(),
                        req.getContactPhone(),
                        req.getCustomerEmail(),
                        req.getCustomerAddress()
        ))
                .toList();
    }

    @Override
    public Customers findByTaxCode(String taxCode) {

        return customerRepository.findByTaxCode(taxCode)
                .orElseThrow(()->new RuntimeException("Customer not found"));
    }

    @Override
    public Customers findOrCreate(Customers customer) {
        return customerRepository.findByTaxCode(customer.getTaxCode())
                .orElseGet(()-> customerRepository.save(customer)); // Neu chua co cus -> tao, khong thi dung
    }

    @Override
    @Transactional
    public UpdateRespDTO updateCustomers(String customerCode, UpdateDTO dto) {
        Customers customers= customerRepository.findByCustomerCode(customerCode)
                .orElseThrow(()-> new RuntimeException("Customer not found"));

        customers.setCompanyName(dto.getCompanyName());
        customers.setContactName(dto.getContactName());
        customers.setCustomerEmail(dto.getEmail());
        customers.setCustomerAddress(dto.getCustomerAddress());
        customers.setContactPhone(dto.getPhone());
        customers.setTaxCode(dto.getTaxCode());
        Customers savedCustomer = customerRepository.save(customers);

        // Trả về DTO response
        return mapToRespDTO(savedCustomer);
    }

    @Override
    @Transactional
    public DetailDTO getCustomerDetail(String customerCode) {
        Customers customers= customerRepository.findByCustomerCode(customerCode)
                .orElseThrow(()-> new RuntimeException("Customer not found"));
        DetailDTO dto=new DetailDTO();
        dto.setCustomerCode(customers.getCustomerCode());
        dto.setCompanyName(customers.getCompanyName());
        dto.setContactName(customers.getContactName());
        dto.setCustomerEmail(customers.getCustomerEmail());
        dto.setCustomerAddress(customers.getCustomerAddress());
        dto.setContactPhone(customers.getContactPhone());
        dto.setTaxCode(customers.getTaxCode());

        return dto;
    }

    @Override
    public UpdateRespDTO createCustomer(CreateDTO dto) {
        Optional<Customers> existingCustomer = customerRepository.findByCustomerEmail(dto.getEmail());
        if (existingCustomer.isPresent()) {
            UpdateRespDTO respDTO= mapToRespDTO(existingCustomer.get());
            respDTO.setMessage("Customer already exist!");
            return respDTO;
        }

        // Map dữ liệu sang entity
        Customers customer = new Customers();
        customer.setCompanyName(dto.getCompanyName());
        customer.setContactName(dto.getContactName());
        customer.setContactPhone(dto.getPhone());
        customer.setCustomerEmail(dto.getEmail());
        customer.setCustomerAddress(dto.getCustomerAddress());
        customer.setTaxCode(dto.getTaxCode());

        Customers savedCustomer = customerRepository.save(customer);

        // Trả về DTO response
        return mapToRespDTO(savedCustomer);
    }

    @Override
    public List<ListDTO> searchCustomer(String contactPhone) {
        List<Customers> customers = customerRepository.searchCustomerPhone(contactPhone);

        if (customers == null || customers.isEmpty()) {
            return new ArrayList<>();
        }

        return customers.stream()
                .map(this::mapToListDTO)
                .collect(Collectors.toList());
    }


    private ListDTO mapToListDTO(Customers customers) {
            ListDTO dto= new ListDTO();
            dto.setCustomerCode(customers.getCustomerCode());
            dto.setCompanyName(customers.getCompanyName());
            dto.setContactName(customers.getContactName());
            dto.setContactPhone(customers.getContactPhone());
            dto.setCustomerEmail(customers.getCustomerEmail());
            dto.setCustomerAddress(customers.getCustomerAddress());
            return dto;
    }

    private UpdateRespDTO mapToRespDTO(Customers customer) {
        UpdateRespDTO resp = new UpdateRespDTO();
        resp.setCompanyName(customer.getCompanyName());
        resp.setCustomerCode(customer.getCustomerCode());
        resp.setContactName(customer.getContactName());
        resp.setCustomerEmail(customer.getCustomerEmail());
        resp.setCustomerAddress(customer.getCustomerAddress());
        resp.setContactPhone(customer.getContactPhone());
        resp.setTaxCode(customer.getTaxCode());
        resp.setMessage("Create new customer successfully!");
        return resp;
    }
}

