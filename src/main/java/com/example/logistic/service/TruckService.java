package com.example.logistic.service;

import com.example.logistic.DTO.Trucks.TruckItemDTO;
import com.example.logistic.DTO.Trucks.GetAllTruckDTO;
import com.example.logistic.DTO.Trucks.UpdateTruckDTO;
import com.example.logistic.entity.Containers;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.TruckingCompany;
import com.example.logistic.entity.Trucks;
import com.example.logistic.repository.IContainerRepository;
import com.example.logistic.repository.IShipmentRepository;
import com.example.logistic.repository.ITruckRepository;
import com.example.logistic.repository.ITruckingCompanyRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TruckService implements ITruckingService{
    @Autowired
    private IShipmentRepository shipmentRepository;
    @Autowired
    private ITruckRepository truckRepository;
    @Autowired
    private ITruckingCompanyRepository truckingCompanyRepository;
    @Autowired
    private IContainerRepository containerRepository;

    @Override
    public GetAllTruckDTO getTruckVessel(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment không tồn tại");
        }
        List<Object[]> trucks= truckRepository.findTruckInfo(shipmentCode);
        GetAllTruckDTO dto= new GetAllTruckDTO();
        List<TruckItemDTO> list= new ArrayList<>();
        String companyName= null;
        for(Object[] truck: trucks){
            if(companyName == null){
                companyName= (String) truck[0];
            }
            TruckItemDTO item= new TruckItemDTO();
            item.setTruckCode((String) truck[1]);
            item.setLicensePlate((String) truck[2]);
            item.setDriverName((String) truck[3]);
            item.setDriverPhone((String) truck[4]);
            item.setContainerNumber((String) truck[5]);
            list.add(item);
        }
        dto.setCompanyName(companyName);
        dto.setTrucks(list);

        if (companyName == null && list.isEmpty()) {
            return null;
        }
        return dto;
    }

    @Override
    @Transactional
    public String createTruck(String shipmentCode, GetAllTruckDTO dto) {
        Shipments shipments = shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment không tồn tại");
        }

        TruckingCompany company =
                truckingCompanyRepository.findByCompanyName(dto.getCompanyName());

        if (company == null) {
            throw new RuntimeException("Không tìm thấy trucking company");
        }
        for (TruckItemDTO item : dto.getTrucks()) {
            if (truckRepository.existsByShipmentAndLicensePlate(shipments, item.getLicensePlate())) {
                throw new RuntimeException("Biển số xe đã tồn tại trong shipment");
            }

            Containers container = null;
            if (item.getContainerNumber() != null) {
                container= containerRepository.findContainerByShipment(item.getContainerNumber(),shipments.getId());
                if(container == null){
                    throw new RuntimeException("Container không tồn tại trong shipment");
                }
                boolean exists = truckRepository
                        .existsByShipmentAndContainer_ContainerNumber(
                                shipments, item.getContainerNumber());

                if (exists) {
                    throw new RuntimeException("Container đã được gán cho truck khác");
                }
            }

            Trucks truck = new Trucks();
            truck.setShipment(shipments);
            truck.setTruckingCompany(company);

            truck.setLicensePlate(item.getLicensePlate());
            truck.setDriverName(item.getDriverName());
            truck.setDriverPhone(item.getDriverPhone());

            truck.setContainer(container);

            truckRepository.save(truck);
        }

        return "Tạo thành công";
    }

    @Override
    @Transactional
    public GetAllTruckDTO updateTruck(String shipmentCode, UpdateTruckDTO dto) {
        Shipments shipments = shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment không tồn tại");
        }

        List<TruckItemDTO> items = dto.getTrucks();

        for (TruckItemDTO item : items) {

            Trucks truck = truckRepository.findByTruckCode(item.getTruckCode());
            if (truck == null) {
                throw new RuntimeException("Không tồn tại truck");
            }

            Trucks check=truckRepository.findTrucksByTruckCodeAndShipment(truck.getTruckCode(),shipments);
            if(check == null){
                throw new RuntimeException("Truck không thuộc shipment này");
            }

            truck.setContainer(null);
        }

        // flush để DB release UNIQUE constraint
        truckRepository.flush();

        for (TruckItemDTO item : items) {
            Trucks truck = truckRepository.findByTruckCode(item.getTruckCode());

            // ---- license plate check ----
            if (item.getLicensePlate() != null &&
                    !item.getLicensePlate().equals(truck.getLicensePlate())) {

                Trucks existing = truckRepository
                        .findByLicensePlateAndShipment(item.getLicensePlate(),shipments);

                if (existing != null &&
                        !existing.getTruckCode().equals(truck.getTruckCode())) {
                    throw new RuntimeException("Biển số đã tồn tại");
                }

                truck.setLicensePlate(item.getLicensePlate());
            }

            // ---- driver info ----
            if (item.getDriverName() != null) {
                truck.setDriverName(item.getDriverName());
            }

            if (item.getDriverPhone() != null) {
                truck.setDriverPhone(item.getDriverPhone());
            }

            if (item.getContainerNumber() != null) {

                Containers container = containerRepository
                        .findContainerByShipment(item.getContainerNumber(), shipments.getId());

                if (container == null) {
                    throw new RuntimeException("Container không thuộc shipment này");
                }

                truck.setContainer(container);
            }
        }

        return getTruckVessel(shipmentCode);
    }



    @Override
    public void deleteTruck(String truckCode) {
        Trucks trucks= truckRepository.findByTruckCode(truckCode);
        truckRepository.delete(trucks);
    }
}
