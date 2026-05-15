package com.example.logistic.repository;

import com.example.logistic.entity.ShipmentStatus;
import com.example.logistic.entity.Shipments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShipmentStatusRepository extends JpaRepository<ShipmentStatus,Integer> {
    ShipmentStatus findByShipment(Shipments shipment);
    List<ShipmentStatus> findByShipmentOrderByUpdatedAtAsc(Shipments shipment);

    boolean existsByShipmentAndStatus(Shipments shipment, String status);
}
