package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.EmployeeRespDTO;
import com.example.logistic.DTO.EmployeeDTO.ListDTO;
import com.example.logistic.entity.Employees;

import java.util.List;

public interface IEmployeeService {
    List<ListDTO> findAll();
    EmployeeRespDTO createEmployee(EmployeeRespDTO dto);
    EmployeeRespDTO detailEmployee(String employeeCode);
    EmployeeRespDTO update(String employeeCode, EmployeeRespDTO dto);
    void delete(String employeeCode);
    List<ListDTO> findByName(String employeeName);
}
