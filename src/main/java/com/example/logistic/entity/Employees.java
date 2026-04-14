package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="employees")
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "employee_code", insertable = false, updatable = false)
    @org.hibernate.annotations.Generated(org.hibernate.annotations.GenerationTime.INSERT)
    private String employeeCode;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users user;
    @Column(name = "department")
    private String department;
    @Column(name = "position")
    private String position;

    public Employees() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        id = id;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
