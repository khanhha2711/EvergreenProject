package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.EmployeeRespDTO;
import com.example.logistic.DTO.EmployeeDTO.ListDTO;
import com.example.logistic.entity.Employees;

import java.util.List;

public interface IEmployeeService {
    List<EmployeeRespDTO> findAll();
    EmployeeRespDTO createEmployee(ListDTO dto);
    EmployeeRespDTO detailEmployee(String employeeCode);
    EmployeeRespDTO update(String employeeCode, ListDTO dto);
    void delete(String employeeCode);
    List<EmployeeRespDTO> findByName(String employeeName);
}
