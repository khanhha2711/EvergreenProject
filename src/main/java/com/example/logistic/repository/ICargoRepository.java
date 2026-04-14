package com.example.logistic.repository;

import com.example.logistic.entity.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICargoRepository extends JpaRepository<Cargo,Integer> {
}
