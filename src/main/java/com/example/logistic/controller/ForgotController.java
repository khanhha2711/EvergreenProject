package com.example.logistic.controller;

import com.example.logistic.entity.Accounts;
import com.example.logistic.service.AccountService;
import com.example.logistic.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
@CrossOrigin ("*")
public class ForgotController {
    private final AccountService accountService;
    public ForgotController(AccountService accountService){

        this.accountService=accountService;
    }
    //Send Otp
    @PostMapping ("/forgot")
    @ResponseBody
    public  Map<String, Object> forgotPassword(@RequestBody Accounts accounts){

        String otp=accountService.sendOtp(accounts.getGmail());

        if(otp== null){
            return Map.of(
                    "status",400,
                    "message","Gmail not found"
            );
        }
        return Map.of(
                "status", 200,
                "message", "OTP sent",
                "otp", otp
        );
    }
    // verify OTP
    @PostMapping ("/verify")
    @ResponseBody
    public String verifyOtp(@RequestBody Map<String,String> request){
        String gmail= request.get("gmail");
        String otp=request.get("otp");
        boolean valid= accountService.verifyOtp(gmail,otp);
        if (!valid){
            return "OTP invalid";
        }
        return "OTP verified";
    }

    // reset password
    @PostMapping ("/reset")
    @ResponseBody
    public String resetPassword(@RequestBody Accounts accounts){
        boolean result = accountService.resetPassword(
                accounts.getGmail(),
                accounts.getPassword()
        );
        if(!result){
            return "Reset failed";

        }
        return "Password updated";
    }

}
