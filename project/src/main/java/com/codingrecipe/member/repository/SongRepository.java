package com.codingrecipe.member.repository;


import com.codingrecipe.member.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<SongEntity, Long> {

    List<SongEntity> findAllByOrderByIdDesc();
}
