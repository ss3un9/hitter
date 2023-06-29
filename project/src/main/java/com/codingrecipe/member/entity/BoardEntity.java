package com.codingrecipe.member.entity;

import com.codingrecipe.member.dto.BoardDTO;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;
@Size
@Entity
@Getter
@Setter
@Valid
@Table(name = "board")
public class BoardEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(name = "user_nickname")
    private String boardWriter;

    @Column(name = "user_id")
    private Long boardWriterId;

    @Column(name="board_title" )
    @NotBlank(message = "Board title must not be null or empty")
    @Size(min = 1)
    private String boardTitle;

    @Column(name="board_content" )
    @NotBlank(message = "Board contents must not be null or empty")
    @Size(min = 1)
    private String boardContents;

    @Column(name = "board_count")
    private int boardHits;

    @Column(name = "category_id")
    private BigInteger category;
    public static BoardEntity toSaveEntity(BoardDTO boardDTO){
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardWriterId(boardDTO.getBoardWriterId());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContents(boardDTO.getBoardContents());
        boardEntity.setBoardHits(0);
        return boardEntity;
    }


    public static BoardEntity toUpdateEntity(BoardDTO boardDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setId(boardDTO.getId());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardWriterId(boardDTO.getBoardWriterId());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContents(boardDTO.getBoardContents());
        boardEntity.setBoardHits(boardEntity.getBoardHits());
        return boardEntity;
    }
}

