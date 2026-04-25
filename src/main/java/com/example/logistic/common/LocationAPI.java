package com.example.logistic.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Component
public class LocationAPI {
    public Map<String, Double> getLatLongFromAddress(String address) {
        try {
            String normalized = normalizeAddress(address);

            String url = "https://nominatim.openstreetmap.org/search?q="
                    + URLEncoder.encode(normalized, StandardCharsets.UTF_8)
                    + "&format=json&limit=1";

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "LogisticSystem/1.0 (abc@gmail.com)");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            System.out.println("INPUT: " + address);
            System.out.println("NORMALIZED: " + normalized);
            System.out.println("URL: " + url);
            System.out.println("RESPONSE: " + response.getBody());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            if (root.isArray() && root.size() > 0) {
                JsonNode obj = root.get(0);

                double lat = obj.get("lat").asDouble();
                double lon = obj.get("lon").asDouble();

                Map<String, Double> map = new HashMap<>();
                map.put("lat", lat);
                map.put("lon", lon);

                return map;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
    public static String normalizeAddress(String input) {
        if (input == null) return null;

        // Chuẩn hóa Unicode
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);

        // Xóa dấu tiếng Việt
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String result = pattern.matcher(normalized).replaceAll("");

        // Xử lý chữ đ
        result = result.replaceAll("đ", "d")
                .replaceAll("Đ", "D");

        result = result.toLowerCase();

        result = result.replaceAll("\\b(phuong|p\\.)\\s*\\d+\\b", "");

        // ❗ Xóa quận + số
        result = result.replaceAll("\\b(quan|q\\.)\\s*\\d+\\b", "");

        // ❗ Xóa chữ hành chính nhưng GIỮ lại tên phía sau
        result = result.replaceAll("\\b(thanh pho|tp\\.|tinh|huyen|xa|thi xa|thi tran)\\b", "");


        // Bỏ dấu phẩy + chuẩn hóa khoảng trắng
        result = result.replace(",", "")
                .trim()
                .replaceAll("\\s+", " ")
                .toLowerCase();

        return result;
    }
}
