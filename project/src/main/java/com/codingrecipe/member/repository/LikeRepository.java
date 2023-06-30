package com.codingrecipe.member.repository;

import com.codingrecipe.member.entity.LikeEntity;
import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Long> {


    @Modifying
    @Query(value = "update SongEntity s set s.songLike = s.songLike + 1 where s.id =:id")
    void updateLikes(@Param("id") Long id);

    @Modifying
    @Query(value = "update SongEntity s set s.songLike = s.songLike - 1 where s.id =:id")
    void updateUnLikes(@Param("id") Long id);

    List<LikeEntity> findByMemberId(Long memberId);
}
