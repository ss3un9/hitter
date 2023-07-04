import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MySong.css"
import MypageBar from "../../component/MypageBar";
import LyricsModal from '../hit/LyricsModal.js';
import playIcon from '../../assets/play_icon.png';
import PlayerModal from '../../component/PlayerModal.js';
const MySong = () => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const id = storedSession.loginId;

    const [mySongList, setMySongList] = useState([]);
    const [lyrics, setLyrics] = useState('');
    const [showLyricsModal, setShowLyricsModal] = useState(false);
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState('');


    const handleCloseLyricsModal = () => {
        setShowLyricsModal(false);
    };

    const handleClosePlayerModal = () => {
        setShowPlayerModal(false);
    };

    const handleOpenPlayer = (songId) => {
        console.log('플레이어 실행');
        setSelectedSongId(songId);
        setShowPlayerModal(true);
    };

    // 가사 보기 버튼을 클릭했을 때 호출되는 함수
    const handleViewLyrics = async (songId) => {
        console.log('함수호출댐');
        try {
            const response = await axios.get(`/song/txt/${songId}`);
            const { data } = response;
            console.log(response);
            setLyrics(data);
            setShowLyricsModal(true);
            console.log(showLyricsModal);
        } catch (error) {
            console.error('Error fetching lyrics:', error);
        }
    };


    const fetchData = async () => {
        try {


            const response = await axios.get(`/member/getMySong/${id}`);
            console.log(response)
            const { data } = response;
            console.log(data);
            setMySongList(data);



        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);

        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
            <div className='tbl-bar'>
                <div className='bar'>
                    <MypageBar /></div>
                <div className='table'>
                    <table className='song-table'>
                        <thead className='table-head'>
                            <tr className='table-tr'>
                                <th className='th'>ID</th>
                                <th className='th'>Song Title</th>
                                <th className='th'>Genre</th>
                                <th className='th'>CreatedTime</th>
                                <th>좋아요</th>
                                <th>재생</th> {/* 재생 버튼 추가 */}
                                <th>가사</th>
                                {/* Add more table headers for other properties */}
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {mySongList.map((song) => (
                                <tr key={song.id}>
                                    <td className='td'>{song.id}</td>
                                    <td className='td'>{song.songTitle}</td>
                                    <td className='td'>{song.genre}</td>
                                    <td className='td'>{song.songCreatedTime.replace("T", " ")}</td>
                                    <td>{song.songLike}</td>
                                    <td>
                                        {/*<Link to={`/song/play/${song.id}`}>재생</Link> */}
                                        <div
                                            className="play-button"
                                            onClick={() => handleOpenPlayer(song.id)}
                                        >
                                            <img
                                                width={30}
                                                height={30}
                                                src={playIcon}
                                                alt="play-icon"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleViewLyrics(song.id)}>
                                            가사보기
                                        </button>
                                    </td>
                                    {/* Render additional table cells for other properties */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    )
}


export default MySong;