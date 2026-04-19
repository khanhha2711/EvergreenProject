package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.InforDTO;
import com.example.logistic.entity.Users;

import java.util.List;

public interface IUserService {
    InforDTO getUser();
    Users findByUserPhone(String userPhone);
}
