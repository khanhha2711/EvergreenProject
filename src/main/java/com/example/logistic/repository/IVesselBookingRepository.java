package com.example.logistic.repository;

import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.VesselBookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVesselBookingRepository extends JpaRepository<VesselBookings,Integer> {

    VesselBookings findByShipment(Shipments shipment);
}
