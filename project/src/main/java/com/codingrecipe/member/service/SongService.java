package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.BoardDTO;
import com.codingrecipe.member.dto.MemberDTO;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.BoardEntity;
import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import com.codingrecipe.member.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;


    public void save(SongDTO songDTO) {
        // 1. dto -> entity 변환
        // 2. repository의 save 메서드 호출
        SongEntity songEntity = SongEntity.toSongEntity(songDTO);
        songRepository.save(songEntity);
        // repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    public List<SongDTO> findAll() {
        List<SongEntity> songEntityList = songRepository.findAll();
        List<SongDTO> songDTOList = new ArrayList<>();

        for (SongEntity songEntity: songEntityList){
            songDTOList.add(SongDTO.toSongDTO(songEntity));
        }
        return songDTOList;



    }
}
