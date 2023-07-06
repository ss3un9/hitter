package com.codingrecipe.member.repository;


import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<SongEntity, Long> {
    @Query("SELECT s FROM SongEntity s WHERE s.memberNickName <> '관리자'")
    Page<SongEntity> findAllSongsExceptAdmin(Pageable pageable);
    List<SongEntity> findAllByOrderByIdDesc();
    @Query("SELECT s FROM SongEntity s WHERE s.memberNickName <> '관리자' AND s.genre = :genre")
    Page<SongEntity> findByGenre(@Param("genre") String genre, Pageable pageable);


}