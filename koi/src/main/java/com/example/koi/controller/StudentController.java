package com.example.koi.controller;

import com.example.koi.entity.Student;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
//@RequestMapping("/api")
@CrossOrigin("*") //cho phép tất cả truy cập
public class StudentController {

    List<Student> students = new ArrayList<Student>();

    @PostMapping("/api/student")
    public ResponseEntity addStudent(@Valid @RequestBody Student student) {
        students.add(student);
        return ResponseEntity.ok(student);

    }

    @GetMapping("/api/student")
    public ResponseEntity getAllStudents() {
        return ResponseEntity.ok(students);
    }
}
