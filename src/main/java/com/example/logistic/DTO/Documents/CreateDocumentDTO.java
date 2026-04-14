package com.example.logistic.DTO.Documents;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;

public class CreateDocumentDTO {
    //Thêm chứng từ
    private String documentType;
    private String  documentNumber;

    public CreateDocumentDTO() {
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

}
