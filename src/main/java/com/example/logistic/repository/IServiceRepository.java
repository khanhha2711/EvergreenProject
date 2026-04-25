package com.example.logistic.repository;

import com.example.logistic.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface IServiceRepository extends JpaRepository<Services, Integer> {
    Services findByServiceName(String name);
    Services findByServiceCode(String serviceCode);
    boolean existsByServiceNameAndUnit(String serviceName, String unit);
    @Query("""
    SELECT s FROM Services s
    WHERE s.serviceCode IN :codes
    AND UPPER(TRIM(s.status)) = 'ACTIVE'
""")
    List<Services> findActiveServices(@Param("codes") List<String> codes);
    Optional<Services> findByServiceCodeAndStatus(String serviceCode, String status);
}
