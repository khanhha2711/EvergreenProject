package com.example.logistic.DTO.Documents;

import com.example.logistic.DTO.RequestDTO.ActivityDTO;

import java.util.List;

public class DetailDocument {
    private ListDTO list;
    private List<LogDTO> log;
    private ActivityDTO activity;

    public DetailDocument() {
    }

    public ListDTO getList() {
        return list;
    }

    public void setList(ListDTO list) {
        this.list = list;
    }

    public List<LogDTO> getLog() {
        return log;
    }

    public void setLog(List<LogDTO> log) {
        this.log = log;
    }

    public ActivityDTO getActivity() {
        return activity;
    }

    public void setActivity(ActivityDTO activity) {
        this.activity = activity;
    }
}
