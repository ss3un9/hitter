package com.codingrecipe.member.repository;


import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<SongEntity, Long> {

    List<SongEntity> findAllByOrderByIdDesc();

}
