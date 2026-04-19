package com.example.logistic.controller;

import com.example.logistic.DTO.EmployeeDTO.InforDTO;
import com.example.logistic.entity.Accounts;
import com.example.logistic.service.IAccountService;

import com.example.logistic.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private IUserService userService;
    @PostMapping("")
    public Accounts login(@RequestBody Accounts accounts){
        Accounts account = accountService.login(
                accounts.getGmail(),
                accounts.getPassword()
        );
        if(account == null){
            throw new RuntimeException("Sai user hoặc password");
        }
       return account;
    }
    @GetMapping("/user")
    public ResponseEntity<InforDTO> getUser(){
        return ResponseEntity.ok(userService.getUser());
    }
}
