package com.example.koiorderingdeliverysystem.config;

import com.example.koiorderingdeliverysystem.entity.Users;
import com.example.koiorderingdeliverysystem.exception.AuthException;
import com.example.koiorderingdeliverysystem.service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;

@Component
public class Filter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Qualifier("handlerExceptionResolver")
    @Autowired
    HandlerExceptionResolver resolver;

    private final List<String> AUTH_PERMISSIONS = List.of(
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/api/login",
            "/api/register"
    );

    public boolean checkIsPublicAPI(String uri) {
        //uri:/api/register

        // nếu gặp những api trong list trên => cho phép truy cập luôn => true
        AntPathMatcher pathMatcher = new AntPathMatcher();
        // check token => false
        return AUTH_PERMISSIONS.stream().anyMatch(pattern -> pathMatcher.match(pattern, uri));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //kiểm tra trước khi cho phép truy cập vào controller
//        filterChain.doFilter(request, response);

        // check xem cái api mà người dùng yêu cầu có phải là 1 public api?

        boolean isPublicAAPI = checkIsPublicAPI(request.getRequestURI());

        if (isPublicAAPI) {
            filterChain.doFilter(request, response);
        }else {
            String token = getToken(request);
            if(token == null) {
                // ko được phép truy cập
                resolver.resolveException(request, response, null, new AuthException("Empty token!"));
                return;
            }

            // => có token
            // check xem token có đúng hay không => lấy thông tin account từ token
            Users user;
            try {
                user = tokenService.verifyToken(token);
            }catch (ExpiredJwtException e) {
                //response token hết hạn
                resolver.resolveException(request, response, null, new AuthException("Expired token!"));
                return;
            }catch (MalformedJwtException malformedJwtException) {
                // response token sai
                resolver.resolveException(request, response, null, new AuthException("Invalid token!"));
                return;
            }
            // => token chuẩn
            // => cho phép truy cập
            // => lưu lại thông tin user
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    user,
                    token,
                    user.getAuthorities()
            );
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request,response);
        }


    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.substring(7);
    }

    // FE: Bearer sddiiiii
}
