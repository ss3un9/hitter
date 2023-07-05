package com.codingrecipe.member.repository;

import com.codingrecipe.member.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findAllByOrderByIdDesc();

    //update board_table set board_count = board count + 1 where id = ?
    @Modifying
    @Query(value = "update BoardEntity b set b.boardHits = b.boardHits + 1 where b.id =:id")
    void updateHits(@Param("id") Long id);

    List<BoardEntity> findByBoardWriterId(Long boardWriterId);
    List<BoardEntity> findByBoardTitleContaining(String keyword);



}
