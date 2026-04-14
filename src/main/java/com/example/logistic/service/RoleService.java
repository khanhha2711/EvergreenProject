package com.example.logistic.service;

import com.example.logistic.entity.Roles;
import com.example.logistic.repository.IRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements IRoleService{
    private final IRoleRepository roleRepository;

    public RoleService(IRoleRepository roleRepository) {
        this.roleRepository=roleRepository;
    }
    @Override
    public List<Roles> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Roles findByRoleName(String roleName) {
        return roleRepository.findByRoleName(roleName);
    }


}
