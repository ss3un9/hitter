package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.BoardDTO;
import com.codingrecipe.member.dto.CommentDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.service.BoardService;
import com.codingrecipe.member.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final CommentService commentService;

    @PostMapping("/board/post")
    public ResponseEntity<Map<String, Object>> write(@Valid @ModelAttribute BoardDTO boardDTO, @PageableDefault(page=1) Pageable pageable){
        BoardDTO writeResult = boardService.write(boardDTO);
        Map<String, Object> response = new HashMap<>();

        System.out.println(writeResult);
        if (writeResult != null) {
            response.put("message", "게시글이 성공적으로 등록되었습니다");
            response.put("post", writeResult);
            return ResponseEntity.status(HttpStatus.OK).body( response);


        }else{
            response.put("message", "게시글 등록에 실패했습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }


    }

    @GetMapping("/board/detail/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable Long id, @PageableDefault(page=1) Pageable pageable) {
        boardService.updateHits(id);
        BoardDTO boardDTO = boardService.findById(id);
        List<CommentDTO> commentDTOList = commentService.findAll(id);
        Map<String, Object> response = new HashMap<>();

        if ( boardDTO != null) {
            response.put("board", boardDTO);
            response.put("commentList", commentDTOList);
            response.put("page", pageable.getPageNumber());

            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body( response);

        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/board/PostUpdate/{id}")
    public ResponseEntity<Map<String, Object>> board_updateForm(@PathVariable Long id,   @PageableDefault(page=1) Pageable pageable) {
        BoardDTO boardDTO = boardService.findById(id);

        Map<String, Object> response = new HashMap<>();

        if ( boardDTO != null) {
            response.put("boardUpdate", boardDTO);
            response.put("page", pageable.getPageNumber());

            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body( response);

        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @PostMapping("/board/PostUpdate")
    public ResponseEntity<Map<String, Object>> board_update(@ModelAttribute BoardDTO boardDTO, @PageableDefault(page = 1) Pageable pageable) {
        try {
            BoardDTO updatedBoard = boardService.update(boardDTO);

            if (updatedBoard != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("board", updatedBoard);
                response.put("page", pageable.getPageNumber());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "게시글 등록에 실패했습니다");

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "게시글을 수정하지 못했습니다. 오류: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    @GetMapping("board/delete/{id}")
    public void board_delete(@PathVariable Long id, Model model, @PageableDefault(page=1) Pageable pageable){
        boardService.delete(id);

    }

    // /board/paging?page=1
    @GetMapping("board/paging")
    public ResponseEntity<Map<String, Object>> community(@PageableDefault(page = 1) Pageable pageable, Model model) {
//        pageable.getPageNumber();

        Map<String, Object> responseData = new HashMap<>();
        List<BoardDTO> boardDTOList = boardService.findAll();
        responseData.put("boardList", boardDTOList);


        Page<BoardDTO> boardList = boardService.paging(pageable);
        int blockLimit = 3;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
        int endPage = Math.min((startPage + blockLimit - 1), boardList.getTotalPages());

        responseData.put("boardPageList", boardList);
        responseData.put("startPage", startPage);
        responseData.put("endPage", endPage);

        return ResponseEntity.ok(responseData);

    }

    @GetMapping("/board/MyPosts/{writeId}")
    public ResponseEntity<Map<String, Object>> getMyPosts(Model model, HttpSession session, @PathVariable Long writeId) {

        List<BoardDTO> boardDTOList = boardService.findBoardListByUserId(writeId);
        System.out.println("boardDTOList");
        Map<String, Object> responseData = new HashMap<>();
        if (boardDTOList  != null ) {
            responseData.put("boardList", boardDTOList);
            System.out.println(responseData);
            return ResponseEntity.status(HttpStatus.OK).body(responseData);
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseData);
        }

    }

}
