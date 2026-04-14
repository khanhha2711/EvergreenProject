package com.example.logistic.repository;

import com.example.logistic.entity.TruckingCompany;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITruckingCompanyRepository extends JpaRepository<TruckingCompany,Integer> {
    TruckingCompany findByCompanyName(String companyName);

    TruckingCompany findByCompanyCode(String companyCode);
}
