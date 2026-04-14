package com.example.logistic.repository;


import com.example.logistic.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IRoleRepository extends JpaRepository<Roles,Integer> {
    Roles findByRoleName(String roleName);
}
