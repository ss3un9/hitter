package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.LikeDTO;
import com.codingrecipe.member.dto.MemberDTO;

import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.service.LikeService;
import com.codingrecipe.member.service.MemberService;
import com.codingrecipe.member.service.SongService;
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
import java.util.*;

@RestController
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;
    private final SongService songService;
    private final LikeService likeService;


    @PostMapping("/member/save")
    public void save(@ModelAttribute MemberDTO memberDTO) {
        memberService.save(memberDTO);

    }

    @GetMapping("/member/login")
    public String loginForm() {
        return "login";
    }
    @GetMapping("/songs")
    public ResponseEntity<String> printMembersAndSongs() {
        try {
            memberService.printMembersAndSongs();
            return ResponseEntity.ok("Printed members and songs successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to print members and songs.");
        }
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
    public ResponseEntity<Map<String, Object>> updateForm(HttpSession session) {
        String myEmail = (String) session.getAttribute("loginEmail");
        System.out.println("1111");
        MemberDTO memberDTO = memberService.updateForm(myEmail);
        System.out.println(memberDTO);
        Map<String, Object> response = new HashMap<>();
        System.out.println("1111");
        if (memberDTO != null) {
            response.put("updateMember", memberDTO);
            System.out.println("1111");
            return ResponseEntity.status(HttpStatus.OK).body( response);
        }
        else{
            System.out.println("1222");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @GetMapping("/member/getMySong/{id}")
    public ResponseEntity<List<SongDTO>> getMySong(@PathVariable Long id) {
        List<SongDTO> songDTOList = memberService.getSongsByMemberId(id);

        return ResponseEntity.ok(songDTOList);
    }

    @GetMapping("/member/getMyLikeSong/{id}")
    public ResponseEntity<Map<String, Object>> getMyLikeSong(@PathVariable Long id) {
        List<LikeDTO> likeDTOList = likeService.findByUserId(id);
        List<SongDTO> songDTOList = songService.findAll();

        Map<String, Object> responseData = new HashMap<>();

        if (songDTOList != null) {
            responseData.put("songList", songDTOList);
            responseData.put("likeList", likeDTOList);

            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }
    }

    @PostMapping("/member/update")
    public void update(@ModelAttribute MemberDTO memberDTO) {

        memberService.update(memberDTO);
    }

    @PostMapping("/member/update/name")
    public void updateName(@ModelAttribute MemberDTO memberDTO) {

        memberService.update_exceptpw(memberDTO);
    }

    @GetMapping("/member/delete/{id}")
    public  ResponseEntity<Map<String, Object>> deleteById(@PathVariable Long id) {
        boolean success = memberService.deleteById(id);
        Map<String, Object> response = new HashMap<>();
        System.out.println(success);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).body( response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

        }
    }

    @PostMapping("/member/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().build();
    }
    @PostMapping("/member/email-check")
    public @ResponseBody String emailCheck(@RequestParam("memberEmail") String memberEmail) {
        String checkResult = memberService.emailCheck(memberEmail);
        return checkResult;
    }

    @PostMapping("/member/nick-check")
    public @ResponseBody String nickCheck(@RequestParam("memberNickName") String memberNickName) {
        System.out.println(memberNickName);
        String checkResult = memberService.NickNameCheck(memberNickName);

        return checkResult;
    }




}


