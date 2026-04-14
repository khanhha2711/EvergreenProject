package com.example.logistic.DTO.Documents;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;

public class ListDTO {
    private String documentCode;
    private String documentType;
    private String documentNumber;
    private AttachmentDTO attachment;
    private LogDTO logDTO;
    public ListDTO() {
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    public LogDTO getLogDTO() {
        return logDTO;
    }

    public void setLogDTO(LogDTO logDTO) {
        this.logDTO = logDTO;
    }

    public String getDocumentCode() {
        return documentCode;
    }

    public void setDocumentCode(String documentCode) {
        this.documentCode = documentCode;
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
