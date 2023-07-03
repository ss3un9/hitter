package com.codingrecipe.member.service;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.SongEntity;
import com.codingrecipe.member.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<SongDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 10; // 한 페이지에 보여줄 글 갯수
        // 한페이지당 3개씩 글을 보여주고 정렬 기준은 id 기준으로 내림차순 정렬
        // page 위치에 있는 값은 0부터 시작
        Page<SongEntity> songEntities =
                songRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "prediction")));

        // 목록: id, writer, title, hits, createdTime
        Page<SongDTO> songDTOS = songEntities.map(song -> new SongDTO(song.getId(), song.getMemberNickName(),song.getPrediction(), song.getSongTitle(), song.getGenre(), song.getSongLike(), song.getCreatedTime()));
        return songDTOS;
    }



    public Page<SongDTO> pagingByGenre(String genre, Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 10;

        Page<SongEntity> songEntities = songRepository.findByGenre(genre, PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "prediction")));
        Page<SongDTO> songDTOS = songEntities.map(song -> new SongDTO(song.getId(), song.getMemberNickName(), song.getPrediction(), song.getSongTitle(), song.getGenre(), song.getSongLike(), song.getCreatedTime()));

        return songDTOS;
    }

}