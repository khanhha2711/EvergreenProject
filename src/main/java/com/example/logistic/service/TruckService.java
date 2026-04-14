package com.example.logistic.service;

import com.example.logistic.DTO.Trucks.CreateDTO;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.TruckingCompany;
import com.example.logistic.entity.Trucks;
import com.example.logistic.repository.IShipmentRepository;
import com.example.logistic.repository.ITruckRepository;
import com.example.logistic.repository.ITruckingCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TruckService implements ITruckingService{
    @Autowired
    private ITruckRepository truckRepository;

    @Autowired
    private ITruckingCompanyRepository truckingCompanyRepository;

    @Autowired
    private IShipmentRepository shipmentRepository;

    @Override
    public void CreateTruck(CreateDTO dto) {
        TruckingCompany truckingCompany=truckingCompanyRepository.findByCompanyCode(dto.getCompanyCode());
        Shipments shipments= shipmentRepository.findByShipmentCode(dto.getShipmentCode());
        Trucks trucks= new Trucks();
        trucks.setShipment(shipments);
        trucks.setTruckingCompany(truckingCompany);
        trucks.setLicensePlate(dto.getLicensePlate());
        trucks.setDriverPhone(dto.getDriverPhone());
        trucks.setDriverName(dto.getDriverName());
        truckRepository.save(trucks);
    }
}
