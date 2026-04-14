package com.example.logistic.repository;

import com.example.logistic.entity.CusDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICusDocumentRepository extends JpaRepository<CusDocuments,Integer> {
    @Query(value = "SELECT cd.* FROM customs_documents cd " +
            "JOIN shipments s ON cd.shipment_id = s.id " +
            "WHERE s.shipment_code = :shipmentCode",
            nativeQuery = true)
    List<CusDocuments> findByShipmentCode(@Param("shipmentCode") String shipmentCode);

    CusDocuments findByDocumentCode(String documentCode);
}
