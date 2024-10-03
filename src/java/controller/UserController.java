package controller;

import dtos.Users;
import utils.PasswordUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@WebServlet("/user")
public class UserController extends HttpServlet {

 
    private static final String DB_URL = "jdbc:mysql://localhost:3307/koiorderingdeliverysystem";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "123456"; 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        switch (action) {
            case "register":
                registerUser(request, response);
                break;
            case "login":
                loginUser(request, response);
                break;
            case "logout":
                logoutUser(request, response);
                break;
            default:
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private void registerUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String userId = request.getParameter("userId");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String role = request.getParameter("role");
        byte[] status = request.getParameter("status").getBytes(); 

        String hashedPassword = PasswordUtil.hashPassword(password);

        try ( Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "INSERT INTO User (UserID, Username, PasswordHash, Role, Status) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, userId);
            statement.setString(2, username);
            statement.setString(3, hashedPassword);
            statement.setString(4, role);
            statement.setBytes(5, status);

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                response.getWriter().write("{\"status\":\"success\", \"message\":\"User registered successfully\"}");
            } else {
                response.getWriter().write("{\"status\":\"error\", \"message\":\"Error registering user\"}");
            }
        } catch (Exception e) {
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Error registering user: " + e.getMessage() + "\"}");
        }
    }

    private void loginUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try ( Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String sql = "SELECT PasswordHash FROM User WHERE Username = ?";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, username);

            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                String hashedPassword = resultSet.getString("PasswordHash");
                if (PasswordUtil.checkPassword(password, hashedPassword)) {
                    // Tạo session nếu cần
                    HttpSession session = request.getSession();
                    session.setAttribute("username", username);
                    response.getWriter().write("{\"status\":\"success\", \"message\":\"Login successful\"}");
                } else {
                    response.getWriter().write("{\"status\":\"error\", \"message\":\"Invalid credentials\"}");
                }
            } else {
                response.getWriter().write("{\"status\":\"error\", \"message\":\"Invalid credentials\"}");
            }
        } catch (Exception e) {
            response.getWriter().write("{\"status\":\"error\", \"message\":\"Error logging in: " + e.getMessage() + "\"}");
        }
    }

    private void logoutUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); 
        }
        response.getWriter().write("{\"status\":\"success\", \"message\":\"Logged out successfully\"}");
    }
}
