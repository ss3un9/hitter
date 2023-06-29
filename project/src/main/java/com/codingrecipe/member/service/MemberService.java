package com.codingrecipe.member.service;

import com.codingrecipe.member.dto.MemberDTO;
import com.codingrecipe.member.dto.SongDTO;
import com.codingrecipe.member.entity.MemberEntity;
import com.codingrecipe.member.entity.SongEntity;
import com.codingrecipe.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void save(MemberDTO memberDTO) {

        String hashedPassword = BCrypt.hashpw(memberDTO.getMemberPassword(), BCrypt.gensalt());
        memberDTO.setMemberPassword(hashedPassword);
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
        // repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }

    @Transactional
    public void printMembersAndSongs() {
        List<Object[]> membersAndSongs = memberRepository.findMembersAndSongs();

        List<SongDTO> songDTOs = new ArrayList<>();

        for (Object[] result : membersAndSongs) {
            MemberEntity member = (MemberEntity) result[0];
            SongEntity song = (SongEntity) result[1];

            SongDTO songDTO = new SongDTO();
            songDTO.setId(song.getId());
            songDTO.setMemberId(member.getId());

            songDTO.setPrediction(song.getPrediction());
            songDTO.setSongTitle(song.getSongTitle());
            songDTO.setFileSysName(song.getFileSysName());
            songDTO.setLyrics(song.getLyrics());
            songDTO.setGenre(song.getGenre());
            songDTO.setSongCreatedTime(song.getCreatedTime());
            songDTO.setMemberNickName(member.getMemberNickName());
            songDTOs.add(songDTO);
        }

        System.out.println(songDTOs);
    }
    public MemberDTO login(MemberDTO memberDTO) {

        Optional<MemberEntity> byMemberEmail = memberRepository.findByMemberEmail(memberDTO.getMemberEmail());

        if (byMemberEmail.isPresent()) {

            MemberEntity memberEntity = byMemberEmail.get();

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(memberDTO.getMemberPassword(), memberEntity.getMemberPassword())) {
                MemberDTO dto = MemberDTO.toMemberDTO(memberEntity);
                return dto;
            }

            else {
                return null;
            }
        } else {
            return null;
        }
    }
    public List<MemberDTO> findAll() {
        List<MemberEntity> memberEntityList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (MemberEntity memberEntity: memberEntityList) {
            memberDTOList.add(MemberDTO.toMemberDTO(memberEntity));
        }
        return memberDTOList;
    }

    public MemberDTO findById(Long id) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
        if (optionalMemberEntity.isPresent()) {

            return MemberDTO.toMemberDTO(optionalMemberEntity.get());
        } else {
            return null;
        }

    }


    public List<SongDTO> getSongsByMemberId(Long memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));

        List<SongEntity> songs = memberEntity.getSongs();
        List<SongDTO> songDTOs = songs.stream()
                .map(SongDTO::toSongDTO)
                .collect(Collectors.toList());

        return songDTOs;
    }
    public Optional<String> findNicknameById(Long id) {
        Optional<MemberEntity> memberEntityOptional = memberRepository.findById(id);
        return memberEntityOptional.map(MemberEntity::getMemberNickName);
    }
    public MemberDTO updateForm(String myEmail) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMemberEmail(myEmail);
        System.out.println(optionalMemberEntity);
        if (optionalMemberEntity.isPresent()) {
            return MemberDTO.toMemberDTO(optionalMemberEntity.get());
        } else {
            return null;
        }
    }

    public void update(MemberDTO memberDTO) {
        String hashedPassword = BCrypt.hashpw(memberDTO.getMemberPassword(), BCrypt.gensalt());
        memberDTO.setMemberPassword(hashedPassword);
        memberRepository.save(MemberEntity.toUpdateMemberEntity(memberDTO));

    }

    public void update_exceptpw(MemberDTO memberDTO) {
        memberRepository.save(MemberEntity.toUpdateMemberEntity(memberDTO));

    }

    public boolean deleteById(Long id) {
        try {
            memberRepository.deleteById(id);
            return true; // 회원 탈퇴 성공
        } catch (Exception e) {
            return false; // 회원 탈퇴 실패
        }
    }

    public String emailCheck(String memberEmail) {
        Optional<MemberEntity> byMemberEmail = memberRepository.findByMemberEmail(memberEmail);
        if (byMemberEmail.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return null;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return "ok";
        }
    }
}













