package com.example.koiorderingdeliverysystem.service;

import com.example.koiorderingdeliverysystem.entity.User;

import com.example.koiorderingdeliverysystem.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean register(String userId, String username, String email, String password, String role) {
        // Kiểm tra username và email đã tồn tại chưa
        if (userRepository.findByUsername(username) != null || userRepository.findByEmail(email) != null) {
            return false;  // Username hoặc email đã tồn tại
        }


        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());


        User user = new User();
        user.setUserId(userId);
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(hashedPassword);
        user.setRole(role);
        user.setStatus(1);

        userRepository.save(user);
        return true;
    }

    public boolean login(String email, String password) {
        // Tìm user theo username
        User user = userRepository.findByEmail(email);
        if (user == null || user.getStatus() != 1) {
            return false;  // Không tìm thấy user hoặc user không hoạt động
        }

        // Kiểm tra password có hợp lệ hay không
        return BCrypt.checkpw(password, user.getPasswordHash());
    }

    public void logout() {
        // Logic để xử lý logout (có thể dựa trên session hoặc token)
    }
}

