package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.LikeDTO;
import com.codingrecipe.member.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/song/like/{memberId}/{songId}")
    public ResponseEntity<Map<String, Object>> likeSong(
            @PathVariable Long memberId,
            @PathVariable Long songId,
            @RequestBody LikeDTO likeDTO
    ) {
        Map<String, Object> response = new HashMap<>();
        likeDTO.setMemberId(memberId);
        likeDTO.setSongId(songId);

        LikeDTO  savelikeDTO = likeService.likeSong(likeDTO);
        likeService.updateLikes(songId);


        response.put("likeDTO", savelikeDTO);

        return ResponseEntity.status(HttpStatus.OK).body( response);
    }

    @DeleteMapping("/song/unlike/{likeId}/{songId}")
    public ResponseEntity<String> unlikeSong(
            @PathVariable Long likeId,
            @PathVariable Long songId

    )
    {
        likeService.unlikeSong(likeId);
        likeService.updateUnLikes(songId);

        return ResponseEntity.ok("Song unliked successfully.");
    }
}
