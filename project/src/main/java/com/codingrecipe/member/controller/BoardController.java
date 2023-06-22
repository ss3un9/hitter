package com.codingrecipe.member.controller;

import com.codingrecipe.member.dto.BoardDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.util.List;
@Controller
@RequiredArgsConstructor
public class BoardController {
    private  final BoardService boardService;

    @GetMapping("/board/write")
    public String saveForm() {
        System.out.println("write");
        return "write";

    }

    @PostMapping("/board/write")
    public String write(@ModelAttribute BoardDTO boardDTO, Model model,  @PageableDefault(page=1) Pageable pageable){
        BoardDTO board = boardService.write(boardDTO);
        model.addAttribute("board", board);
        model.addAttribute("page", pageable.getPageNumber());
        return "board_detail";
//        return "redirect:/board/" + boardDTO.getId();

    }

    @GetMapping("/board/{id}")
    public String findById(@PathVariable Long id, Model model, @PageableDefault(page=1) Pageable pageable) {

        boardService.updateHits(id);
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("board", boardDTO);
        model.addAttribute("page", pageable.getPageNumber());
        return "board_detail";
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
    public String paging(@PageableDefault(page = 1) Pageable pageable, Model model) {
//        pageable.getPageNumber();

        List<BoardDTO> boardDTOList = boardService.findAll();
        model.addAttribute("boardList", boardDTOList);

        Page<BoardDTO> boardList = boardService.paging(pageable);
        int blockLimit = 3;
        int startPage = (((int)(Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1; // 1 4 7 10 ~~
        int endPage = ((startPage + blockLimit - 1) < boardList.getTotalPages()) ? startPage + blockLimit - 1 : boardList.getTotalPages();

        // page 갯수 20개
        // 현재 사용자가 3페이지
        // 1 2 3
        // 현재 사용자가 7페이지
        // 7 8 9
        // 보여지는 페이지 갯수 3개
        // 총 페이지 갯수 8개

        model.addAttribute("boardList", boardList);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        return "community";

    }
}
