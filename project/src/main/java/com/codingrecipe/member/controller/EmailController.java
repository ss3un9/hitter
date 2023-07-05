package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.EmailPostDto;
import com.codingrecipe.member.dto.EmailResponseDto;
import com.codingrecipe.member.entity.EmailMessage;
import com.codingrecipe.member.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class EmailController {
    @Autowired
    private EmailService mailService;

    @GetMapping("/mailCheck")
    @ResponseBody
    public String mailCheck(String email) {
        System.out.println("이메일 인증 요청이 들어옴!");
        System.out.println("이메일 인증 이메일 : " + email);

        return mailService.joinEmail(email);
    }
}