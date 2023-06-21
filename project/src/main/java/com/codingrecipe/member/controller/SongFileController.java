package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.service.SongService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
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

import javax.servlet.http.HttpSession;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequiredArgsConstructor
public class SongFileController {
    private  final SongService songService;
    @PostMapping("/api/upload")
    public ModelAndView uploadFile(@RequestParam("file") MultipartFile file, @ModelAttribute SongDTO songDTO, Model model, HttpSession session) throws Exception {
        Long loginId = (Long) session.getAttribute("loginId");
        RestTemplate restTemplate = new RestTemplate();


        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);


        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/api/upload", requestEntity, String.class);

        String responseBody = response.getBody();
        System.out.println(responseBody);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        String predictionsStr = jsonNode.get("predictions").asText();
        predictionsStr = predictionsStr.replace("[[", "").replace("]]", "");
        float prediction = Float.parseFloat(predictionsStr);


        String fileName = file.getOriginalFilename();
        String sysFileName = System.currentTimeMillis() + "_" + fileName;
        System.out.println(sysFileName);
        String filePath = "C:/bp_music/" + sysFileName;
        byte[] fileBytes = file.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, fileBytes);


        songDTO.setPrediction(prediction);
        songDTO.setUserId(loginId);
        songDTO.setFileOriginalName(fileName);
        songDTO.setFileSysName(sysFileName);
        songService.save(songDTO);
        ModelAndView modelAndView = new ModelAndView("index2");
        return modelAndView;

    }
}