package com.example.logistic.repository;


import com.example.logistic.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IUserRepository extends JpaRepository<Users,Integer> {

    Users findByUserPhone(String UserPhone);

}
