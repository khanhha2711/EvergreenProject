package com.example.logistic.service;

import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;
import com.example.logistic.common.LocationAPI;
import com.example.logistic.entity.Services;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.ShippingLines;
import com.example.logistic.entity.VesselBookings;
import com.example.logistic.repository.IShipmentRepository;
import com.example.logistic.repository.IShippingLineRepository;
import com.example.logistic.repository.IVesselBookingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class VesselBookingService implements IVesselBookingService {

    @Autowired
    private IVesselBookingRepository vesselBookingRepository;
    @Autowired
    private IShipmentRepository shipmentRepository;
    @Autowired
    private LocationAPI locationAPI;

    @Autowired
    private IShippingLineRepository shippingLineRepository;
    @Override
    @Transactional
    public GetAllVesselDTO detailVessel(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);

        VesselBookings vesselBookings= vesselBookingRepository.findByShipment(shipments);
        GetAllVesselDTO dto= new GetAllVesselDTO();
        dto.setStatus(vesselBookings.getStatus());
        dto.setBookingNumber(vesselBookings.getBookingNumber());
        dto.setShippingName(vesselBookings.getShippingLine().getShippingName());
        dto.setVesselName(vesselBookings.getVesselName());
        dto.setPortOfLoading(vesselBookings.getPortOfLoading());
        dto.setPortOfDischarge(vesselBookings.getPortOfDischarge());
        dto.setOrigin(shipments.getContract().getQuotations().getRequest().getCustomer().getCustomerAddress());
        dto.setDestination(shipments.getOrigin());
        return dto;
    }

    @Override
    public String createVessel(String shipmentCode, GetAllVesselDTO dto) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Not found");
        }
        VesselBookings vesselBookings =vesselBookingRepository.findByShipment(shipments);
        if(vesselBookings != null){
            throw  new RuntimeException("It already existed.");
        }
        ShippingLines shippingLines= shippingLineRepository.findByShippingName(dto.getShippingName());
        VesselBookings vessel= new VesselBookings();
        vessel.setBookingNumber(dto.getBookingNumber());
        vessel.setShipment(shipments);
        vessel.setVesselName(dto.getVesselName());
        vessel.setShippingLine(shippingLines);
        vessel.setStatus("CREATED");
        vessel.setPortOfLoading(dto.getPortOfLoading());
        // Địa chỉ cảng đi
        Map<String,Double> geo= locationAPI.getLatLongFromAddress(dto.getPortOfLoading());
        if(geo!= null){
            vessel.setLatitude(geo.get("lat"));
           vessel.setLongitude(geo.get("lon"));
        }

        vessel.setPortOfDischarge(dto.getPortOfDischarge());
        vesselBookingRepository.save(vessel);
        return "Create successfully!";
    }

    @Override
    public String updateVessel(String shipmentCode, GetAllVesselDTO dto) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Not found");
        }
        VesselBookings vessel =vesselBookingRepository.findByShipment(shipments);
        if(vessel == null){
            throw  new RuntimeException("No vessel available for updating yet.");
        }
        ShippingLines shippingLines= shippingLineRepository.findByShippingName(dto.getShippingName());

        vessel.setBookingNumber(dto.getBookingNumber());
        vessel.setVesselName(dto.getVesselName());
        vessel.setShippingLine(shippingLines);
        vessel.setPortOfLoading(dto.getPortOfLoading());
        vessel.setPortOfDischarge(dto.getPortOfDischarge());
        vesselBookingRepository.save(vessel);
        return "Update successfully!";
    }
}
