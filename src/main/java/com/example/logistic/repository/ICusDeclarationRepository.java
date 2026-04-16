package com.example.logistic.repository;

import com.example.logistic.entity.CusDeclarations;
import com.example.logistic.entity.CusDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICusDeclarationRepository extends JpaRepository<CusDeclarations,Integer> {
    @Query(value = "SELECT cd.* FROM customs_declarations cd " +
            "JOIN shipments s ON cd.shipment_id = s.id " +
            "WHERE s.shipment_code = :shipmentCode",
            nativeQuery = true)
    CusDeclarations findByShipmentCode(@Param("shipmentCode") String shipmentCode);

    CusDeclarations findByDeclarationCode(String declarationCode);
}
