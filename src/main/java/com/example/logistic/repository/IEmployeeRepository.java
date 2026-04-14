package com.example.logistic.repository;

import com.example.logistic.entity.Employees;
import com.example.logistic.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employees, Integer> {

    Employees findByEmployeeCode(String employeeCode);
    @Query(value = "select * from employees e join users u on e.user_id = u.id WHERE user_name LIKE %:name%", nativeQuery = true)
    Employees findByName(@Param("name") String name);
    List<Employees> findByUser_UserNameContainingIgnoreCase(String employeeName);
}
