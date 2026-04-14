package com.example.logistic.controller;

import com.example.logistic.DTO.CustomerDTO.*;
import com.example.logistic.DTO.RequestDTO.CustomerDTO;
import com.example.logistic.entity.Customers;
import com.example.logistic.service.ICustomerService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping("")
    public List<ListDTO> listCustomer(@RequestParam (value = "search",required = false) String search){
        if (search == null || search.isEmpty()) {
            return customerService.findAll();
        }
        return customerService.searchCustomer(search);
    }
    @PostMapping ("/Create")
    public  ResponseEntity<UpdateRespDTO> createCustomers(@RequestBody CreateDTO customers){

        UpdateRespDTO respDTO=customerService.createCustomer(customers);
        return ResponseEntity.ok(respDTO);
    }
    @GetMapping("/Detail/{customerCode}")
    public ResponseEntity<DetailDTO> getCustomerDetail(@PathVariable("customerCode") String customerCode){
        return ResponseEntity.ok(customerService.getCustomerDetail(customerCode));
    }

    @PutMapping("/Update/{customerCode}")
    @Transactional
    public ResponseEntity<UpdateRespDTO> updateCustomer(@PathVariable ("customerCode") String customerCode,
                                                        @RequestBody UpdateDTO dto){
        return  ResponseEntity.ok(customerService.updateCustomers(customerCode,dto));
    }

}
