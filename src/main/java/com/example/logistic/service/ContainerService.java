package com.example.logistic.service;

import com.example.logistic.DTO.Container.SelectDTO;
import com.example.logistic.entity.Containers;
import com.example.logistic.entity.Shipments;
import com.example.logistic.repository.IContainerRepository;
import com.example.logistic.repository.IShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContainerService implements  IContainerService{
    @Autowired
    private IContainerRepository containerRepository;
    @Autowired
    private IShipmentRepository shipmentRepository;
    @Override
    public List<SelectDTO> seachAll(String shipmentCode) {
        Shipments shipments = shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment không tồn tại");
        }

        return containerRepository.findAllByShipment(shipmentCode)
                .stream()
                .map(this::mapToResp)
                .toList();
    }

    private SelectDTO mapToResp(Containers containers) {
        SelectDTO selectDTO = new SelectDTO();
        selectDTO.setContainerCode(containers.getContainerCode());
        selectDTO.setContainerNumber(containers.getContainerNumber());
        return selectDTO;
    }
}
