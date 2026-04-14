package com.example.logistic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    public  void sendOtp(String gmail, String otp){
        SimpleMailMessage mailMessage= new SimpleMailMessage();
        mailMessage.setTo(gmail);
        mailMessage.setSubject("Reset password otp");
        mailMessage.setText("Your OTP code is: "+otp);
        System.out.println("Send OTP to: " + gmail);
        System.out.println("OTP: " + otp);
//        mailSender.send(mailMessage);
    }
}
