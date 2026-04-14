package com.example.logistic.service;

import com.example.logistic.DTO.CustomerDTO.*;
import com.example.logistic.entity.Customers;

import java.util.List;

public interface ICustomerService {
    List<ListDTO> findAll();
    Customers findByTaxCode(String taxCode);
    Customers findOrCreate(Customers customer);
    UpdateRespDTO updateCustomers(String customerCode, UpdateDTO dto);
//    void deleteCustomers(int id);
    DetailDTO getCustomerDetail(String customerCode);
    UpdateRespDTO createCustomer(CreateDTO customers);
    List<ListDTO> searchCustomer(String contactPhone);
    //done
}
