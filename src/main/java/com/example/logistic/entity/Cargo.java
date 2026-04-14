package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table( name="cargo")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="cargo_code", insertable = false, updatable = false)
    private String cargoCode;
    @Column(name="cargo_name")
    private String cargoName;

    @Column(name="cargo_category")
    private String cargoCategory;

    @Column(name="total_weight")
    private double totalWeight;

    @Column(name="quantity")
    private int quantity;

    @Column(name="package_count")
    private int packageCount;

    @Column(name="good_value")
    private double goodValue;

    public Cargo() {
    }

    public String getCargoName() {
        return cargoName;
    }

    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCargoCode() {
        return cargoCode;
    }

    public void setCargoCode(String cargoCode) {
        this.cargoCode = cargoCode;
    }

    public String getCargoCategory() {
        return cargoCategory;
    }

    public void setCargoCategory(String cargoCategory) {
        this.cargoCategory = cargoCategory;
    }

    public double getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(double totalWeight) {
        this.totalWeight = totalWeight;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPackageCount() {
        return packageCount;
    }

    public void setPackageCount(int packageCount) {
        this.packageCount = packageCount;
    }

    public double getGoodValue() {
        return goodValue;
    }

    public void setGoodValue(double goodValue) {
        this.goodValue = goodValue;
    }
}
