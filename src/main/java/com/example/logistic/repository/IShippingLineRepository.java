package com.example.logistic.repository;

import com.example.logistic.entity.ShippingLines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShippingLineRepository extends JpaRepository<ShippingLines,Integer> {
    ShippingLines findByShippingName(String shippingName);

    ShippingLines findByShippingCode(String shippingCode);
}
