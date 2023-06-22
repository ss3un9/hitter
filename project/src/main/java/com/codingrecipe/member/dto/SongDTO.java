package com.codingrecipe.member.dto;


import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SongDTO {
    private Long id;
    private Long memberId;
    private Float prediction;
    private String fileOriginalName;
    private String fileSysName;

    private LocalDateTime SongCreatedTime;
    public static SongDTO toSongDTO(SongEntity songEntity) {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songEntity.getId());
        songDTO.setMemberId(songEntity.getMember().getId());
        songDTO.setPrediction(songEntity.getPrediction());
        songDTO.setFileOriginalName(songEntity.getFileOriginalName());
        songDTO.setFileSysName(songEntity.getFileSysName());
        songDTO.setSongCreatedTime(songEntity.getCreatedTime());
        return songDTO;
    }

}


