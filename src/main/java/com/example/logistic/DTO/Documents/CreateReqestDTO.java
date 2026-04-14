package com.example.logistic.DTO.Documents;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class CreateReqestDTO {
    private String documentType;
    private String description;
    private AttachmentDTO attachmentDTO;

    public CreateReqestDTO() {
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AttachmentDTO getAttachmentDTO() {
        return attachmentDTO;
    }

    public void setAttachmentDTO(AttachmentDTO attachmentDTO) {
        this.attachmentDTO = attachmentDTO;
    }
}
