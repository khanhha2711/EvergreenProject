package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="containers")
public class Containers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="declaration_id")
    private CusDeclarations cusDeclaration;

    @Column(name = "container_code", insertable = false, updatable = false)
    private String containerCode;

    @Column(name = "container_number")
    private String containerNumber;

    @Column(name = "type_container")
    private String typeContainer;

    public Containers() {
    }

    public String getContainerNumber() {
        return containerNumber;
    }

    public void setContainerNumber(String containerNumber) {
        this.containerNumber = containerNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public CusDeclarations getCusDeclaration() {
        return cusDeclaration;
    }

    public void setCusDeclaration(CusDeclarations cusDeclaration) {
        this.cusDeclaration = cusDeclaration;
    }

    public String getContainerCode() {
        return containerCode;
    }

    public void setContainerCode(String containerCode) {
        this.containerCode = containerCode;
    }

    public String getTypeContainer() {
        return typeContainer;
    }

    public void setTypeContainer(String typeContainer) {
        this.typeContainer = typeContainer;
    }
}
