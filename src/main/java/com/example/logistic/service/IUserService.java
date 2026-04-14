package com.example.logistic.service;

import com.example.logistic.entity.Users;

import java.util.List;

public interface IUserService {
    List<Users> getAll();
    Users findByUserPhone(String userPhone);
}
