package com.example.logistic.repository;

import com.example.logistic.entity.TruckStatus;
import com.example.logistic.entity.Trucks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITruckStatusRepository extends JpaRepository<TruckStatus ,Integer> {

    TruckStatus findTopByTrucksOrderByUpdatedAtDesc(Trucks truck);

    @Query(value = """
    SELECT *
    FROM truck_status_history tsh
    WHERE tsh.truck_id = :truckId
    ORDER BY tsh.updated_at DESC
    LIMIT 1
    """, nativeQuery = true)
    TruckStatus findLatestByTruckId(@Param("truckId") int truckId);

    @Query(value = """
    SELECT *
    FROM truck_status_history tsh
    WHERE tsh.truck_id = :truckId
    ORDER BY tsh.updated_at ASC 
    LIMIT 1
    """, nativeQuery = true)
    TruckStatus findFirstByTruckId(@Param("truckId") int truckId);

    TruckStatus findByTrucks(Trucks trucks);
}
