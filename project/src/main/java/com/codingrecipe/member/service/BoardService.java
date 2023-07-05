package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.BoardDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class BoardService{

    private final BoardRepository boardRepository;

    public BoardDTO write(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        BoardEntity savedEntity = boardRepository.save(boardEntity);

        boardDTO.setId(savedEntity.getId()); // 저장된 글의 ID를 boardDTO에 설정

        return findById(boardDTO.getId());
    }

    public List<BoardDTO> findAll() {
        List<BoardEntity> boardEntityList = boardRepository.findAllByOrderByIdDesc();
        List<BoardDTO> boardDTOList = new ArrayList<>();

        for (BoardEntity boardEntity: boardEntityList){
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }
        return boardDTOList;

    }



    @Transactional
    public void updateHits(Long id) {
        boardRepository.updateHits(id);

    }

    @Transactional
    public BoardDTO findById(Long id) {
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if (optionalBoardEntity.isPresent()) {
            BoardEntity boardEntity = optionalBoardEntity.get();
            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);

            return boardDTO;
        } else {
            return null;
        }
    }


    public BoardDTO update(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDTO);
        boardRepository.save(boardEntity);
        return findById(boardDTO.getId());
    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    public Page<BoardDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 10; // 한 페이지에 보여줄 글 갯수
        // 한페이지당 3개씩 글을 보여주고 정렬 기준은 id 기준으로 내림차순 정렬
        // page 위치에 있는 값은 0부터 시작
        Page<BoardEntity> boardEntities =
                boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        // 목록: id, writer, title, hits, createdTime
        Page<BoardDTO> boardDTOS = boardEntities.map(board -> new BoardDTO(board.getId(), board.getBoardWriter(),board.getBoardWriterId(),  board.getBoardTitle(), board.getBoardHits(),  board.getCreatedTime()));
        return boardDTOS;
    }


// ...

    public Page<BoardDTO> SearchPaging(String keyword, Pageable pageable) {
        int page = pageable.getPageNumber();
        int pageLimit = 10; // 한 페이지에 보여줄 글 갯수

        List<BoardEntity> boardEntities;

        if (keyword != null && !keyword.isEmpty()) {
            boardEntities = boardRepository.findByBoardTitleContaining(keyword);
        } else {
            boardEntities = boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id"))).getContent();
        }

        // Convert the list to a Page
        Page<BoardEntity> boardPage = new PageImpl<>(boardEntities, pageable, boardEntities.size());

        // 목록: id, writer, title, hits, createdTime
        Page<BoardDTO> boardDTOS = boardPage.map(board -> new BoardDTO(board.getId(), board.getBoardWriter(), board.getBoardWriterId(), board.getBoardTitle(), board.getBoardHits(), board.getCreatedTime()));
        return PageableExecutionUtils.getPage(boardDTOS.getContent(), pageable, boardDTOS::getTotalElements);
    }


    public List<BoardDTO> findBoardListByUserId(Long boardWriterId) {
        List<BoardEntity> boardEntities = boardRepository.findByBoardWriterId(boardWriterId);
        List<BoardDTO> boardDTOList = new ArrayList<>();

        for (BoardEntity boardEntity : boardEntities) {
            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
            boardDTOList.add(boardDTO);
        }

        return boardDTOList;
    }

    public List<BoardDTO> searchByTitle(String keyword) {
        List<BoardEntity> boardEntityList = boardRepository.findByBoardTitleContaining(keyword);
        List<BoardDTO> boardDTOList = new ArrayList<>();

        for (BoardEntity boardEntity : boardEntityList) {
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }

        return boardDTOList;
    }


}
