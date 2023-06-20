package com.codingrecipe.member.dto;


import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SongDTO {
    private Long id;
    private Long userId;
    private Float prediction;
    private String fileOriginalName;
    private String fileSysName;
    public static SongDTO toSongDTO(SongEntity songEntity) {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songEntity.getId());
        songDTO.setUserId(songEntity.getUserId());
        songDTO.setPrediction(songEntity.getPrediction());
        songDTO.setFileOriginalName(songEntity.getFileOriginalName());
        songDTO.setFileSysName(songEntity.getFileSysName());
        return songDTO;
    }

}



