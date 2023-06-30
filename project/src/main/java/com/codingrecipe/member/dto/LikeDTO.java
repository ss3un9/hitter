package com.codingrecipe.member.dto;

import com.codingrecipe.member.entity.LikeEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor  //기본생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자
public class LikeDTO {
    private Long id;
    private Long memberId;
    private Long songId;

    public static LikeDTO toLikeDTO(LikeEntity likeEntity) {
        LikeDTO likeDTO = new LikeDTO();
        likeDTO.setId(likeEntity.getId());
        likeDTO.setMemberId(likeEntity.getMember().getId());
        likeDTO.setSongId(likeEntity.getSong().getId());
        return likeDTO;
    }
}
