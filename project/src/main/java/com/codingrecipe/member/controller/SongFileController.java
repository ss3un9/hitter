package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.service.MemberService;
import com.codingrecipe.member.service.SongService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;

import javax.servlet.http.HttpSession;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@RequiredArgsConstructor
public class SongFileController {
    private  final SongService songService;
    private  final MemberService memberService;
    @PostMapping("/api/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("file1") MultipartFile file1,@RequestParam("genre") String genre, @ModelAttribute SongDTO songDTO, HttpSession session) throws Exception {
        Long loginId = (Long) session.getAttribute("loginId");
        String loginNickName = (String) session.getAttribute("loginNickName");
        RestTemplate restTemplate = new RestTemplate();
        ;
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        });

        body.add("file1", new ByteArrayResource(file1.getBytes()) {
            @Override
            public String getFilename() {
                return file1.getOriginalFilename();
            }
        });


        body.add("genre", genre);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        System.out.println(loginId);


        System.out.println("reqEntity : "+requestEntity);
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8000/api/upload", requestEntity, String.class);

        String responseBody = response.getBody();
        System.out.println(responseBody);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        String predictionsStr = jsonNode.get("predictions").asText();
        predictionsStr = predictionsStr.replace("[[", "").replace("]]", "");
        float prediction = Float.parseFloat(predictionsStr);

        JsonNode answerTagsNode = jsonNode.get("answer_tags");
        List<String> answerTags = new ArrayList<>();
        if (answerTagsNode.isArray()) {
            for (JsonNode tagNode : answerTagsNode) {
                answerTags.add(tagNode.asText());
            }
        }
        String joinedTags = String.join(",", answerTags);
        System.out.println(joinedTags);

        String fileName = file.getOriginalFilename();
        String sysFileName = System.currentTimeMillis() +  "_" +  fileName;

        String filePath = "/home/ubuntu/song/" + sysFileName;
        byte[] fileBytes = file.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, fileBytes);

        String fileName1 = file1.getOriginalFilename();

        String sysFileName1 = System.currentTimeMillis() +  "_" +fileName1;
        String filePath1 = "/home/ubuntu/txt/"+sysFileName1;

        byte[] fileBytes1 = file1.getBytes();
        Path path1 = Paths.get(filePath1);
        Files.write(path1, fileBytes1);


        songDTO.setPrediction(prediction);
        songDTO.setMemberId(loginId);
        songDTO.setMemberNickName(loginNickName);
        songDTO.setFileSysName(sysFileName);
        songDTO.setLyrics(sysFileName1);
        songDTO.setSongTag(joinedTags);
        songService.save(songDTO);
        List<SongDTO> songsInRange = songService.findAll2(prediction - 10, prediction + 10);

        Map<String, Object> ResponseSong = new HashMap<>();


        ResponseSong.put("songDTO",songDTO );
        ResponseSong.put("songsInRange",  songsInRange);
        ResponseSong.put("success", true);
        ResponseSong.put("message", "File uploaded successfully!");

        System.out.println(ResponseSong);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseSong);





    }
}