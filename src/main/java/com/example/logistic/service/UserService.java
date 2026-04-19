package com.example.logistic.service;

import com.example.logistic.DTO.EmployeeDTO.InforDTO;
import com.example.logistic.entity.Accounts;
import com.example.logistic.entity.Users;
import com.example.logistic.repository.IAccountRepository;
import com.example.logistic.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService implements IUserService{
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public InforDTO getUser() {
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            return new InforDTO();
        }
        String userName= authentication.getName();
        Accounts accounts= accountRepository.findByGmail(userName);
        InforDTO dto= new InforDTO();
        dto.setEmployeeName(accounts.getUserId().getUserName());
        dto.setGmail(accounts.getGmail());
        return dto;
    }

    @Override
    public Users findByUserPhone(String userPhone) {
        return userRepository.findByUserPhone(userPhone);
    }


}
