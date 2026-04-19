package com.example.logistic.DTO.Declarations;

import com.example.logistic.DTO.Container.ContainerDTO;
import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;

import java.util.List;

public class DetailDTO {
    private DeclarationDTO dto;
    private List<ContainerDTO> container;
    private AttachmentDTO attachment;
    private List<LogDTO> log;
    private ActivityDTO activityDTO;

    public DetailDTO() {
    }

    public DeclarationDTO getDto() {
        return dto;
    }

    public ActivityDTO getActivityDTO() {
        return activityDTO;
    }

    public void setActivityDTO(ActivityDTO activityDTO) {
        this.activityDTO = activityDTO;
    }

    public void setDto(DeclarationDTO dto) {
        this.dto = dto;
    }

    public List<ContainerDTO> getContainer() {
        return container;
    }

    public void setContainer(List<ContainerDTO> container) {
        this.container = container;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    public List<LogDTO> getLog() {
        return log;
    }

    public void setLog(List<LogDTO> log) {
        this.log = log;
    }
}
