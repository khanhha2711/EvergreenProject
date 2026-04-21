package com.example.logistic.service;

import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;
import com.example.logistic.entity.Services;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.ShippingLines;
import com.example.logistic.entity.VesselBookings;
import com.example.logistic.repository.IShipmentRepository;
import com.example.logistic.repository.IShippingLineRepository;
import com.example.logistic.repository.IVesselBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VesselBookingService implements IVesselBookingService {

    @Autowired
    private IVesselBookingRepository vesselBookingRepository;
    @Autowired
    private IShipmentRepository shipmentRepository;

    @Autowired
    private IShippingLineRepository shippingLineRepository;
    @Override
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
        return dto;
    }

    @Override
    public String createVessel(String shipmentCode, GetAllVesselDTO dto) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Không tìm thấy");
        }
        VesselBookings vesselBookings =vesselBookingRepository.findByShipment(shipments);
        if(vesselBookings != null){
            throw  new RuntimeException("Đã tồn tại");
        }
        ShippingLines shippingLines= shippingLineRepository.findByShippingName(dto.getShippingName());
        VesselBookings vessel= new VesselBookings();
        vessel.setBookingNumber(dto.getBookingNumber());
        vessel.setShipment(shipments);
        vessel.setVesselName(dto.getVesselName());
        vessel.setShippingLine(shippingLines);
        vessel.setStatus("CREATED");
        vessel.setPortOfLoading(dto.getPortOfLoading());
        vessel.setPortOfDischarge(dto.getPortOfDischarge());
        vesselBookingRepository.save(vessel);
        return "Tạo thành công";
    }

    @Override
    public String updateVessel(String shipmentCode, GetAllVesselDTO dto) {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Không tìm thấy");
        }
        VesselBookings vessel =vesselBookingRepository.findByShipment(shipments);
        if(vessel == null){
            throw  new RuntimeException("Chưa có vessel để update");
        }
        ShippingLines shippingLines= shippingLineRepository.findByShippingName(dto.getShippingName());

        vessel.setBookingNumber(dto.getBookingNumber());
        vessel.setVesselName(dto.getVesselName());
        vessel.setShippingLine(shippingLines);
        vessel.setPortOfLoading(dto.getPortOfLoading());
        vessel.setPortOfDischarge(dto.getPortOfDischarge());
        vesselBookingRepository.save(vessel);
        return "Cập nhật thành công";
    }
}
