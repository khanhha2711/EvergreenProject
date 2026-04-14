package com.example.logistic.service;

import com.example.logistic.entity.Users;
import com.example.logistic.repository.IUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService implements IUserService{
    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public List<Users> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Users findByUserPhone(String userPhone) {
        return userRepository.findByUserPhone(userPhone);
    }


}
