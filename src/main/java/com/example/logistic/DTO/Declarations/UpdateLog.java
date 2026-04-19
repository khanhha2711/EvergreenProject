package com.example.logistic.DTO.Declarations;

import com.example.logistic.DTO.RequestDTO.ActivityDTO;

import java.util.List;

public class UpdateLog {
    private LogDTO logDTO;
    private ActivityDTO activityDTO;

    public UpdateLog() {
    }

    public LogDTO getLogDTO() {
        return logDTO;
    }

    public void setLogDTO(LogDTO logDTO) {
        this.logDTO = logDTO;
    }

    public ActivityDTO getActivityDTO() {
        return activityDTO;
    }

    public void setActivityDTO(ActivityDTO activityDTO) {
        this.activityDTO = activityDTO;
    }
}
