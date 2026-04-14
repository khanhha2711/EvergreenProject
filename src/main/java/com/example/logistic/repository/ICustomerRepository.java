package com.example.logistic.repository;

import com.example.logistic.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ICustomerRepository extends JpaRepository<Customers,Integer> {
    Optional<Customers> findByCustomerCode(String customerCode);
    Optional<Customers> findByCustomerEmail(String email);

    @Query(value = "SELECT * FROM customers WHERE REPLACE(contact_phone, ' ', '') LIKE %?1%",
    nativeQuery = true)
    List<Customers> searchCustomerPhone(String phonePart);

    Optional<Customers> findByTaxCode(String taxCode);



}
