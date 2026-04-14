package com.example.logistic.DTO.Contracts.Detail;

public class ContentDTO {
    private byte[] data;
    private String fileName;
    private String contentType;

    public ContentDTO(byte[] data, String fileName, String contentType) {
        this.data = data;
        this.fileName = fileName;
        this.contentType = contentType;
    }

    public ContentDTO() {
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
