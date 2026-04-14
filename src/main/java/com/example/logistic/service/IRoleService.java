package com.example.logistic.service;

import com.example.logistic.entity.Roles;

import java.util.List;

public interface IRoleService {
    List<Roles> getAll();
    Roles findByRoleName(String roleName);
}
