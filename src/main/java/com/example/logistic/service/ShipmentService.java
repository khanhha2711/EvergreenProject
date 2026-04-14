package com.example.logistic.service;

import com.example.logistic.DTO.CustomerDTO.UpdateDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.DTO.RequestDTO.CargoDTO;
import com.example.logistic.DTO.ShipmentDTO.ListDTO;
import com.example.logistic.DTO.ShipmentDTO.Page1DTO.InformationDTO;
import com.example.logistic.entity.*;
import com.example.logistic.repository.IShipmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipmentService implements  IShipmentService{
    @Autowired
    private IShipmentRepository shipmentRepository;

    @Override
    public List<ListDTO> findAll() {
        return shipmentRepository.findAllByOrderByShipmentCodeDesc()
                .stream()
                .map(this:: mapToListDTO)
                .toList();
    }

    private ListDTO mapToListDTO(Shipments shipments) {
        ListDTO dto= new ListDTO();
        dto.setShipmentCode(shipments.getShipmentCode());
        dto.setCompanyName(shipments.getContract().getQuotations().getRequest().getCustomer().getCompanyName());
        dto.setOrigin(shipments.getOrigin());
        dto.setDestination(shipments.getDestination());
        dto.setDepartureDate(shipments.getDepartureDate());
        dto.setEstimatedArrival(shipments.getEstimatedArrival());
        dto.setCreatedAt(shipments.getCreatedAt());
        dto.setStatus(shipments.getStatus());
        return dto;
    }

    @Override
    public List<ListDTO> searchAndFilter(String search, String filter) {
        List<Shipments> shipments= shipmentRepository.searchAndFilterShipment(
                (search == null || search.isEmpty()) ? null : search,
                (filter == null || filter.isEmpty()) ? null : filter
        );
        return shipments.stream()
                .map(this::mapToListDTO)
                .toList();
    }

    @Override
    @Transactional
    public InformationDTO detailInfor(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw new RuntimeException("Shipment not found");
        }
        InformationDTO informationDTO= new InformationDTO();
        informationDTO.setShipmentCode(shipments.getShipmentCode());
        informationDTO.setContractCode(shipments.getContract().getContractCode());
        informationDTO.setDepartureDate(shipments.getDepartureDate());
        informationDTO.setEstimatedArrival(shipments.getEstimatedArrival());
        informationDTO.setOrigin(shipments.getOrigin());
        informationDTO.setDestination(shipments.getDestination());

        List<String> serviceName= shipments.getContract().getQuotations()
                                            .getQuotationDetails()
                                            .stream()
                                            .map(rs -> rs.getService().getServiceName())
                                            .toList();
        informationDTO.setService(serviceName);

        Customers customers= shipments.getContract().getQuotations().getRequest().getCustomer();

        UpdateDTO customerDTO= new UpdateDTO();
        customerDTO.setCompanyName(customers.getCompanyName());
        customerDTO.setContactName(customers.getContactName());
        customerDTO.setPhone(customers.getContactPhone());
        customerDTO.setEmail(customers.getCustomerEmail());
        customerDTO.setCustomerAddress(customers.getCustomerAddress());
        customerDTO.setTaxCode(customers.getTaxCode());

        informationDTO.setCustomer(customerDTO);

        Cargo cargo= shipments.getCargo();
        CargoDTO cargoDTO= new CargoDTO();
        cargoDTO.setCargoName(cargo.getCargoName());
        cargoDTO.setCargoCategory(cargo.getCargoCategory());
        cargoDTO.setPackageCount(cargo.getPackageCount());
        cargoDTO.setGrossWeight(cargo.getTotalWeight());
        cargoDTO.setCargoValue(cargo.getGoodValue());

        informationDTO.setCargo(cargoDTO);

        Employees employees= shipments.getContract().getQuotations().getEmployee();
        ActivityDTO activity= new ActivityDTO();
        activity.setAction("Thông tin lô hàng");
        activity.setTimestamp(shipments.getCreatedAt()!=null
                ? shipments.getCreatedAt().toString():null);
        activity.setUser(employees.getUser().getUserName());
        informationDTO.setActivity(activity);

        return informationDTO;
    }
}
