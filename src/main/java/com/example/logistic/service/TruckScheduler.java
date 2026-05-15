package com.example.logistic.service;

import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

import static java.awt.geom.Point2D.distance;

@Component
@EnableScheduling
public class TruckScheduler {
    @Autowired
    private IShipmentRepository shipmentRepository;

    @Autowired
    private ITruckRepository truckRepository;

    @Autowired
    private ITruckStatusRepository truckStatusRepository;
    @Autowired
    private IVesselBookingRepository vesselBookingRepository;

    @Scheduled(fixedRate = 60000)
    public void updateTruckLocation() {

        List<Shipments> shipments = shipmentRepository.findByStatus("Transportation");

        for (Shipments shipment : shipments) {

            List<Trucks> trucks = truckRepository.findAllByShipment(shipment);
            if (trucks.isEmpty()) continue;

            VesselBookings vesselBookings = vesselBookingRepository.findByShipment(shipment);
            if (vesselBookings == null) continue;

            for (Trucks truck : trucks) {

                TruckStatus last = truckStatusRepository.findLatestByTruckId(truck.getId());
                if (last == null) continue;

                double lat1 = last.getLatitude();
                double lon1 = last.getLongitude();

                double targetLat = 0;
                double targetLon = 0;

                // ===== STAGE 1: tới khách =====
                if ("Booking Confirmed".equalsIgnoreCase(truck.getStatus())) {
                    targetLat = shipment.getLatitude();
                    targetLon = shipment.getLongitude();
                }

                // ===== STAGE 2: tới cảng =====
                else if ("Waiting pickup".equalsIgnoreCase(truck.getStatus())) {
                    targetLat = vesselBookings.getLatitude();
                    targetLon = vesselBookings.getLongitude();
                }

                double t = 0.2; // nên giảm lại cho mượt

                double newLat = lat1 + t * (targetLat - lat1);
                double newLon = lon1 + t * (targetLon - lon1);

                TruckStatus newStatus = new TruckStatus();
                newStatus.setTrucks(truck);
                newStatus.setUpdatedAt(LocalDateTime.now());

                // ===== CHECK ARRIVAL =====
                if (distance(newLat, newLon, targetLat, targetLon) < 0.001) {

                    // 👉 ép về đúng điểm
                    newLat = targetLat;
                    newLon = targetLon;

                    if ("Booking Confirmed".equalsIgnoreCase(truck.getStatus())) {
                        truck.setStatus("Waiting pickup");
                        newStatus.setLocation("Arrived at customer");
                    }

                    else if ("Waiting pickup".equalsIgnoreCase(truck.getStatus())) {
                        truck.setStatus("In transit");
                        newStatus.setLocation("Arrived at port");
                    }

                    else if ("In transit".equalsIgnoreCase(truck.getStatus())) {
                        truck.setStatus("Delivered");
                        newStatus.setLocation("Completed");

                        shipment.setStatus("Completed");
                        shipmentRepository.save(shipment);
                    }

                } else {
                    newStatus.setLocation("Moving");
                }

                newStatus.setLatitude(newLat);
                newStatus.setLongitude(newLon);

                truckStatusRepository.save(newStatus);
                truckRepository.save(truck);
            }
        }
    }
}