package com.example.koi.service;

import com.example.koi.dto.LoginDto;
import com.example.koi.entity.Account;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AuthenticationService {

    List<Account> accounts = new ArrayList<>();
    public Account register(Account account){
        account.setCreateAt(new Date());
        accounts.add(account);
        return account;
    }

    public Account login(LoginDto loginDto) {
        //2 trường hợp xảy ra:
        /**
         *  1. Tồn tại
         *  2. Không tồn tại
         *
         */

        boolean isValid = false;
        if(isValid) {

        }else {

        }
        return null;
    }
}
