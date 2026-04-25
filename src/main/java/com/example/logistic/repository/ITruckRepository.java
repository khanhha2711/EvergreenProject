package com.example.logistic.repository;

import com.example.logistic.DTO.Trucks.TruckItemDTO;
import com.example.logistic.entity.Containers;
import com.example.logistic.entity.Shipments;
import com.example.logistic.entity.Trucks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITruckRepository extends JpaRepository<Trucks,Integer> {
    @Query(value = """
    SELECT 
        tc.company_name,
        t.truck_code,
        t.license_plate,
        t.driver_name,
        t.driver_phone,
        c.container_number
    FROM trucks t
    JOIN shipments s ON t.shipment_id = s.id
    JOIN trucking_companies tc ON t.trucking_company_id = tc.id
    LEFT JOIN containers c ON t.container_id = c.id
    WHERE s.shipment_code = :shipmentCode
""", nativeQuery = true)
    List<Object[]> findTruckInfo(@Param("shipmentCode") String shipmentCode);
    boolean existsByShipmentAndContainer_ContainerNumber(
            Shipments shipment, String containerNumber);
    boolean existsByShipmentAndLicensePlate(Shipments shipment, String licensePlate);
    Trucks findByLicensePlateAndShipment(String licensePlate, Shipments shipment);
    Trucks findTrucksByTruckCodeAndShipment(String truckCode, Shipments shipment);

    Trucks findByTruckCode(String truckCode);

    List<Trucks> findAllByShipment(Shipments shipment);


    Trucks findByShipment(Shipments shipment);

}
