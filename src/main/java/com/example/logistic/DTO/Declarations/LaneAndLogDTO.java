package com.example.logistic.DTO.Declarations;

public class LaneAndLogDTO {
    private String lane;
    private LogDTO logDTO;


    public LaneAndLogDTO() {
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

    public LogDTO getLogDTO() {
        return logDTO;
    }

    public void setLogDTO(LogDTO logDTO) {
        this.logDTO = logDTO;
    }
}
