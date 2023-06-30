package com.codingrecipe.member.entity;

import com.codingrecipe.member.dto.LikeDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "like_song2")
public class LikeEntity {

    @Id // pk 지정
    @Column(name = "like_song_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private MemberEntity member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "song_id")
    private SongEntity song;
    public static LikeEntity fromDTO(LikeDTO likeDTO) {
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setId(likeDTO.getId());

        // Create MemberEntity and set it in LikeEntity
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setId(likeDTO.getMemberId());
        likeEntity.setMember(memberEntity);

        // Create SongEntity and set it in LikeEntity
        SongEntity songEntity = new SongEntity();
        songEntity.setId(likeDTO.getSongId());
        likeEntity.setSong(songEntity);

        return likeEntity;
    }
}
