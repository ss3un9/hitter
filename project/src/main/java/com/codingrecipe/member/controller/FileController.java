package com.codingrecipe.member.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.servlet.ModelAndView;


@RestController
public class FileController {

    @PostMapping("/api/upload")
    public ModelAndView uploadFile(@RequestParam("file") MultipartFile file, Model model) throws Exception {
        System.out.println("upload1");
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("upload2");
        // MultipartFile을 MultiValueMap에 담아서 FastAPI 서버에 전송
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();


        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });
        System.out.println(body);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        System.out.println(headers);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        // FastAPI 서버의 /process-audio 엔드포인트 호출
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/api/upload", requestEntity, String.class);
        System.out.println(response);
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String predictions = jsonNode.get("predictions").asText();
        System.out.println(predictions);

        ModelAndView modelAndView = new ModelAndView("mypage");
        modelAndView.addObject("predictions", predictions);
        return modelAndView;

    }
}