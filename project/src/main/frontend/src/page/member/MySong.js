import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./MySong.css"
import {BsPlayCircleFill} from "react-icons/bs";
import MypageBar from "../../component/MypageBar";
import LyricsModal from '../hit/LyricsModal.js';
import playIcon from '../../assets/play_icon.png';
import PlayerModal from '../../component/PlayerModal.js';
import {MdOutlineLyrics} from "react-icons/md";

const MySong = () => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};                //로컬 스토리지에 저장된 회원 정보
    const id = storedSession.loginId;                                                           //로컬 스토리지에 저장된 아이디

    const [mySongList, setMySongList] = useState([]);                           //내가 업로드한 노래 리스트
    const [lyrics, setLyrics] = useState('');                                  //가사
    const [showLyricsModal, setShowLyricsModal] = useState(false);           //가사 모달
    const [showPlayerModal, setShowPlayerModal] = useState(false);           // 음악 모달
    const [selectedSongId, setSelectedSongId] = useState('');                  //음악을 재생하기 위해 전달할 songId


    const handleCloseLyricsModal = () => {
        setShowLyricsModal(false);
    };

    const handleClosePlayerModal = () => {
        setShowPlayerModal(false);
    };

    const handleOpenPlayer = (songId) => {
        setSelectedSongId(songId);
        setShowPlayerModal(true);
    };

    // 가사 보기 버튼을 클릭했을 때 호출되는 함수
    const handleViewLyrics = async (songId) => {
        try {
            const response = await axios.get(`/song/txt/${songId}`);
            const {data} = response;
            setLyrics(data);
            setShowLyricsModal(true);
        } catch (error) {
            alert('가사를 불러오지 못했습니다. 다시 시도해 주세요.');
        }
    };


    const fetchData = async () => {
        try {

            const response = await axios.get(`/member/getMySong/${id}`);
            const {data} = response;
            setMySongList(data);

        } catch (error) {
            alert('내 노래 목록을 불러오지 못했습니다. 다시 시도해 주세요.');

        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await fetchData();
            } catch (error) {
            }
        };
        fetchDataAsync().then(() => {
        }).catch((error) => {
        });
    }, []);

    return (
        <div className='mysongtbl-bar'>
            <div className='bar'>
                <MypageBar/>
            </div>
            <div className='myswrapper'>
                {mySongList.length === 0 ? (
                    <table className='nonot'>
                        <tbody className='tb-top-body'>
                        <tr className='tr-info'>
                            <td className='nono' colSpan="5">
                                업로드된 곡이 없습니다.{" "}
                                <Link to="/hit">노래 예측하러 가기</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                ) : (
                    <table className='mysong-table'>
                        <thead>
                        <tr>
                            <th className='mlth'>ID</th>
                            <th className='mlth-title'>Song Title</th>
                            <th className='mlth'>Genre</th>
                            <th className='mlth'>CreatedTime</th>
                            <th className='mlth'>좋아요</th>
                            <th className='mlth'>재생</th>
                            <th className='mlth'>가사</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mySongList.map((song) => (
                            <tr key={song.id}>
                                <td className='mystd'>{song.id}</td>
                                <td className='mystd'>{song.songTitle}</td>
                                <td className='mystd'>{song.genre}</td>
                                <td className='mystd'>{song.songCreatedTime.replace("T", " ")}</td>
                                <td className='mystd'>{song.songLike}</td>
                                <td className='mystd'>
                                    <div
                                        className="play-button"
                                        onClick={() => handleOpenPlayer(song.id)}
                                    >
                                        <BsPlayCircleFill className='BsPlayCircleFill' size='20'/>

                                    </div>
                                </td>
                                <td className='mystd'>
                                    <button className='lr-btn' onClick={() => handleViewLyrics(song.id)}>
                                        <MdOutlineLyrics className='MdOutlineLyrics' size={'20'}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <LyricsModal
                show={showLyricsModal}
                handleClose={handleCloseLyricsModal}
                lyrics={lyrics}
            />
            <PlayerModal
                key={selectedSongId}
                show={showPlayerModal}
                handleClose={handleClosePlayerModal}
                songId={selectedSongId}
            />
        </div>
    );
};


export default MySong;
