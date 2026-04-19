package com.example.logistic.repository;

import com.example.logistic.DTO.Container.SelectDTO;
import com.example.logistic.entity.Containers;
import com.example.logistic.entity.LogDeclarations;
import com.example.logistic.entity.LogDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IContainerRepository extends JpaRepository<Containers,Integer> {
    @Query(value = "SELECT * FROM containers WHERE declaration_id = :declarationId", nativeQuery = true)
    List<Containers> findByDeclarationId(@Param("declarationId") int declarationId);

    @Query("""
    SELECT c FROM Containers c
    JOIN c.cusDeclaration d
    WHERE c.containerNumber = :containerNumber
    AND d.shipment.id = :shipmentId
""")
    Containers findContainerByShipment(
            @Param("containerNumber") String containerNumber,
            @Param("shipmentId") int shipmentId
    );
    @Query("""
    SELECT c FROM Containers c
    JOIN c.cusDeclaration d
    WHERE d.shipment.shipmentCode = :shipmentCode
""")
    List<Containers> findAllByShipment(@Param("shipmentCode") String shipmentCode);
}
