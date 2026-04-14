package com.example.logistic.repository;

import com.example.logistic.entity.TruckingCompany;
import com.example.logistic.entity.Trucks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITruckRepository extends JpaRepository<Trucks,Integer> {

}
