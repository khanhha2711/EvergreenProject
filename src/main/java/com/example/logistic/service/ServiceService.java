package com.example.logistic.service;

import com.example.logistic.DTO.ServiceDTO.CreateServiceDTO;
import com.example.logistic.DTO.ServiceDTO.ListDTO;
import com.example.logistic.DTO.ServiceDTO.ServiceResponeDTO;
import com.example.logistic.entity.Services;
import com.example.logistic.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService implements IServiceService{
    @Autowired
    private IServiceRepository serviceRepository;

    @Override
    public List<ListDTO> findAll() {
        return serviceRepository.findAll()
                .stream()
                .map(this::mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(Services services) {
        ListDTO dto = new ListDTO();
        dto.setServiceCode(services.getServiceCode());
        dto.setServiceName(services.getServiceName());
        dto.setDescription(services.getDescription());
        dto.setStatus(services.getStatus());
        dto.setUnit(services.getUnit());
        dto.setPrice(services.getPrice());
        return dto;
    }

    @Override
    public ServiceResponeDTO detailService(String serviceCode) {
        Services services=serviceRepository.findByServiceCode(serviceCode);
        ServiceResponeDTO dto= new ServiceResponeDTO();
        dto.setServiceCode(services.getServiceCode());
        dto.setServiceName(services.getServiceName());
        dto.setDescription(services.getDescription());
        dto.setStatus(services.getStatus());
        dto.setUnit(services.getUnit());
        dto.setPrice(services.getPrice());
        return dto;
    }

    @Override
    public String createService(CreateServiceDTO dto) {
        boolean check= serviceRepository.existsByServiceNameAndUnit(dto.getServiceName(),dto.getUnit());
        if(check){
            throw new RuntimeException("The service already exists.");
        }
        String type = "40' Cont";
        String type2="20' Cont";
        Services services= new Services();
        services.setServiceName(dto.getServiceName());
        services.setUnit(dto.getUnit());
        services.setPrice(dto.getPrice());
        services.setDescription(dto.getDescription());
        services.setStatus("ACTIVE");
        if(type.equalsIgnoreCase(dto.getUnit())){
            services.setCapacity(23000);
        }else if(type2.equalsIgnoreCase(dto.getUnit())){
            services.setCapacity(26000);
        }

        serviceRepository.save(services);
        return "Service added successfully.";
    }

    @Override
    public String updateService(String serviceCode) {
        Services oldService= serviceRepository.findByServiceCode(serviceCode);

        if(oldService ==null){
            throw new RuntimeException("Invalid service");
        }

        if("ACTIVE".equalsIgnoreCase(oldService.getStatus())){
            oldService.setStatus("INACTIVE");
        }else if("INACTIVE".equalsIgnoreCase(oldService.getStatus())){
            oldService.setStatus("ACTIVE");
        }
        else {
            throw new RuntimeException("Invalid status value");
        }
       serviceRepository.save(oldService);
        return "Update successfully";
    }

    @Override
    public void deleteService(String serviceCode) {
        Services services= serviceRepository.findByServiceCode(serviceCode);
        serviceRepository.delete(services);
    }

    @Override
    public List<ListDTO> findByServiceName(String serviceName) {
        Services services=serviceRepository.findByServiceName(serviceName);
        if(services == null){
            return new ArrayList<>();
        }
        return List.of(mapToListDTO(services));
    }
}