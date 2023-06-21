package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.MemberDTO;

import com.codingrecipe.member.service.MemberService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;


    // 회원가입 페이지 출력 요청

    @PostMapping("/member/save")
    public void save(@ModelAttribute MemberDTO memberDTO) {
        memberService.save(memberDTO);

    }

    @GetMapping("/member/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/member/login")
    public ResponseEntity<Map<String, Object>> login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        Map<String, Object> response = new HashMap<>();

        if (loginResult != null) {
            // login 성공
            session.setAttribute("loginEmail", loginResult.getMemberEmail());
            session.setAttribute("loginId", loginResult.getId());
            session.setAttribute("loginNickName", loginResult.getMemberNickName());
            session.setAttribute("loginName", loginResult.getMemberName());


            System.out.println(loginResult);
            Map<String, Object> sessionData = new HashMap<>();
            sessionData.put("loginEmail", loginResult.getMemberEmail());
            sessionData.put("loginId", loginResult.getId());
            sessionData.put("loginNickName", loginResult.getMemberNickName());
            sessionData.put("loginName", loginResult.getMemberName());

            System.out.println(sessionData);
            response.put("success", true);
            response.put("session", sessionData);


        } else {
            // login 실패
            response.put("success", false);
        }

        return ResponseEntity.ok(response);
    }

//    @PostMapping("/member/login")
//    public ResponseEntity<?> login(@RequestBody MemberDTO memberDTO) {
//        MemberDTO loginResult = memberService.login(memberDTO);
//        if (loginResult != null) {
//            // 로그인 성공
//            String token = generateToken(loginResult.getId());
//            memberDTO.setToken(token);
//
//            return ResponseEntity.ok(memberDTO);
//
//        } else {
//            // 로그인 실패
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//
//    private String generateToken(Long memberId) {
//        // 토큰 생성 로직 구현
//        // (예시: JWT 토큰 생성)
//        String secretKey = "mySecretKey";
//        Date expirationDate = new Date(System.currentTimeMillis() + 3600000); // 토큰 유효시간 1시간
//        String token = Jwts.builder()
//                .setSubject(memberId.toString())
//                .setExpiration(expirationDate)
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
//        return token;
//    }

    @GetMapping("/member/")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        // 어떠한 html로 가져갈 데이터가 있다면 model사용
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }

    @GetMapping("/member/{id}")
    public String findById(@PathVariable Long id, Model model) {
        MemberDTO memberDTO = memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    @GetMapping("/member/update")
    public String updateForm(HttpSession session, Model model) {
        String myEmail = (String) session.getAttribute("loginEmail");
        MemberDTO memberDTO = memberService.updateForm(myEmail);
        model.addAttribute("updateMember", memberDTO);
        return "update";
    }

    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO) {
        memberService.update(memberDTO);
        return "redirect:/member/" + memberDTO.getId();
    }

    @GetMapping("/member/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        memberService.deleteById(id);
        return "redirect:/member/";
    }

//    @GetMapping("/member/logout")
//    public String logout(HttpSession session) {
//        session.invalidate();
//        return "index";
//    }

    @PostMapping("/member/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        System.out.println(session);
        System.out.println("logout");
        // 로그아웃 처리 후, 클라이언트에게 적절한 응답 반환
        return ResponseEntity.ok().build();
    }
    @PostMapping("/member/email-check")
    public @ResponseBody String emailCheck(@RequestParam("memberEmail") String memberEmail) {
        System.out.println("memberEmail = " + memberEmail);
        String checkResult = memberService.emailCheck(memberEmail);
        return checkResult;
    }

    @GetMapping("/member/hit_ai")
    public String hitai() {
        return "hit_ai";
    }


    @GetMapping("/member/mypage")
    public String mypage() {
        return "mypage";
    }


    @GetMapping("/member/leader_board")
    public String leaderboard() {
        return "leader_board";
    }

    @GetMapping("/kakao")
    public String kakao() {
        return "kakao";
    }

}


