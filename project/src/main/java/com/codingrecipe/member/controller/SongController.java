package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.LikeDTO;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.LikeEntity;
import com.codingrecipe.member.service.LikeService;
import com.codingrecipe.member.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;
    private final LikeService likeService;

//    @GetMapping("/song/leader_board")
//    public ResponseEntity<Map<String, Object>> findAll() {
//        List<SongDTO> songDTOList = songService.findAll();
//
//        Map<String, Object> responseData = new HashMap<>();
//
//        if (songDTOList  != null ) {
//            responseData.put("songList", songDTOList);
//            return ResponseEntity.status(HttpStatus.OK).body(responseData);
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
//        }
//
//    }

    @GetMapping("/song/leader_board/{memberId}")
    public ResponseEntity<Map<String, Object>> findByMemberId(@PathVariable Long memberId,@PageableDefault(page = 1) Pageable pageable) {

        List<SongDTO> songDTOList = songService.findAll();
        List<LikeDTO> likeDTOList = likeService.findByUserId(memberId);

        Map<String, Object> responseData = new HashMap<>();
        Page<SongDTO> songList = songService.paging(pageable);
        int blockLimit = 3;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min((startPage + blockLimit - 1), songList.getTotalPages());
        if (songDTOList  != null ) {
            responseData.put("songList", songDTOList);
            responseData.put("likeList", likeDTOList);
            responseData.put("songPageList", songList);
            responseData.put("startPage", startPage);
            responseData.put("endPage", endPage);

            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }

    }

    @GetMapping("/song/leader_board/genre/{memberId}")
    public ResponseEntity<Map<String, Object>> findByGenreAndMemberId(@PathVariable Long memberId,@PageableDefault(page = 1) Pageable pageable,@RequestParam String genre) {
        System.out.println(genre);
        List<SongDTO> songDTOList = songService.findAll();
        List<LikeDTO> likeDTOList = likeService.findByUserId(memberId);

        Map<String, Object> responseData = new HashMap<>();
        Page<SongDTO> songList =  songService.pagingByGenre(genre, pageable);

        int blockLimit = 3;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min((startPage + blockLimit - 1), songList.getTotalPages());
        System.out.println(songList);
        if (songDTOList  != null ) {
            responseData.put("songList", songDTOList);
            responseData.put("likeList", likeDTOList);
            responseData.put("songPageList", songList);
            responseData.put("startPage", startPage);
            responseData.put("endPage", endPage);

            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }

    }






    @GetMapping("/song/detail/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable Long id) {

        SongDTO songDTO = songService.findById(id);
        System.out.println(songDTO);
        Map<String, Object> response = new HashMap<>();

        if ( songDTO != null) {
            response.put("songDTO", songDTO);


            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body( response);

        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }



    @GetMapping("/song/play/{id}")
    public ResponseEntity<Resource> PlaySong(@PathVariable Long id) throws IOException {
        SongDTO songDTO = songService.findById(id);

        String songFilePath = "C:/bp_music/" + songDTO.getFileSysName();

//        String songFilePath = "/Users/ss3un9/Desktop/fastapi/song/" + songDTO.getFileSysName();

        Resource resource = new UrlResource(Paths.get(songFilePath).toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);


    }

    @GetMapping("/song/txt/{id}")
    public ResponseEntity<Resource> SongTxt(@PathVariable Long id) throws IOException {
        SongDTO songDTO = songService.findById(id);


        String text = "C:/bp_music/" + songDTO.getLyrics();

//        String text = "/Users/ss3un9/Desktop/fastapi/txt/" + songDTO.getLyrics();

        Resource resource = new UrlResource(Paths.get(text).toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);


    }


}