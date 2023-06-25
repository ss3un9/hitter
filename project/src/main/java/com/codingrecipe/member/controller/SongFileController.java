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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
public class SongFileController {
        private  final SongService songService;
        private  final MemberService memberService;
        @PostMapping("/api/upload")
        public ResponseEntity<Map<String, Object>> uploadFile(@RequestParam("file") MultipartFile file, @ModelAttribute SongDTO songDTO, HttpSession session) throws Exception {
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
                songDTO.setMemberId(loginId);
                songDTO.setFileOriginalName(fileName);
                songDTO.setFileSysName(sysFileName);
                songService.save(songDTO);

                Optional<String> nicknameOptional = memberService.findNicknameById(loginId);
                String userNickName = nicknameOptional.orElse("");

                System.out.println(userNickName);

                Map<String, Object> ResponseSong = new HashMap<>();


                ResponseSong.put("songDTO",songDTO );
                ResponseSong.put("success", true);
                ResponseSong.put("message", "File uploaded successfully!");
                ResponseSong.put("userNickName",userNickName );

                System.out.println(ResponseSong);
                return ResponseEntity.status(HttpStatus.OK).body(ResponseSong);





        }
}