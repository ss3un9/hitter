package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.LikeDTO;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.LikeEntity;
import com.codingrecipe.member.entity.SongEntity;
import com.codingrecipe.member.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    public LikeDTO likeSong(LikeDTO likeDTO) {
        // LikeDTO를 LikeEntity로 변환
        LikeEntity likeEntity = LikeEntity.fromDTO(likeDTO);

        // 좋아요 저장
        LikeEntity likeSaveEntity = likeRepository.save(likeEntity);

        // 저장된 LikeEntity의 id를 LikeDTO에 설정
        LikeDTO savelikeDTO = LikeDTO.toLikeDTO(likeSaveEntity);

        return savelikeDTO;
    }

    public void unlikeSong(Long likeId) {
        // 좋아요 제거
        likeRepository.deleteById(likeId);
    }

    @Transactional
    public void updateLikes(Long id) {
        likeRepository.updateLikes(id);

    }

    @Transactional
    public void updateUnLikes(Long id) {
        likeRepository.updateUnLikes(id);

    }

    public List<LikeDTO> findByUserId(Long memberId) {
        List<LikeEntity> likeEntityList = likeRepository.findByMemberId(memberId);
        List<LikeDTO> likeDTOList = new ArrayList<>();


        for (LikeEntity likeEntity: likeEntityList){
            likeDTOList.add(LikeDTO.toLikeDTO(likeEntity));
        }

        return likeDTOList;
    }
}
