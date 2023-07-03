import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import LyricsModal from './LyricsModal.js';
import playIcon from '../../assets/play_icon.png';
import './LeaderBoard.css';
import PlayerModal from '../../component/PlayerModal.js';
import {HiOutlineTrophy} from "react-icons/hi2";
import {HiTrendingUp} from "react-icons/hi"

const LeaderBoard = () => {
    const [session, setSession] = useState({});
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('session')) || {};

        if (storedSession && storedSession.loginName) {
            setSession(storedSession);
        }
    }, []);
    const location = useLocation();

    const memberId = storedSession.loginId;
    console.log(memberId);

    const searchParams = new URLSearchParams(location.search);

    const page = parseInt(searchParams.get('page')) || 1;


    const navigate = useNavigate();
    const [songList, setSongList] = useState([]);
    const [likeList, setLikeList] = useState([]);
    const [songPageList, setSongPageList] = useState([]);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [error, setError] = useState(false);
    const [lyrics, setLyrics] = useState('');
    const [showLyricsModal, setShowLyricsModal] = useState(false);
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState('');

    const Posting = () => {
        navigate("/hit")
    };
    const handleLikeUpdate = () => {
        fetchData(); // 좋아요 값 갱신을 위해 fetchData 호출
    };

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

    // 상태 관리를 위한 useState 훅 추가

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
    const fetchData = async (currentPage = page) => {

        try {

            const response = await axios.get(`/song/leader_board/${memberId}`, {
                params: {
                    memberId: memberId,
                    page: currentPage
                }
            });

            const { data } = response;
            console.log(data);

            const updatedSongList = data.songPageList.content.map(song => {
                const matchingLike = data.likeList.find(like => like.songId === song.id);

                return {
                    ...song,
                    isLiked: !!matchingLike,
                    likeId: matchingLike ? matchingLike.id : null,

                };
            });

            setSongList(updatedSongList);
            // console.log(songList);
            setLikeList(data.likeList);
            const { songPageList ,startPage, endPage } = data;


            setSongList(updatedSongList);

            setSongPageList(songPageList);
            setStartPage(startPage);
            setEndPage(endPage);

            navigate(`/song/board?page=${page}`);

        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);

            setError(true);
        }


    };

    const handleGenreFilter = async (genre, currentPage = page) => {
        try {

            const response = await axios.get(`/song/leader_board/genre/${memberId}`, {
                params: {
                    memberId: memberId,
                    page: currentPage,
                    genre: genre,
                }
            });

            const { data } = response;
            console.log(data);

            const updatedSongList = data.songPageList.content.map(song => {
                const matchingLike = data.likeList.find(like => like.songId === song.id);

                return {
                    ...song,
                    isLiked: !!matchingLike,
                    likeId: matchingLike ? matchingLike.id : null,

                };
            });

            setSongList(updatedSongList);

            setLikeList(data.likeList);
            const { songPageList ,startPage, endPage } = data;


            console.log(songPageList.content);
            setSongPageList(songPageList);
            setStartPage(startPage);
            setEndPage(endPage);


        } catch (error) {

            console.error('Error fetching data:', error);

            setError(true);
        }

    };





    useEffect(() => {

    }, [songList]);

    function handlePageChange(page) {
        fetchData(page);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <h1 className='leaderboard-txt'>
                <HiOutlineTrophy className={'HiOutlineTrophy'} size='55'/>LEADERBOARD
            </h1>
            <div className='buttons'>
                <ul className='bt-ul'>
            {storedSession.loginName != null && (
                <button className='predict-button' onClick={Posting}><div className='btn-info'><HiTrendingUp size='15'/>노래 예측하기</div> </button>
            )}
            <button className='whole-button' onClick={() => fetchData()}>전체보기</button>
            <button className='pop-button' onClick={() => handleGenreFilter('pop')}>Pop</button>
            <button className='dance-button' onClick={() => handleGenreFilter('dance')}>Dance</button>
            <button className='ballad-button' onClick={() => handleGenreFilter('ballad')}>Ballad</button>
                </ul>
            </div>
            <div className="community-table-wrapper">
                <table className='tbl'>
                    <thead>
                    <tr>

                        <th>liked</th>
                        <th>순위</th>
                        <th>노래제목</th>
                        <th>장르</th>
                        <th>닉네임</th>
                        <th>예측결과</th>
                        <th>좋아요</th>
                        <th>재생</th> {/* 재생 버튼 추가 */}
                        <th>가사</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songList

                        .map((song, index) => (
                            <tr key={song.id}>

                                <td>
                                    <LikeButton
                                        memberId={memberId}
                                        songId={song.id}
                                        likeId={song.likeId}
                                        isLiked={song.isLiked}
                                    />
                                </td>

                                <td>{songPageList.number * songPageList.size + index + 1}</td>

                                <td>
                                    <Link to={`/hit_ai_detail?id=` + song.id} >
                                        {song.songTitle}
                                    </Link>
                                </td>
                                <td>{song.genre}</td>
                                <td>{song.memberNickName}</td>
                                <td>{song.prediction}</td>
                                {/*<td>{song.songCreatedTime.replace("T", " ")}</td>*/}
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
                                    {/* <SongPlayer songId={song.id} />{' '} */}
                                    {/* SongPlayer 컴포넌트에 songId props 전달 */}
                                </td>
                                <td>
                                    <button onClick={() => handleViewLyrics(song.id)}>
                                        가사보기
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

            <div>
                {/* First page */}
                <Link to="" onClick={() => handlePageChange(1)}>First</Link>

                {/* Previous page */}
                {songPageList.number > 0 ? (
                    <Link to={`/song/board?page=${songPageList.number}`} onClick={() => handlePageChange(songPageList.number)}>prev</Link>
                ) : (
                    <span>prev</span>
                )}

                {/* Page numbers */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <span key={page}>
              {/* Current page */}
                        {page === songPageList.number + 1 ? (
                            <span>{page}</span>
                        ) : (
                            <Link to={`/song/board?page=${page}`} onClick={() => handlePageChange(page)}>
                                {page}
                            </Link>
                        )}
            </span>
                ))}

                {/* Next page */}
                {songPageList.number + 1 < songPageList.totalPages ? (
                    <Link to={`/song/board?page=${songPageList.number + 2}` }  onClick={() => handlePageChange(songPageList.number + 2)}>next</Link>
                ) : (
                    <span>next</span>
                )}

                {/* Last page */}
                <Link to={`/song/board?page=${songPageList.totalPages}`}  onClick={() => handlePageChange(songPageList.totalPages)}>Last</Link>
            </div>
        </div>
    );
};


export default LeaderBoard;