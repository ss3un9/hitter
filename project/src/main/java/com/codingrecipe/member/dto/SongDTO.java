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
    private String memberNickName;
    private Float prediction;
    private String songTitle;
    private String fileSysName;
    private String lyrics;
    private String genre;

    private LocalDateTime SongCreatedTime;
    public static SongDTO toSongDTO(SongEntity songEntity) {
        SongDTO songDTO = new SongDTO();
        songDTO.setId(songEntity.getId());
        songDTO.setMemberId(songEntity.getMember().getId());
        songDTO.setMemberNickName(songEntity.getMemberNickName());
        songDTO.setPrediction(songEntity.getPrediction());
        songDTO.setFileSysName(songEntity.getFileSysName());
        songDTO.setSongTitle(songEntity.getSongTitle());
        songDTO.setLyrics(songEntity.getLyrics());
        songDTO.setGenre(songEntity.getGenre());
        songDTO.setSongCreatedTime(songEntity.getCreatedTime());
        return songDTO;
    }


}


