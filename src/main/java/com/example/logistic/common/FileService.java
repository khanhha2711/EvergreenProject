package com.example.logistic.common;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {
    //Upload File
    public String uploadFile(MultipartFile file, String uploadDir) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String saveName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir).resolve(saveName);

        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return saveName;
    }

    //Load File
    public ResponseEntity<Resource> loadFile(String fileName, String uploadDir) throws IOException {
        if (fileName == null) {
            return ResponseEntity.notFound().build();
        }

        Path path = Paths.get(uploadDir).resolve(fileName).normalize();

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new InputStreamResource(Files.newInputStream(path));

        String contentType = Files.probeContentType(path);
        if (contentType == null) contentType = "application/octet-stream";

        long fileSize = Files.size(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(fileSize)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }

    //Build AttachmentDTO
    public AttachmentDTO buildAttachment(String fileName, String uploadDir, String downloadURL) throws IOException {
        if (fileName == null) return null;

        Path path = Paths.get(uploadDir).resolve(fileName);

        String fileType = Files.probeContentType(path);
        if (fileType == null) fileType = "application/octet-stream";

        AttachmentDTO dto = new AttachmentDTO();
        dto.setFileName(fileName);
        dto.setFileType(fileType);
        dto.setDownloadURL(downloadURL);

        return dto;
    }
}
