package com.example.koiorderingdeliverysystem.exception;

public class AccessDeniedException extends RuntimeException {
   public AccessDeniedException() {
      super("Access Denied!");
   }
}
