package com.codingrecipe.member.service;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.SongEntity;
import com.codingrecipe.member.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepository songRepository;


    public SongDTO save(SongDTO songDTO) {
        // 1. dto -> entity 변환
        // 2. repository의 save 메서드 호출
        SongEntity songEntity = SongEntity.toSongEntity(songDTO);
        SongEntity savedEntity = songRepository.save(songEntity);

        songDTO.setId(savedEntity.getId());

        return findById(songDTO.getId());
    }


    public SongDTO findById(Long id) {
        Optional<SongEntity> optionalSongEntity = songRepository.findById(id);
        if (optionalSongEntity.isPresent()) {
            SongEntity songEntity = optionalSongEntity.get();
            SongDTO songDTO = SongDTO.toSongDTO(songEntity);
            return songDTO;
        }else{
            return null;
        }
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
