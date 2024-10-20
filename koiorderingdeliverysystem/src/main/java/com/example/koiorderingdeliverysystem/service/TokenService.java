//package com.example.koiorderingdeliverysystem.service;
//
//import com.example.koiorderingdeliverysystem.entity.Users;
//import com.example.koiorderingdeliverysystem.repository.UserRepository;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Base64;
//import java.util.Date;
//
//@Service
//public class TokenService {
//
//    @Autowired
//    UserRepository userRepository;
//
//    public final String SECRET_KEY = "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c";
//
//    private SecretKey getSigninKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
//        return Keys.hmacShaKeyFor(keyBytes);
//    }
//    // tạo ra token
//    public String generateToken(Users user) {
//        String token = Jwts.builder()
//                .subject(user.getId()+"")
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
//                .signWith(getSigninKey())
//                .compact();
//        return token;
//    }
//    //verify token
//
//    public Users getUserByToken(String token) {
//        Claims claims = Jwts.parser()
//                .verifyWith(getSigninKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//
//        String idString = claims.getSubject();
//        int id = Integer.parseInt(idString);
//
//        return userRepository.findById(id);
//    }
//}
