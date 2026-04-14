package com.example.logistic.DTO.QuotationDTO;

public class UpdateStatusDTO {
    private String quotationCode;
    private String status;

    public UpdateStatusDTO() {
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
