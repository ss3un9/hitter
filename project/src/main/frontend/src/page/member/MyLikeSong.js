import React, {useEffect, useState} from "react";
import "./MyPage.css"
import {Link, useNavigate} from "react-router-dom";
import {BsPencilSquare} from "react-icons/bs";
import {Button, Container} from "react-bootstrap";
import {GiMusicalNotes} from "react-icons/gi";
import photo from "../../imgs/profile.png";
import {FaChalkboardUser} from "react-icons/fa6";
import {FaRegFaceSadTear} from "react-icons/fa6"
import MyBar from "../../component/MypageBar"
import axios from "axios";
import MypageBar from "../../component/MypageBar";
import playIcon from "../../assets/play_icon.png";
import LyricsModal from "../hit/LyricsModal";
import PlayerModal from "../../component/PlayerModal";
import LikeButton from "../hit/LikeButton";

function Select() {
    return null;
}

const MyLikeSong = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const id = storedSession.loginId;
    const [songList, setSongList] = useState([]);
    const [likeList, setLikeList] = useState([]);

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
        setSelectedSongId(songId);
        setShowPlayerModal(true);
    };

    // 가사 보기 버튼을 클릭했을 때 호출되는 함수
    const handleViewLyrics = async (songId) => {

        try {
            const response = await axios.get(`/song/txt/${songId}`);
            const {data} = response;
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

            const response = await axios.get(`/member/getMyLikeSong/${id}`, {
                params: {
                    Id: id,
                }
            });


            const {data} = response;
            const updatedSongList = data.songList.map((song) => {
                const matchingLike = data.likeList.find((like) => like.songId === song.id);
                if (matchingLike) {
                    return {
                        ...song,
                        isLiked: true,
                        likeId: matchingLike.id,
                    };
                }
                return song;
            });

            setSongList(updatedSongList);
        } catch (error) {
            console.error('Error fetching data:', error);
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

        <div className='tbl-bar'>
            <div className='bar'>
                <MypageBar/></div>
            <div className='table'>
                {songList.length === 0 ? (
                    <table className='song-table'>
                        <tbody className='tb-top-body'>
                        <tr className='tr-info'>
                            <td colSpan="5">
                                좋아하는 곡이 없습니다.{" "}
                                <Link to="/song/board">노래 보러 가기</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                ) : (

                    <table className='song-table'>
                        <thead className='table-head'>
                        <tr className='table-tr'>
                            <th className='th'></th>
                            <th className='th'>ID</th>
                            <th className='th'>Song Title</th>
                            <th className='th'>Genre</th>
                            <th className='th'>CreatedTime</th>
                            <th>좋아요</th>
                            <th>재생</th>
                            {/* 재생 버튼 추가 */}
                            <th>가사</th>
                            {/* Add more table headers for other properties */}
                        </tr>
                        </thead>
                        <tbody className='table-body'>
                        {songList
                            .filter((song) => song.isLiked)
                            .map((song) => (
                                <tr key={song.id}>
                                    <td>
                                        <LikeButton
                                            memberId={id}
                                            songId={song.id}
                                            likeId={song.likeId}
                                            isLiked={"true"}
                                        />
                                    </td>
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
    )
}
export default MyLikeSong;
