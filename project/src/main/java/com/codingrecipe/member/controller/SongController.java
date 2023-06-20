package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


import java.util.List;

@Controller
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @GetMapping("/song/leader_board")
    public String findAll(Model model) {
        List<SongDTO> songDTOList = songService.findAll();

        model.addAttribute("songList", songDTOList);
        return "leader_board";
    }
}