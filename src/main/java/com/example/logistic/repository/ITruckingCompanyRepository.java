package com.example.logistic.repository;

import com.example.logistic.entity.TruckingCompany;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ITruckingCompanyRepository extends JpaRepository<TruckingCompany,Integer> {
    TruckingCompany findByCompanyName(String companyName);

    TruckingCompany findByCompanyCode(String companyCode);
    @Query(value = """
    SELECT c.*
    FROM trucking_companies c
    JOIN trucks t ON c.id = t.trucking_company_id
    WHERE t.id = :truckId
""", nativeQuery = true)
    TruckingCompany findByTruckId(@Param("truckId") int truckId);
}
