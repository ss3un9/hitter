package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.BoardDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.service.BoardService;
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
    private  final BoardService boardService;

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

        Map<String, Object> response = new HashMap<>();

        if ( boardDTO != null) {
            response.put("board", boardDTO);
            response.put("page", pageable.getPageNumber());

            System.out.println(response);
            return ResponseEntity.status(HttpStatus.OK).body( response);

        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/board/update/{id}")
    public String board_updateForm(@PathVariable Long id, Model model,  @PageableDefault(page=1) Pageable pageable) {
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("boardUpdate", boardDTO);
        model.addAttribute("page", pageable.getPageNumber());
        return "board_update";

    }

    @PostMapping("board/update")
    public String board_update(@ModelAttribute BoardDTO boardDTO, Model model,  @PageableDefault(page=1) Pageable pageable){
        BoardDTO board = boardService.update(boardDTO);
        model.addAttribute("board", board);
        model.addAttribute("page", pageable.getPageNumber());
        return "board_detail";
//        return "redirect:/board/" + boardDTO.getId();

    }

    @GetMapping("board/delete/{id}")
    public String board_delete(@PathVariable Long id, Model model, @PageableDefault(page=1) Pageable pageable){
        boardService.delete(id);
        model.addAttribute("page", pageable.getPageNumber());
        return "redirect:/board/paging";
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

    @GetMapping("/board/my-posts")
    public String getMyPosts(Model model, HttpSession session) {
        // Retrieve user information from session
        Long loggedInUserId = (Long) session.getAttribute("loginId"); // Get the logged-in user's ID from the session

        List<BoardDTO> boardDTOList = boardService.findBoardListByUserId(loggedInUserId);
        model.addAttribute("boardList", boardDTOList);
        System.out.println(boardDTOList);
        return "my_posts";
    }

}
