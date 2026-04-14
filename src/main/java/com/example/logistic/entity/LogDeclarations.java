package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="log_declarations")
public class LogDeclarations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="declarations_id")
    private CusDeclarations declarations;

    @Column(name = "declaration_number")
    private String declarationNumber;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @Column(name = "description")
    private String description;

    public LogDeclarations() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CusDeclarations getDeclarations() {
        return declarations;
    }

    public void setDeclarations(CusDeclarations declarations) {
        this.declarations = declarations;
    }

    public String getDeclarationNumber() {
        return declarationNumber;
    }

    public void setDeclarationNumber(String declarationNumber) {
        this.declarationNumber = declarationNumber;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
