import {Link, useLocation, useNavigate} from 'react-router-dom';
import './HitAiDetail.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

import {BsPlayCircleFill} from "react-icons/bs";
import {MdOutlineLyrics} from "react-icons/md";
import LikeButton from "./LikeButton";
import LyricsModal from "./LyricsModal";
import PlayerModal from "../../component/PlayerModal";

import {IoMdMusicalNotes} from "react-icons/io";


const HitAiDetail = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const location = useLocation();

    const songsInRange = location.state.songsInRange;
    console.log(songsInRange);

    let id;
    const searchParams = new URLSearchParams(location.search);
    id = parseInt(searchParams.get('id'));

    const [songTitle, setSongTitle] = useState('');
    const [songGenre, setSongGenre] = useState('');
    const [nickName, setNickName] = useState('');
    const [songPrediction, setSongPrediction] = useState('');
    const [songCreatedTIme, setSongCreatedTime] = useState('');
    const result1 = songPrediction.toString().slice(0, 2);
    const degree = Number(result1) * 3.6;
    const [songTag, setSongTag] = useState('');


    const [lyrics, setLyrics] = useState('');                                  //가사
    const [showLyricsModal, setShowLyricsModal] = useState(false);           //가사 모달
    const [showPlayerModal, setShowPlayerModal] = useState(false);           // 음악 모달
    const [selectedSongId, setSelectedSongId] = useState('');


    function reqList() {
        // navigate(`/board/paging?page=${page}`, { state: { page: page } });
        navigate(`/song/board`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/song/detail/${id}`);
                const {data} = response;
                console.log(data);
                if (response.status === 200) {
                    const song_title = data.songDTO.songTitle;
                    setSongTitle(song_title);

                    const song_genre = data.songDTO.genre;
                    setSongGenre(song_genre);

                    const user_nickname = data.songDTO.memberNickName;
                    setNickName(user_nickname);

                    const song_prediction = data.songDTO.prediction;
                    setSongPrediction(song_prediction);

                    const song_created = data.songDTO.songCreatedTime;
                    setSongCreatedTime(song_created);

                    const song_tag = data.songDTO.songTag;
                    setSongTag(song_tag);


                } else {
                    alert('게시글 정보를 불러오는데 실패하였습니다');
                }
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        };

        fetchData().catch((error) => {
            alert('오류가 발생했습니다. 다시 시도해주세요 ');
        });
    }, []);
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


    return (
        <>


            <div className='hit-det-wrapper'>

                <div className='content-wrap'>
                    <h1 className='an-res'>분석 결과 보고서</h1>
                    <div className='det-res'>
                        <div className='sc-ti'>
                            <div className='score-wrapper'>
                                <div className='score'>{result1}점</div>
                            </div>
                            <br></br>
                            <div className='an-gen'>[{songGenre.toUpperCase()}]</div>
                            <p className='nick'><IoMdMusicalNotes size='30' style={{
                                alignContent: 'center',
                                textAlign: 'center'
                            }}/>{songTitle} - {nickName}</p>
                        </div>
                        <p className='createdT'>Date: {songCreatedTIme.replace('T', ' ')}</p>
                        <p className='taags'>Tags: {songTag}</p>

                    </div>
                    <br/><br/><br/>

                    <button className='list-btn' onClick={() => reqList()}>목록</button>
                </div>
                >>>>>>> bcc0cf1a02c7fbce381d80678489670db0b44864

            </div>

            <div className="community-table-wrapper">
                <table className='cmtbl'>
                    <thead className='cmtbl-head'>
                    <tr className='trs'>
                        <th className='cmths'>songTitle</th>
                        <th className='cmths-title'>genre</th>
                        <th className='cmths-title'>prediction</th>
                        <th className='cmths-title'>노래</th>
                        <th className='cmths-title'>가사</th>
                    </tr>
                    </thead>
                    <tbody>

                    {songsInRange.slice(0, 5).map(board => (
                        <tr key={board.id}>

                            <td className='cmtds'>{board.songTitle}</td>
                            <td className='cmtds'>{board.genre}</td>
                            <td className='cmtds'>{board.prediction}</td>
                            <td>

                                <div
                                    className="play-button"
                                    onClick={() => handleOpenPlayer(board.id)}
                                >
                                    <BsPlayCircleFill className='BsPlayCircleFill' size='20'/>

                                </div>
                            </td>
                            <td className='lead-tds'>
                                <button className='lr-btn' onClick={() => handleViewLyrics(board.id)}>
                                    <MdOutlineLyrics className='MdOutlineLyrics' size={'20'}/>
                                </button>
                            </td>
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
        </>
    )
}


export default HitAiDetail;