package com.example.logistic.repository;

import com.example.logistic.entity.Requests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
@Repository
public interface IRequestRepository extends JpaRepository<Requests,Integer> {
    @Query("""
       SELECT r 
       FROM Requests r 
       LEFT JOIN FETCH r.requestServices rs 
       LEFT JOIN FETCH rs.service 
       WHERE r.requestCode = :code
       """)
    Requests findByRequestCode(@Param("code") String code);

    @Query(value = """
    SELECT r.* 
    FROM requests r
    JOIN customers c ON r.customer_id = c.id
    WHERE (:phone IS NULL OR c.contact_phone LIKE CONCAT('%', :phone, '%'))
      AND (:status IS NULL OR r.status LIKE CONCAT('%', :status, '%'))
""", nativeQuery = true)
    List<Requests> findByCustomerPhoneAndFilter(@Param("phone") String phone, @Param("status") String status);
    List<Requests> findAllByOrderByRequestCodeDesc();
}
