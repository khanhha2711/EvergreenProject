package com.example.logistic.service;

import com.example.logistic.DTO.ServiceDTO.CreateServiceDTO;
import com.example.logistic.DTO.ServiceDTO.ListDTO;
import com.example.logistic.DTO.ServiceDTO.ServiceResponeDTO;

import java.util.List;

public interface IServiceService {
    List<ListDTO> findAll();
    ServiceResponeDTO detailService(String serviceCode);
    String createService(CreateServiceDTO dto);
    String updateService(String serviceCode);
    void deleteService(String serviceCode);
    List<ListDTO> findByServiceName(String serviceName);
}
