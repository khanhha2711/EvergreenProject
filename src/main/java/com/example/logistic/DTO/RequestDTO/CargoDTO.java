package com.example.logistic.DTO.RequestDTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CargoDTO {
    @JsonProperty("cargoName")
    private String cargoName;

    @JsonProperty("cargoCategory")
    private String cargoCategory;

    @JsonProperty("packageCount")
    private int packageCount;

    @JsonProperty("grossWeight")
    private double grossWeight;

    @JsonProperty("cargoValue")
    private double cargoValue;

    public CargoDTO() {
    }

    public String getCargoName() {
        return cargoName;
    }

    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }

    public String getCargoCategory() {
        return cargoCategory;
    }

    public void setCargoCategory(String cargoCategory) {
        this.cargoCategory = cargoCategory;
    }

    public int getPackageCount() {
        return packageCount;
    }

    public void setPackageCount(int packageCount) {
        this.packageCount = packageCount;
    }

    public double getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(double grossWeight) {
        this.grossWeight = grossWeight;
    }

    public double getCargoValue() {
        return cargoValue;
    }

    public void setCargoValue(double cargoValue) {
        this.cargoValue = cargoValue;
    }
}