package com.example.logistic.repository;

import com.example.logistic.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface IServiceRepository extends JpaRepository<Services, Integer> {
    Services findByServiceName(String name);
    Services findByServiceCode(String serviceCode);

    List<Services> findByServiceCodeIn(List<String> serviceCode);
}
