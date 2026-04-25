package com.example.logistic.service;

import com.example.logistic.DTO.Trucks.InTransit.GetTransportDTO;
import com.example.logistic.DTO.Trucks.TruckItemDTO;
import com.example.logistic.DTO.Trucks.GetAllTruckDTO;
import com.example.logistic.DTO.Trucks.UpdateTruckDTO;
import com.example.logistic.common.LocationAPI;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    @Autowired
    private ITruckStatusRepository truckStatusRepository;
    @Autowired
    private LocationAPI locationAPI;
    @Autowired
    private  IVesselBookingRepository vesselBookingRepository;

    @Override
    public GetAllTruckDTO getTruckVessel(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment does not exist.");
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
            throw new RuntimeException("Shipment does not exist.");
        }

        TruckingCompany company =
                truckingCompanyRepository.findByCompanyName(dto.getCompanyName());

        if (company == null) {
            throw new RuntimeException("No trucking company found.");
        }
        for (TruckItemDTO item : dto.getTrucks()) {
            if (truckRepository.existsByShipmentAndLicensePlate(shipments, item.getLicensePlate())) {
                throw new RuntimeException("The license plate already existed in the shipment.");
            }

            Containers container = null;
            if (item.getContainerNumber() != null) {
                container= containerRepository.findContainerByShipment(item.getContainerNumber(),shipments.getId());
                if(container == null){
                    throw new RuntimeException("The container does not exist in the shipment.");
                }
                boolean exists = truckRepository
                        .existsByShipmentAndContainer_ContainerNumber(
                                shipments, item.getContainerNumber());

                if (exists) {
                    throw new RuntimeException("The container has been assigned to another truck.");
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
            TruckStatus truckStatus= new TruckStatus();
            truckStatus.setTrucks(truck);
            String address= truck.getTruckingCompany().getCompanyAddress();
            truckStatus.setLocation(address);
            Map<String,Double> loca= locationAPI.getLatLongFromAddress(address);
            if(loca != null){
                truckStatus.setLatitude(loca.get("lat"));
                truckStatus.setLongitude(loca.get("lon"));
            }
            truckStatus.setUpdatedAt(LocalDateTime.now());
            truckStatusRepository.save(truckStatus);

        }

        return "Create success";
    }

    @Override
    @Transactional
    public GetAllTruckDTO updateTruck(String shipmentCode, UpdateTruckDTO dto) {
        Shipments shipments = shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment does not exist.");
        }

        List<TruckItemDTO> items = dto.getTrucks();

        for (TruckItemDTO item : items) {

            Trucks truck = truckRepository.findByTruckCode(item.getTruckCode());
            if (truck == null) {
                throw new RuntimeException("There are no trucks.");
            }

            Trucks check=truckRepository.findTrucksByTruckCodeAndShipment(truck.getTruckCode(),shipments);
            if(check == null){
                throw new RuntimeException("This truck is not part of this shipment.");
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
                    throw new RuntimeException("The license plate already exists.");
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
                    throw new RuntimeException("This container is not part of this shipment.");
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

    @Override
    public List<GetTransportDTO> getTruck(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments ==null){
            throw new RuntimeException("Shipment does not exist.");
        }

        List<Trucks> trucksList= truckRepository.findAllByShipment(shipments);
        List<GetTransportDTO> result= new ArrayList<>();
        for(Trucks trucks: trucksList){

            TruckStatus lastHis= truckStatusRepository.findLatestByTruckId(trucks.getId());
            TruckStatus firstHis= truckStatusRepository.findFirstByTruckId(trucks.getId());

            TruckingCompany company= truckingCompanyRepository.findByTruckId(trucks.getId());

            VesselBookings vesselBookings= vesselBookingRepository.findByShipment(shipments);
            TruckStatus truckStatus= truckStatusRepository.findTopByTrucksOrderByUpdatedAtDesc(trucks);

            GetTransportDTO dto= new GetTransportDTO();
            if(truckStatus!=null) {

                dto.setLocation(trucks.getStatus());
                dto.setUpdateAt(truckStatus.getUpdatedAt());
            }

            if(lastHis !=null) {
                dto.setLatiNow(lastHis.getLatitude());
                dto.setLonNow(lastHis.getLongitude());
            }
            if(firstHis!=null) {

                dto.setCompanyAddress(company.getCompanyAddress());
                dto.setLatiCom(firstHis.getLatitude());
                dto.setLonCom(firstHis.getLongitude());
            }

            dto.setCustomerAddress(shipments.getOrigin());
            dto.setLatiCus(shipments.getLatitude());
            dto.setLonCus(shipments.getLongitude());
            if(vesselBookings !=null) {

                dto.setOrigin(vesselBookings.getPortOfLoading());
                dto.setLatiOrigin(vesselBookings.getLatitude());
                dto.setLonOrigin(vesselBookings.getLongitude());
            }

            dto.setLicensePlate(trucks.getLicensePlate());
            result.add(dto);
        }
        return result;
    }

}
