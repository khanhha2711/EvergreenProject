package com.example.logistic.DTO.Declarations;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public class CreateNewDTO {
    private  String declarationNumber;
    private String lane;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate declarationDate;
    private String customsBranch;

    private List<ContainerDTO> container;

    private AttachmentDTO attachmentDTO;
    public CreateNewDTO() {
    }

    public List<ContainerDTO> getContainer() {
        return container;
    }

    public void setContainer(List<ContainerDTO> container) {
        this.container = container;
    }

    public String getDeclarationNumber() {
        return declarationNumber;
    }

    public void setDeclarationNumber(String declarationNumber) {
        this.declarationNumber = declarationNumber;
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

    public LocalDate getDeclarationDate() {
        return declarationDate;
    }

    public void setDeclarationDate(LocalDate declarationDate) {
        this.declarationDate = declarationDate;
    }

    public String getCustomsBranch() {
        return customsBranch;
    }

    public void setCustomsBranch(String customsBranch) {
        this.customsBranch = customsBranch;
    }


    public AttachmentDTO getAttachmentDTO() {
        return attachmentDTO;
    }

    public void setAttachmentDTO(AttachmentDTO attachmentDTO) {
        this.attachmentDTO = attachmentDTO;
    }
}
