package com.example.logistic.service;
import com.example.logistic.service.EmailService;
import com.example.logistic.entity.Accounts;
import com.example.logistic.repository.IAccountRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AccountService implements IAccountService {
    private final IAccountRepository accountRepository;
    private  final EmailService emailService;
    private Map<String,String> otpStorage= new HashMap<>();

    public AccountService(IAccountRepository accountRepository, EmailService emailService) {

        this.accountRepository=accountRepository;
        this.emailService = emailService;
    }
    @Override
    public List<Accounts> getAll() {

        return accountRepository.findAll();
    }

    @Override
    public Accounts login(String gmail, String password) {
        Accounts accounts=accountRepository.findByGmail(gmail);
        if(accounts !=null && accounts.getPassword().equals(password)){
            return accounts;
        }
        return null;
    }

    @Override
    public String sendOtp(String gmail) {
        Accounts accounts=accountRepository.findByGmail(gmail);
        if(accounts ==null){
            return null;
        }
        String otp=String.valueOf(new Random().nextInt(900000)+100000);

        otpStorage.put(gmail,otp);
//        emailService.sendOtp(gmail,otp);

        return otp;

    }
    private Map<String, Boolean> verifiedOtp = new HashMap<>();
    @Override
    public boolean verifyOtp(String gmail, String otp) {
        String storeOtp=otpStorage.get(gmail);
        if(storeOtp != null && storeOtp.equals(otp)){
            otpStorage.remove(gmail);
            verifiedOtp.put(gmail, true);
            return true;
        }
        return false;
    }
    @Override
    public boolean resetPassword(String gmail, String newPassword) {
        Boolean isVerified = verifiedOtp.get(gmail);

        if (isVerified == null || !isVerified) {
            return false; // chưa verify OTP
        }

        verifiedOtp.remove(gmail);
        return accountRepository.resetPassword(gmail,newPassword)>0;
    }

}
