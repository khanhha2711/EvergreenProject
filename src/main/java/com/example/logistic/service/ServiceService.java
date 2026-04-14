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
        dto.setUnit(services.getUnit());
        dto.setPrice(services.getPrice());
        dto.setCapacity(services.getCapacity());
        return dto;
    }

    @Override
    public ServiceResponeDTO createService(CreateServiceDTO dto) {
        Services services= new Services();
        services.setServiceName(dto.getServiceName());
        services.setUnit(dto.getUnit());
        services.setPrice(dto.getPrice());
        services.setCapacity(dto.getCapacity());

        Services save= serviceRepository.save(services);

        ServiceResponeDTO responeDTO = new ServiceResponeDTO();
        responeDTO.setServiceCode(save.getServiceCode());
        responeDTO.setServiceName(save.getServiceName());
        responeDTO.setUnit(save.getUnit());
        responeDTO.setPrice(save.getPrice());
        responeDTO.setCapacity(save.getCapacity());
        return responeDTO;
    }

    @Override
    public ServiceResponeDTO updateService(String serviceCode,ServiceResponeDTO dto) {
        Services services= serviceRepository.findByServiceCode(serviceCode);
        services.setUnit(dto.getUnit());
        services.setPrice(dto.getPrice());

        Services update=serviceRepository.save(services);

        ServiceResponeDTO responeDTO=new ServiceResponeDTO();
        responeDTO.setServiceCode(update.getServiceCode());
        responeDTO.setServiceName(update.getServiceName());
        responeDTO.setUnit(update.getUnit());
        responeDTO.setPrice(update.getPrice());
        responeDTO.setCapacity(update.getCapacity());

        return responeDTO;
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
