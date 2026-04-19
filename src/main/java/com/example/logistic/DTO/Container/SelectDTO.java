package com.example.logistic.DTO.Container;

public class SelectDTO {
    private  String containerCode;
    private String containerNumber;

    public SelectDTO() {
    }

    public SelectDTO(String containerCode, String containerNumber) {
        this.containerCode = containerCode;
        this.containerNumber = containerNumber;
    }

    public String getContainerCode() {
        return containerCode;
    }

    public void setContainerCode(String containerCode) {
        this.containerCode = containerCode;
    }

    public String getContainerNumber() {
        return containerNumber;
    }

    public void setContainerNumber(String containerNumber) {
        this.containerNumber = containerNumber;
    }
}
