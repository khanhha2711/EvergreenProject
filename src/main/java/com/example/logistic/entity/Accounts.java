package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="accounts")
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name="user_id")
    private Users userId;
    @Column(name = "gmail")
    private String gmail;
    @Column(name = "password")
    private String password;
    @ManyToOne
    @JoinColumn(name="role_id")
    private Roles roleId;

    public Accounts() {
    }

    public int getAccountId() {
        return id;
    }

    public void setId(int Id) {
        this.id = Id;
    }

    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }

    public String getGmail() {
        return gmail;
    }

    public void setGmail(String gmail) {
        this.gmail = gmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Roles getRoleId() {
        return roleId;
    }

    public void setRoleId(Roles roleId) {
        this.roleId = roleId;
    }
}
