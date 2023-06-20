package com.codingrecipe.member.entity;

import com.codingrecipe.member.dto.SongDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "song_ttt")
public class SongEntity {
    @Id // pk 지정
    @Column(name = "song_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @Column(name = "user_id" )
    private Long userId;

    @Column(name = "prediction")
    private Float prediction;

    @Column(name="file_original_name")
    private String fileOriginalName;


    @Column(name="file_sys_name")
    private String fileSysName;
    public static SongEntity toSongEntity(SongDTO songDTO) {
        SongEntity songEntity = new SongEntity();
        songEntity.setUserId(songDTO.getUserId());
        songEntity.setPrediction(songDTO.getPrediction());
        songEntity.setFileOriginalName(songDTO.getFileOriginalName());
        songEntity.setFileSysName(songDTO.getFileSysName());
        return songEntity;
    }
}
