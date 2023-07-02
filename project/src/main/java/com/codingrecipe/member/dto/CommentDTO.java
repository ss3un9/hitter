package com.codingrecipe.member.dto;


import com.codingrecipe.member.entity.CommentEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CommentDTO {
    private Long id;
    private Long commentWriterId;
    private String commentNickName;
    private String commentContents;
    private Long boardId;
    private LocalDateTime commentCreatedTime;

    public static CommentDTO toCommentDTO(CommentEntity commentEntity, Long boardId) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(commentEntity.getId());
        commentDTO.setCommentWriterId(commentEntity.getCommentWriterId());
        commentDTO.setCommentNickName(commentEntity.getCommentNickName());
        commentDTO.setCommentContents(commentDTO.getCommentContents());
        commentDTO.setBoardId(boardId);

        return commentDTO;
    }
}
