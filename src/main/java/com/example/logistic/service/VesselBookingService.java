package com.example.logistic.service;

import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.VesselBookings;
import com.example.logistic.repository.IShipmentRepository;
import com.example.logistic.repository.IVesselBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VesselBookingService implements IVesselBookingService {

    @Autowired
    private IVesselBookingRepository vesselBookingRepository;
    @Autowired
    private IShipmentRepository shipmentRepository;

    @Override
    public GetAllVesselDTO detailVessel(String shipmentCode) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        VesselBookings vesselBookings= vesselBookingRepository.findByShipment(shipments);
        GetAllVesselDTO dto= new GetAllVesselDTO();
        dto.setBookingNumber(vesselBookings.getBookingNumber());
        dto.setShippingName(vesselBookings.getShippingLine().getShippingName());
        dto.setVesselName(vesselBookings.getVesselName());
        dto.setPortOfLoading(vesselBookings.getPortOfLoading());
        dto.setPortOfDischarge(vesselBookings.getPortOfDischarge());

        return dto;
    }
}
