package com.example.koi.exception;


import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleValidation(MethodArgumentNotValidException ex) {
        String message = "";

        //cứ mỗi thuộc tính lỗi => gắn vào biến message
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            //Name, studentCode, Score
            message+= fieldError.getField()+ ": " +fieldError.getDefaultMessage();
        }
        return ResponseEntity.ok(message);
    }
}
