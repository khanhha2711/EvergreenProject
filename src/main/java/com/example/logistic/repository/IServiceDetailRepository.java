package com.example.logistic.repository;

import com.example.logistic.entity.ServiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IServiceDetailRepository extends JpaRepository<ServiceDetail,Integer> {
}
