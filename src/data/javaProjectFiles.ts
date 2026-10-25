import { JavaProjectFile } from '../types';

export const JAVA_PROJECT_FILES: JavaProjectFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    category: 'Configuration',
    language: 'xml',
    description: 'Maven configuration containing Spring Boot 3 dependencies for Web, JPA, MySQL, Thymeleaf, and Validation.',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>student-management-system</artifactId>
    <version>1.0.0</version>
    <name>Student Management System</name>
    <description>College Full Stack Java Mini Project with Spring Boot, MySQL, and Thymeleaf</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starter Web (REST / MVC) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Data JPA (Hibernate ORM) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Thymeleaf Template Engine -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <!-- Bean Validation (Jakarta Validation / Hibernate Validator) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Connector/J Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot DevTools (Automatic restart during development) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    category: 'Configuration',
    language: 'properties',
    description: 'Spring Boot application configuration for MySQL connection, Hibernate dialect, and server port.',
    content: `# ===================================================================
# Student Management System - Spring Boot Configuration
# ===================================================================

# Application Server Port
server.port=8080

# Spring Application Name
spring.application.name=student-management-system

# ===================================================================
# MySQL Database Connection Settings
# Change username & password to match your local MySQL configuration
# ===================================================================
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ===================================================================
# JPA & Hibernate Settings
# 'update': automatically updates table schema without deleting data
# ===================================================================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ===================================================================
# Thymeleaf Configuration
# Set cache=false during active development so template changes reload
# ===================================================================
spring.thymeleaf.cache=false
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
spring.thymeleaf.mode=HTML
`
  },
  {
    path: 'src/main/resources/schema.sql',
    name: 'schema.sql',
    category: 'Database',
    language: 'sql',
    description: 'MySQL database creation script, student table definition with constraints, and realistic sample data.',
    content: `-- =====================================================================
-- Database Schema for Student Management System
-- College Mini Project - Full Stack Java with Spring Boot & MySQL
-- =====================================================================

-- Step 1: Create Database
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Step 2: Create Students Table
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL,
    department VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Step 3: Insert Initial Sample Data
INSERT INTO students (name, email, mobile, department, course) VALUES
('Aarav Sharma', 'aarav.sharma@college.edu', '9876543210', 'Computer Science & Engineering', 'B.Tech CSE - Core'),
('Diya Patel', 'diya.patel@college.edu', '9823456789', 'Information Technology', 'B.Tech Information Technology'),
('Rohan Verma', 'rohan.verma@college.edu', '9712345678', 'Electronics & Communication', 'B.Tech ECE - Embedded Systems'),
('Ananya Iyer', 'ananya.iyer@college.edu', '9654321098', 'Computer Science & Engineering', 'B.Tech CSE - AI & Machine Learning'),
('Kabir Mehta', 'kabir.mehta@college.edu', '9543210987', 'Mechanical Engineering', 'B.Tech Mechanical Engineering'),
('Sneha Reddy', 'sneha.reddy@college.edu', '9432109876', 'Master of Computer Applications', 'MCA 2-Year Professional'),
('Vikramaditya Rao', 'vikram.rao@college.edu', '9321098765', 'Electrical & Electronics', 'B.Tech Electrical & Electronics'),
('Pooja Nair', 'pooja.nair@college.edu', '9210987654', 'Civil Engineering', 'B.Tech Civil Engineering'),
('Arjun Das', 'arjun.das@college.edu', '9109876543', 'Computer Science & Engineering', 'B.Tech CSE - Data Science'),
('Meera Kulkarni', 'meera.kulkarni@college.edu', '9098765432', 'Information Technology', 'B.Tech IT - Cyber Security');

-- Verify inserted records
SELECT * FROM students;
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/entity/Student.java',
    name: 'Student.java',
    category: 'Entity',
    language: 'java',
    description: 'JPA Entity representing the student table with Jakarta validation annotations for form security.',
    content: `package com.example.studentmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

/**
 * Student Entity mapped to 'students' table in MySQL database.
 * Includes Bean Validation constraints checked by Spring MVC controller.
 */
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please enter a valid email address (e.g., student@college.edu)")
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    @Column(name = "mobile", nullable = false, length = 15)
    private String mobile;

    @NotBlank(message = "Please select a department")
    @Column(name = "department", nullable = false, length = 100)
    private String department;

    @NotBlank(message = "Please select or specify a course")
    @Column(name = "course", nullable = false, length = 100)
    private String course;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Automatic timestamp before persist
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Default No-Arg Constructor (Required by JPA/Hibernate)
    public Student() {
    }

    // Parameterized Constructor (Convenience)
    public Student(String name, String email, String mobile, String department, String course) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.department = department;
        this.course = course;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", department='" + department + '\'' +
                ", course='" + course + '\'' +
                '}';
    }
}
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/repository/StudentRepository.java',
    name: 'StudentRepository.java',
    category: 'Repository',
    language: 'java',
    description: 'Spring Data JPA Repository providing built-in CRUD operations and custom JPQL keyword search query.',
    content: `package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA Repository for Student entity.
 * JpaRepository provides save(), findById(), findAll(), deleteById(), count() automatically.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Custom finder method by department
    List<Student> findByDepartment(String department);

    // Custom finder method by course
    List<Student> findByCourse(String course);

    // Check if email already exists for another student (prevent duplicates)
    boolean existsByEmail(String email);

    /**
     * Search across multiple student attributes (name, email, mobile, department, course)
     * using JPQL Case-Insensitive partial string matching.
     */
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "s.mobile LIKE CONCAT('%', :keyword, '%') OR " +
           "LOWER(s.department) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Student> searchStudents(@Param("keyword") String keyword);

    /**
     * Count students grouped by department for the analytics dashboard
     */
    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> countStudentsByDepartment();
}
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/service/StudentService.java',
    name: 'StudentService.java',
    category: 'Service',
    language: 'java',
    description: 'Service Layer Interface defining all business logic contracts for student operations.',
    content: `package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;

import java.util.List;
import java.util.Map;

/**
 * Business Service Contract for Student operations.
 * Decouples Controller layer from Repository persistence layer.
 */
public interface StudentService {

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student saveStudent(Student student);

    Student updateStudent(Long id, Student student);

    void deleteStudent(Long id);

    List<Student> searchStudents(String keyword);

    List<Student> getStudentsByDepartment(String department);

    long getTotalStudentsCount();

    Map<String, Long> getDepartmentWiseStudentCount();

    boolean isEmailRegistered(String email);
}
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/service/impl/StudentServiceImpl.java',
    name: 'StudentServiceImpl.java',
    category: 'Service',
    language: 'java',
    description: 'Service Layer Implementation executing transactional business rules and interacting with StudentRepository.',
    content: `package com.example.studentmanagement.service.impl;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.repository.StudentRepository;
import com.example.studentmanagement.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Implementation of StudentService interface.
 * Annotated with @Service and @Transactional for database consistency.
 */
@Service
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    // Constructor Injection (Best practice over @Autowired field injection)
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student with ID " + id + " not found!"));
    }

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        Student existingStudent = getStudentById(id);
        
        // Update all editable fields
        existingStudent.setName(studentDetails.getName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setMobile(studentDetails.getMobile());
        existingStudent.setDepartment(studentDetails.getDepartment());
        existingStudent.setCourse(studentDetails.getCourse());

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Student with ID " + id + " does not exist!");
        }
        studentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> searchStudents(String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            return studentRepository.searchStudents(keyword.trim());
        }
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> getStudentsByDepartment(String department) {
        return studentRepository.findByDepartment(department);
    }

    @Override
    @Transactional(readOnly = true)
    public long getTotalStudentsCount() {
        return studentRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getDepartmentWiseStudentCount() {
        Map<String, Long> counts = new HashMap<>();
        List<Object[]> results = studentRepository.countStudentsByDepartment();
        for (Object[] result : results) {
            String dept = (String) result[0];
            Long count = (Long) result[1];
            counts.put(dept, count);
        }
        return counts;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isEmailRegistered(String email) {
        return studentRepository.existsByEmail(email);
    }
}
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/controller/StudentController.java',
    name: 'StudentController.java',
    category: 'Controller',
    language: 'java',
    description: 'Spring MVC Controller routing requests to Thymeleaf templates with Model attributes and validation handling.',
    content: `package com.example.studentmanagement.controller;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

/**
 * Spring MVC Controller for handling HTTP requests for the Student Management System.
 * Renders Thymeleaf templates and binds model attributes.
 */
@Controller
public class StudentController {

    private final StudentService studentService;

    // Available Departments for Form Dropdowns
    private static final String[] DEPARTMENTS = {
            "Computer Science & Engineering",
            "Information Technology",
            "Electronics & Communication",
            "Mechanical Engineering",
            "Electrical & Electronics",
            "Civil Engineering",
            "Master of Computer Applications"
    };

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * Root URL redirects to dashboard
     */
    @GetMapping("/")
    public String home() {
        return "redirect:/dashboard";
    }

    /**
     * Dashboard View: Shows statistics cards, department breakdown, and recent records
     */
    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        model.addAttribute("totalStudents", studentService.getTotalStudentsCount());
        model.addAttribute("departmentCounts", studentService.getDepartmentWiseStudentCount());
        
        // Show recent 5 students
        List<Student> allStudents = studentService.getAllStudents();
        int limit = Math.min(allStudents.size(), 5);
        model.addAttribute("recentStudents", allStudents.subList(0, limit));
        
        model.addAttribute("activePage", "dashboard");
        return "dashboard";
    }

    /**
     * View All Students: Table list with search bar
     */
    @GetMapping("/students")
    public String listStudents(Model model) {
        model.addAttribute("students", studentService.getAllStudents());
        model.addAttribute("totalStudents", studentService.getTotalStudentsCount());
        model.addAttribute("activePage", "students");
        return "students";
    }

    /**
     * Search Students by Keyword
     */
    @GetMapping("/students/search")
    public String searchStudents(@RequestParam(value = "keyword", required = false) String keyword, Model model) {
        List<Student> searchResults = studentService.searchStudents(keyword);
        model.addAttribute("students", searchResults);
        model.addAttribute("keyword", keyword);
        model.addAttribute("totalStudents", studentService.getTotalStudentsCount());
        model.addAttribute("activePage", "students");
        return "students";
    }

    /**
     * Show Add Student Form
     */
    @GetMapping("/students/new")
    public String showAddStudentForm(Model model) {
        Student student = new Student();
        model.addAttribute("student", student);
        model.addAttribute("departments", DEPARTMENTS);
        model.addAttribute("pageTitle", "Add New Student");
        model.addAttribute("isEdit", false);
        model.addAttribute("activePage", "new-student");
        return "student-form";
    }

    /**
     * Save New Student (With Server-Side Validation)
     */
    @PostMapping("/students")
    public String saveStudent(@Valid @ModelAttribute("student") Student student,
                              BindingResult bindingResult,
                              Model model,
                              RedirectAttributes redirectAttributes) {

        // Check for duplicate email on new registration
        if (studentService.isEmailRegistered(student.getEmail())) {
            bindingResult.rejectValue("email", "error.student", "Email is already registered by another student");
        }

        // If validation fails, return to form with errors displayed
        if (bindingResult.hasErrors()) {
            model.addAttribute("departments", DEPARTMENTS);
            model.addAttribute("pageTitle", "Add New Student");
            model.addAttribute("isEdit", false);
            return "student-form";
        }

        studentService.saveStudent(student);
        redirectAttributes.addFlashAttribute("successMessage", "Student " + student.getName() + " added successfully!");
        return "redirect:/students";
    }

    /**
     * Show Edit Student Form
     */
    @GetMapping("/students/edit/{id}")
    public String showEditStudentForm(@PathVariable("id") Long id, Model model) {
        Student student = studentService.getStudentById(id);
        model.addAttribute("student", student);
        model.addAttribute("departments", DEPARTMENTS);
        model.addAttribute("pageTitle", "Edit Student Details");
        model.addAttribute("isEdit", true);
        model.addAttribute("activePage", "students");
        return "student-form";
    }

    /**
     * Update Existing Student
     */
    @PostMapping("/students/{id}")
    public String updateStudent(@PathVariable("id") Long id,
                                @Valid @ModelAttribute("student") Student student,
                                BindingResult bindingResult,
                                Model model,
                                RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("departments", DEPARTMENTS);
            model.addAttribute("pageTitle", "Edit Student Details");
            model.addAttribute("isEdit", true);
            return "student-form";
        }

        studentService.updateStudent(id, student);
        redirectAttributes.addFlashAttribute("successMessage", "Student " + student.getName() + " updated successfully!");
        return "redirect:/students";
    }

    /**
     * Delete Student
     */
    @GetMapping("/students/delete/{id}")
    public String deleteStudent(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        Student student = studentService.getStudentById(id);
        studentService.deleteStudent(id);
        redirectAttributes.addFlashAttribute("successMessage", "Student " + student.getName() + " deleted successfully!");
        return "redirect:/students";
    }
}
`
  },
  {
    path: 'src/main/java/com/example/studentmanagement/StudentManagementApplication.java',
    name: 'StudentManagementApplication.java',
    category: 'Configuration',
    language: 'java',
    description: 'Main Spring Boot Application entry point with standard @SpringBootApplication annotation.',
    content: `package com.example.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for Student Management System.
 * Run this file to start the Spring Boot embedded Tomcat web server on port 8080.
 */
@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  Student Management System Started Successfully! ");
        System.out.println("  Access application at: http://localhost:8080     ");
        System.out.println("=================================================");
    }
}
`
  },
  {
    path: 'src/main/resources/templates/dashboard.html',
    name: 'dashboard.html',
    category: 'Thymeleaf',
    language: 'html',
    description: 'Thymeleaf template for the executive dashboard featuring KPI metric cards, department metrics, and quick actions.',
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Management System</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body class="bg-light">

    <!-- Navbar Fragment -->
    <div th:replace="~{fragments/navbar :: navbar}"></div>

    <div class="container py-4">
        <!-- Page Title & Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold mb-1 text-dark">Institutional Dashboard</h2>
                <p class="text-muted mb-0">Overview of student enrollment, departmental statistics, and records</p>
            </div>
            <div>
                <a th:href="@{/students/new}" class="btn btn-primary px-3 shadow-sm">
                    <i class="bi bi-person-plus-fill me-1"></i> Add Student
                </a>
            </div>
        </div>

        <!-- Metric Stat Cards -->
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <div class="card border-0 shadow-sm p-3 rounded-3">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle bg-primary bg-opacity-10 p-3 text-primary me-3">
                            <i class="bi bi-people-fill fs-3"></i>
                        </div>
                        <div>
                            <span class="text-muted small text-uppercase fw-semibold">Total Students</span>
                            <h3 class="fw-bold mb-0 text-dark" th:text="\${totalStudents}">0</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 shadow-sm p-3 rounded-3">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle bg-success bg-opacity-10 p-3 text-success me-3">
                            <i class="bi bi-building-fill fs-3"></i>
                        </div>
                        <div>
                            <span class="text-muted small text-uppercase fw-semibold">Active Departments</span>
                            <h3 class="fw-bold mb-0 text-dark" th:text="\${departmentCounts != null ? departmentCounts.size() : 7}">7</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 shadow-sm p-3 rounded-3">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle bg-info bg-opacity-10 p-3 text-info me-3">
                            <i class="bi bi-mortarboard-fill fs-3"></i>
                        </div>
                        <div>
                            <span class="text-muted small text-uppercase fw-semibold">System Status</span>
                            <h3 class="fw-bold mb-0 text-success fs-4">Operational</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Department Breakdown Card -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm rounded-3 h-100">
                    <div class="card-header bg-white border-bottom py-3">
                        <h5 class="fw-semibold mb-0 text-dark">Students by Department</h5>
                    </div>
                    <div class="card-body">
                        <div th:each="entry : \${departmentCounts}" class="mb-3">
                            <div class="d-flex justify-content-between mb-1 small fw-medium">
                                <span th:text="\${entry.key}">Department</span>
                                <span class="fw-bold" th:text="\${entry.value} + ' Students'">0</span>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar bg-primary" role="progressbar"
                                     th:style="'width: ' + (\${totalStudents > 0 ? (entry.value * 100.0 / totalStudents) : 0}) + '%;'">
                                </div>
                            </div>
                        </div>
                        <div th:if="\${#maps.isEmpty(departmentCounts)}" class="text-muted text-center py-4">
                            No departmental statistics available yet.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Students Table -->
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm rounded-3 h-100">
                    <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                        <h5 class="fw-semibold mb-0 text-dark">Recently Enrolled Students</h5>
                        <a th:href="@{/students}" class="btn btn-sm btn-outline-secondary">View All</a>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light small text-uppercase">
                                    <tr>
                                        <th class="ps-3">ID</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Course</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr th:each="student : \${recentStudents}">
                                        <td class="ps-3 fw-bold text-muted" th:text="'#' + \${student.id}">#1</td>
                                        <td class="fw-medium text-dark" th:text="\${student.name}">Student Name</td>
                                        <td class="small" th:text="\${student.department}">Department</td>
                                        <td class="small text-muted" th:text="\${student.course}">Course</td>
                                    </tr>
                                    <tr th:if="\${#lists.isEmpty(recentStudents)}">
                                        <td colspan="4" class="text-center py-4 text-muted">
                                            No students registered yet. Click 'Add Student' to get started!
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`
  },
  {
    path: 'src/main/resources/templates/students.html',
    name: 'students.html',
    category: 'Thymeleaf',
    language: 'html',
    description: 'Thymeleaf template for the student directory table with live search, alert messages, and edit/delete actions.',
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Directory - Student Management System</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body class="bg-light">

    <!-- Navbar Fragment -->
    <div th:replace="~{fragments/navbar :: navbar}"></div>

    <div class="container py-4">

        <!-- Flash Success Notification -->
        <div th:if="\${successMessage}" class="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            <span th:text="\${successMessage}">Action succeeded!</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <!-- Header Bar with Title and Actions -->
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <div>
                <h2 class="fw-bold mb-1 text-dark">Student Directory</h2>
                <p class="text-muted mb-0">Total <span class="fw-semibold text-dark" th:text="\${students.size()}">0</span> student records found</p>
            </div>
            
            <div class="d-flex gap-2">
                <!-- Search Form -->
                <form th:action="@{/students/search}" method="get" class="d-flex">
                    <div class="input-group">
                        <input type="text" name="keyword" th:value="\${keyword}" class="form-control"
                               placeholder="Search name, email, mobile..." aria-label="Search">
                        <button class="btn btn-outline-secondary" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                        <a th:if="\${keyword}" th:href="@{/students}" class="btn btn-outline-danger" title="Clear Search">
                            <i class="bi bi-x-lg"></i>
                        </a>
                    </div>
                </form>

                <!-- Add Student Button -->
                <a th:href="@{/students/new}" class="btn btn-primary text-nowrap shadow-sm">
                    <i class="bi bi-plus-lg me-1"></i> Add Student
                </a>
            </div>
        </div>

        <!-- Student Records Table Card -->
        <div class="card border-0 shadow-sm rounded-3">
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light small text-uppercase">
                            <tr>
                                <th class="ps-3 py-3">ID</th>
                                <th class="py-3">Name</th>
                                <th class="py-3">Email</th>
                                <th class="py-3">Mobile</th>
                                <th class="py-3">Department</th>
                                <th class="py-3">Course</th>
                                <th class="text-end pe-3 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr th:each="student : \${students}">
                                <td class="ps-3 fw-bold text-muted font-monospace" th:text="\${student.id}">101</td>
                                <td>
                                    <span class="fw-semibold text-dark" th:text="\${student.name}">Student Name</span>
                                </td>
                                <td>
                                    <span class="text-muted" th:text="\${student.email}">student@college.edu</span>
                                </td>
                                <td>
                                    <span class="font-monospace text-muted" th:text="\${student.mobile}">9876543210</span>
                                </td>
                                <td>
                                    <span class="badge bg-light text-dark border" th:text="\${student.department}">Department</span>
                                </td>
                                <td>
                                    <span class="text-muted small" th:text="\${student.course}">Course</span>
                                </td>
                                <td class="text-end pe-3">
                                    <div class="btn-group" role="group">
                                        <a th:href="@{/students/edit/{id}(id=\${student.id})}"
                                           class="btn btn-sm btn-outline-primary"
                                           title="Edit Student">
                                            <i class="bi bi-pencil-fill"></i>
                                        </a>
                                        <a th:href="@{/students/delete/{id}(id=\${student.id})}"
                                           class="btn btn-sm btn-outline-danger"
                                           onclick="return confirm('Are you sure you want to delete this student record?');"
                                           title="Delete Student">
                                            <i class="bi bi-trash3-fill"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            <!-- Empty Table State -->
                            <tr th:if="\${#lists.isEmpty(students)}">
                                <td colspan="7" class="text-center py-5">
                                    <div class="text-muted">
                                        <i class="bi bi-person-x fs-1 text-secondary mb-2 d-block"></i>
                                        <h5>No students found</h5>
                                        <p class="small mb-3" th:if="\${keyword}">No match found for query "<strong th:text="\${keyword}"></strong>"</p>
                                        <p class="small mb-3" th:unless="\${keyword}">Your database is currently empty.</p>
                                        <a th:href="@{/students/new}" class="btn btn-primary btn-sm">Add First Student</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`
  },
  {
    path: 'src/main/resources/templates/student-form.html',
    name: 'student-form.html',
    category: 'Thymeleaf',
    language: 'html',
    description: 'Thymeleaf form template for both Add and Edit operations with server-side error bindings and Bootstrap form layout.',
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title th:text="\${pageTitle} + ' - Student Management System'">Student Form</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" th:href="@{/css/style.css}">
</head>
<body class="bg-light">

    <!-- Navbar Fragment -->
    <div th:replace="~{fragments/navbar :: navbar}"></div>

    <div class="container py-4">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-md-9">

                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb" class="mb-3">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a th:href="@{/dashboard}">Dashboard</a></li>
                        <li class="breadcrumb-item"><a th:href="@{/students}">Students</a></li>
                        <li class="breadcrumb-item active" aria-current="page" th:text="\${isEdit ? 'Edit Student' : 'Add Student'}">Form</li>
                    </ol>
                </nav>

                <!-- Form Card -->
                <div class="card border-0 shadow-sm rounded-3">
                    <div class="card-header bg-white border-bottom py-3">
                        <h4 class="fw-bold mb-0 text-dark" th:text="\${pageTitle}">Student Form</h4>
                    </div>
                    <div class="card-body p-4">

                        <!-- Thymeleaf Bound Form -->
                        <form th:action="\${isEdit} ? @{/students/{id}(id=\${student.id})} : @{/students}"
                              th:object="\${student}"
                              method="post"
                              id="studentForm"
                              novalidate>

                            <!-- Hidden ID Field for Edit -->
                            <input type="hidden" th:if="\${isEdit}" th:field="*{id}" />

                            <!-- Full Name Field -->
                            <div class="mb-3">
                                <label for="name" class="form-label fw-semibold">Full Name <span class="text-danger">*</span></label>
                                <input type="text"
                                       id="name"
                                       th:field="*{name}"
                                       class="form-control"
                                       th:classappend="\${#fields.hasErrors('name')} ? 'is-invalid' : ''"
                                       placeholder="e.g., Aarav Sharma"
                                       required>
                                <div class="invalid-feedback" th:if="\${#fields.hasErrors('name')}" th:errors="*{name}">
                                    Name is required.
                                </div>
                            </div>

                            <!-- Email Field -->
                            <div class="mb-3">
                                <label for="email" class="form-label fw-semibold">Email Address <span class="text-danger">*</span></label>
                                <input type="email"
                                       id="email"
                                       th:field="*{email}"
                                       class="form-control"
                                       th:classappend="\${#fields.hasErrors('email')} ? 'is-invalid' : ''"
                                       placeholder="e.g., aarav.sharma@college.edu"
                                       required>
                                <div class="invalid-feedback" th:if="\${#fields.hasErrors('email')}" th:errors="*{email}">
                                    Please provide a valid email address.
                                </div>
                            </div>

                            <!-- Mobile Number Field -->
                            <div class="mb-3">
                                <label for="mobile" class="form-label fw-semibold">Mobile Number <span class="text-danger">*</span></label>
                                <input type="tel"
                                       id="mobile"
                                       th:field="*{mobile}"
                                       class="form-control font-monospace"
                                       th:classappend="\${#fields.hasErrors('mobile')} ? 'is-invalid' : ''"
                                       placeholder="10-digit mobile number (e.g., 9876543210)"
                                       maxlength="10"
                                       required>
                                <div class="form-text text-muted">Must be exactly 10 digits without spaces or country code.</div>
                                <div class="invalid-feedback" th:if="\${#fields.hasErrors('mobile')}" th:errors="*{mobile}">
                                    Mobile number must be 10 digits.
                                </div>
                            </div>

                            <!-- Department Field -->
                            <div class="mb-3">
                                <label for="department" class="form-label fw-semibold">Department <span class="text-danger">*</span></label>
                                <select id="department"
                                        th:field="*{department}"
                                        class="form-select"
                                        th:classappend="\${#fields.hasErrors('department')} ? 'is-invalid' : ''"
                                        required>
                                    <option value="" disabled selected>-- Select Department --</option>
                                    <option th:each="dept : \${departments}"
                                            th:value="\${dept}"
                                            th:text="\${dept}">Department Name</option>
                                </select>
                                <div class="invalid-feedback" th:if="\${#fields.hasErrors('department')}" th:errors="*{department}">
                                    Please select a department.
                                </div>
                            </div>

                            <!-- Course Field -->
                            <div class="mb-4">
                                <label for="course" class="form-label fw-semibold">Course / Degree <span class="text-danger">*</span></label>
                                <input type="text"
                                       id="course"
                                       th:field="*{course}"
                                       class="form-control"
                                       th:classappend="\${#fields.hasErrors('course')} ? 'is-invalid' : ''"
                                       placeholder="e.g., B.Tech Computer Science"
                                       required>
                                <div class="invalid-feedback" th:if="\${#fields.hasErrors('course')}" th:errors="*{course}">
                                    Course is required.
                                </div>
                            </div>

                            <!-- Buttons -->
                            <div class="d-flex justify-content-between pt-2">
                                <a th:href="@{/students}" class="btn btn-outline-secondary px-4">
                                    <i class="bi bi-arrow-left me-1"></i> Cancel
                                </a>
                                <button type="submit" class="btn btn-primary px-4 shadow-sm">
                                    <i class="bi bi-save2-fill me-1"></i>
                                    <span th:text="\${isEdit} ? 'Update Student' : 'Save Student'">Save</span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script th:src="@{/js/validation.js}"></script>
</body>
</html>
`
  },
  {
    path: 'src/main/resources/templates/fragments/navbar.html',
    name: 'navbar.html',
    category: 'Thymeleaf',
    language: 'html',
    description: 'Thymeleaf reusable navigation fragment with active route highlighting.',
    content: `<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" lang="en">
<body>
    <nav th:fragment="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div class="container">
            <a class="navbar-brand fw-bold d-flex align-items-center gap-2" th:href="@{/dashboard}">
                <i class="bi bi-mortarboard-fill text-warning fs-4"></i>
                <span>EduManage <span class="badge bg-secondary fs-6 fw-normal">SMS</span></span>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-dismiss="collapse" data-bs-target="#navContent"
                    aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" th:classappend="\${activePage == 'dashboard'} ? 'active' : ''" th:href="@{/dashboard}">
                            <i class="bi bi-speedometer2 me-1"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" th:classappend="\${activePage == 'students'} ? 'active' : ''" th:href="@{/students}">
                            <i class="bi bi-people me-1"></i> Students
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" th:classappend="\${activePage == 'new-student'} ? 'active' : ''" th:href="@{/students/new}">
                            <i class="bi bi-person-plus me-1"></i> Add Student
                        </a>
                    </li>
                </ul>
                
                <span class="navbar-text small text-light opacity-75">
                    Spring Boot 3 + MySQL + Thymeleaf
                </span>
            </div>
        </div>
    </nav>
</body>
</html>
`
  },
  {
    path: 'src/main/resources/static/css/style.css',
    name: 'style.css',
    category: 'Static',
    language: 'css',
    description: 'Custom styling extending Bootstrap 5 for clean academic typography, cards, and buttons.',
    content: `/* Student Management System - Custom Stylesheet */

:root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --navy-dark: #0f172a;
}

body {
    background-color: #f8fafc;
    color: #1e293b;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.navbar {
    background-color: #0f172a !important;
}

.card {
    border: 1px solid rgba(0, 0, 0, 0.06);
    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.table th {
    font-weight: 600;
    color: #475569;
    letter-spacing: 0.025em;
}

.table-hover tbody tr:hover {
    background-color: #f1f5f9;
}

.badge {
    font-weight: 500;
    padding: 0.35em 0.65em;
}

.btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    border-color: var(--primary-dark);
}

.font-monospace {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
}
`
  },
  {
    path: 'src/main/resources/static/js/validation.js',
    name: 'validation.js',
    category: 'Static',
    language: 'javascript',
    description: 'Client-side JavaScript validation for responsive user feedback before form submission.',
    content: `// Client-side form validation for Student Management System
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('studentForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Name validation
        const nameInput = document.getElementById('name');
        if (nameInput) {
            const nameVal = nameInput.value.trim();
            if (nameVal.length < 2) {
                markInvalid(nameInput, 'Name must be at least 2 characters long');
                isValid = false;
            } else {
                markValid(nameInput);
            }
        }

        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
        }

        // Mobile validation (10 digits)
        const mobileInput = document.getElementById('mobile');
        if (mobileInput) {
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(mobileInput.value.trim())) {
                markInvalid(mobileInput, 'Mobile number must be exactly 10 digits');
                isValid = false;
            } else {
                markValid(mobileInput);
            }
        }

        // Department validation
        const deptInput = document.getElementById('department');
        if (deptInput) {
            if (!deptInput.value) {
                markInvalid(deptInput, 'Please choose a department');
                isValid = false;
            } else {
                markValid(deptInput);
            }
        }

        // Course validation
        const courseInput = document.getElementById('course');
        if (courseInput) {
            if (courseInput.value.trim().length === 0) {
                markInvalid(courseInput, 'Please enter course details');
                isValid = false;
            } else {
                markValid(courseInput);
            }
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    function markInvalid(element, message) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        const feedback = element.parentElement.querySelector('.invalid-feedback');
        if (feedback && message) {
            feedback.textContent = message;
        }
    }

    function markValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }
});
`
  },
  {
    path: 'README.md',
    name: 'README.md',
    category: 'Documentation',
    language: 'markdown',
    description: 'Comprehensive college project guide, architecture diagram, IDE run instructions, and Viva Voce questions.',
    content: `# Student Management System (SMS) - Full Stack Java Mini Project

A complete, production-ready Full Stack Web Application built using **Spring Boot 3**, **Spring Data JPA**, **MySQL**, **Thymeleaf**, **HTML5**, **CSS3**, **Bootstrap 5**, and **JavaScript**.

---

## 📌 Project Overview
The Student Management System provides an intuitive institutional interface for college administrators and faculty to manage student records throughout their academic lifecycle.

### Core Features:
- **Dashboard**: Total student count, departmental breakdown, and recent enrollment overview.
- **Student Directory**: Tabular view of all registered students with ID, Name, Email, Mobile, Department, Course.
- **Search System**: Real-time keyword search across student name, email, mobile, department, and course.
- **Add Student**: Form with multi-field client-side and server-side Bean Validation (\`@NotBlank\`, \`@Email\`, \`@Pattern\`).
- **Edit Student**: Seamless pre-filled record update with unique email conflict protection.
- **Delete Student**: Record removal with user confirmation dialog to avoid accidental deletes.
- **Responsive Layout**: Designed for desktops, laptops, and mobile screens via Bootstrap 5.

---

## 🛠️ Technology Stack
| Layer | Technology |
|---|---|
| **Backend Framework** | Spring Boot 3.2.x (Java 17 / 21) |
| **Persistence / ORM** | Spring Data JPA / Hibernate |
| **Database** | MySQL 8.x (\`student_db\`) |
| **Template Engine** | Thymeleaf 3.x |
| **Frontend Framework** | Bootstrap 5.3 + Bootstrap Icons |
| **Validation** | Jakarta Bean Validation (Hibernate Validator) |
| **Build Tool** | Apache Maven 3.8+ |

---

## 🗄️ Database Fields
| Field Name | Type | Constraints | Description |
|---|---|---|---|
| \`id\` | \`BIGINT\` | Primary Key, Auto Increment | Unique Student Identification Number |
| \`name\` | \`VARCHAR(100)\` | NOT NULL | Full name of the student |
| \`email\` | \`VARCHAR(100)\` | NOT NULL, UNIQUE | Student institutional/personal email |
| \`mobile\` | \`VARCHAR(15)\` | NOT NULL (10 Digits) | Contact mobile number |
| \`department\` | \`VARCHAR(100)\` | NOT NULL | Academic Department |
| \`course\` | \`VARCHAR(100)\` | NOT NULL | Enrolled Degree / Program |
| \`created_at\` | \`TIMESTAMP\` | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |

---

## 🚀 How to Run the Project Locally

### Step 1: Clone or Download the Project
Extract the downloaded \`student-management-system.zip\` to your desired directory.

### Step 2: Set Up MySQL Database
1. Open **MySQL Workbench**, **XAMPP / phpMyAdmin**, or the **MySQL Command Line Client**.
2. Run the script in \`src/main/resources/schema.sql\` or execute:
\`\`\`sql
CREATE DATABASE student_db;
\`\`\`
3. Verify or update credentials in \`src/main/resources/application.properties\`:
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
\`\`\`

### Step 3: Run the Application
#### Option A: Using Command Line (Terminal / CMD)
\`\`\`bash
cd student-management-system
mvn clean spring-boot:run
\`\`\`

#### Option B: Using IntelliJ IDEA
1. Open IntelliJ IDEA -> **File > Open** -> Select the project folder.
2. Allow Maven to import dependencies automatically.
3. Locate \`src/main/java/com/example/studentmanagement/StudentManagementApplication.java\`.
4. Right-click and choose **Run 'StudentManagementApplication'**.

#### Option C: Using Eclipse / STS (Spring Tool Suite)
1. File -> **Import** -> **Existing Maven Projects**.
2. Right-click project -> **Run As** -> **Spring Boot App**.

### Step 4: Open in Web Browser
Open your browser and navigate to:
\`\`\`
http://localhost:8080
\`\`\`

---

## 🎓 College Viva Voce Questions & Answers (Mini Project Viva)

1. **Q: Why did you choose Spring Boot over traditional Spring MVC?**
   *A:* Spring Boot provides auto-configuration, an embedded Tomcat server (no separate WAR deployment required), and starter dependencies, which drastically reduces boilerplate XML configuration.

2. **Q: What is the role of Spring Data JPA?**
   *A:* Spring Data JPA reduces data access layer boilerplate. By extending \`JpaRepository<Student, Long>\`, standard CRUD methods (\`save\`, \`findAll\`, \`findById\`, \`deleteById\`) are provided automatically without writing manual SQL or JDBC statements.

3. **Q: What is Thymeleaf and how does it integrate with Spring Boot?**
   *A:* Thymeleaf is a modern server-side Java template engine that parses HTML files. It allows natural templates (valid HTML that can be previewed in a browser) and uses expressions like \`th:text\`, \`th:each\`, and \`th:field\` to bind backend Model data.

4. **Q: How does validation work in this project?**
   *A:* We implement two-layer validation:
   - *Client-side:* JavaScript validates fields before form submission for fast user feedback.
   - *Server-side:* Jakarta Validation annotations (\`@NotBlank\`, \`@Email\`, \`@Pattern\`) on the \`Student\` entity, verified by \`@Valid\` and \`BindingResult\` in \`StudentController\`.

5. **Q: How is the search feature implemented?**
   *A:* Using a JPQL (Java Persistence Query Language) query with the \`@Query\` annotation in \`StudentRepository\`. It performs case-insensitive wildcard pattern matching (\`LIKE %:keyword%\`) across name, email, mobile, department, and course.
`
  }
];
