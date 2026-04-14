package com.example.logistic.repository;

import com.example.logistic.entity.ShipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShipmentStatusRepository extends JpaRepository<ShipmentStatus,Integer> {
}
