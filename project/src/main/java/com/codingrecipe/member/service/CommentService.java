package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.CommentDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.entity.CommentEntity;
import com.codingrecipe.member.repository.BoardRepository;
import com.codingrecipe.member.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;


    public Long save(CommentDTO commentDTO) {
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(commentDTO.getBoardId());
        if (optionalBoardEntity.isPresent()) {
            BoardEntity boardEntity = optionalBoardEntity.get();
            CommentEntity commentEntity = CommentEntity.toSaveEntity(commentDTO, boardEntity);
            return commentRepository.save(commentEntity).getId();
        }else {
            return null;
        }

    }

    public List<CommentDTO> findAll(Long boardId) {
        BoardEntity boardEntity = boardRepository.findById(boardId).get();
        List<CommentEntity> commentEntityList = commentRepository.findAllByBoardEntityOrderById(boardEntity);

        List<CommentDTO> commentDTOList = new ArrayList<>();
        for (CommentEntity commentEntity: commentEntityList) {

            CommentDTO commentDTO = CommentDTO.toCommentDTO(commentEntity, boardId);
            commentDTOList.add(commentDTO);
        }
        return commentDTOList;
    }


    public void deleteComment(Long commentId) {
        try {
            commentRepository.deleteById(commentId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete comment");
        }
    }

    public Long updateComment(Long commentId, CommentDTO commentDTO) {
        Optional<CommentEntity> optionalCommentEntity = commentRepository.findById(commentId);
        if (optionalCommentEntity.isPresent()) {
            CommentEntity commentEntity = optionalCommentEntity.get();
            Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(commentDTO.getBoardId());
            if (optionalBoardEntity.isPresent()) {
                BoardEntity boardEntity = optionalBoardEntity.get();

                commentEntity.setCommentContents(commentDTO.getCommentContents());

                commentEntity.setBoardEntity(boardEntity);

                return commentRepository.save(commentEntity).getId();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
