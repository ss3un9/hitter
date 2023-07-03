package com.codingrecipe.member.repository;

import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findAllByBoardEntityOrderById(BoardEntity boardEntity);

}
