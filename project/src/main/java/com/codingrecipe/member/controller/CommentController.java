package com.codingrecipe.member.controller;


import com.codingrecipe.member.dto.CommentDTO;
import com.codingrecipe.member.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody CommentDTO commentDTO) {


        Map<String, Object> responseData = new HashMap<>();
        Long saveResult = commentService.save(commentDTO);

        if (saveResult != null) {
            List<CommentDTO> commentDTOList = commentService.findAll(commentDTO.getBoardId());
            responseData.put("commentDTOList", commentDTOList);
            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        } else {
            responseData.put("해당 게시글이 존재하지 않습니다", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }

    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        try {
            commentService.deleteComment(commentId);
            return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete comment", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{commentId}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long commentId, @RequestBody CommentDTO commentDTO) {

        Map<String, Object> responseData = new HashMap<>();
        Long saveResult = commentService.updateComment(commentId, commentDTO);

        if (saveResult != null) {
            List<CommentDTO> commentDTOList = commentService.findAll(commentDTO.getBoardId());
            responseData.put("commentDTOList", commentDTOList);

            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        } else {
            responseData.put("해당 게시글이 존재하지 않습니다", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }


    }
}
