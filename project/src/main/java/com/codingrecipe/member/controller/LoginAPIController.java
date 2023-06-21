package com.codingrecipe.member.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.codingrecipe.member.service.LoginAPiService;


@Controller
@AllArgsConstructor
@RequestMapping("/oauth")
public class LoginAPIController {

        @Autowired
        private LoginAPiService kakao;

        /**
         * 카카오 callback
         * [GET] /oauth/kakao/callback
         *
         * @return
         */
        @GetMapping("/kakao")
        public String kakaoCallback(@RequestParam("code") String code) {

                String access_Token = kakao.getKakaoAccessToken(code);
                System.out.println("controller access_token : " + access_Token);
                return "index2";
        }

}
