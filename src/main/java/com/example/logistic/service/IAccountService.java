package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.InforDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.entity.Accounts;

import java.util.List;
import java.util.Optional;

public interface IAccountService {
    List<Accounts> getAll();

    Accounts login(String gmail, String password);

    boolean resetPassword(String gmail, String newPassword);

    String sendOtp(String gmail);

    boolean verifyOtp(String gmail, String otp);
}
