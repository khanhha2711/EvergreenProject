package com.example.logistic.controller;

import com.example.logistic.entity.Accounts;
import com.example.logistic.service.IAccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {
    @Autowired
    private IAccountService accountService;
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
}
