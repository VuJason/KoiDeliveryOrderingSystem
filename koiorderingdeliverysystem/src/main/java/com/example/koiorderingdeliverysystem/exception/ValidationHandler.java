package com.example.koiorderingdeliverysystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity handleException(MethodArgumentNotValidException exception) {
        String message = "";

        for(FieldError fieldError : exception.getBindingResult().getFieldErrors()) {

            message += fieldError.getField() + ": " + fieldError.getDefaultMessage() ;
        }
        return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
    }
}
