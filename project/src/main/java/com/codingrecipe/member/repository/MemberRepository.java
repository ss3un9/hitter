package com.codingrecipe.member.repository;

import com.codingrecipe.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 이메일로 회원 정보 조회 (select * from member_table where member_email=?)

    Optional<MemberEntity> findByMemberEmail(String MemberEmail);
    Optional<String> findByMemberNickName(String memberNickName);
    @Query("SELECT m, s FROM MemberEntity m JOIN SongEntity s ON m.id = s.member.id")
    List<Object[]> findMembersAndSongs();
}
