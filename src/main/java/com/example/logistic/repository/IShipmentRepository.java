package com.example.logistic.repository;

import com.example.logistic.entity.Shipments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShipmentRepository extends JpaRepository<Shipments,Integer> {
    Shipments findByShipmentCode(String shipmentCode);
    List<Shipments> findAllByOrderByShipmentCodeDesc();
    @Query(value = """
        SELECT s.* FROM shipments s
        JOIN contracts c ON s.contract_id = c.id
        JOIN quotations q ON c.quotation_id = q.id
        JOIN requests r ON q.request_id = r.id
        JOIN customers cus ON r.customer_id = cus.id
        WHERE (:search IS NULL OR cus.company_name LIKE %:search%)
        AND (:filter IS NULL OR s.status = :filter)
        """,
            nativeQuery = true)
    List<Shipments> searchAndFilterShipment(
            @Param("search") String search,
            @Param("filter") String filter
    );

    List<Shipments> findByStatus(String status);
}
