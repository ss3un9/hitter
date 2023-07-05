import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import LikeButton from './LikeButton';
import LyricsModal from './LyricsModal.js';
import './LeaderBoard.css';
import PlayerModal from '../../component/PlayerModal.js';
import {HiOutlineTrophy} from "react-icons/hi2";
import {HiTrendingUp} from "react-icons/hi"
import {BsPlayCircleFill} from "react-icons/bs";
import {MdOutlineLyrics} from "react-icons/md";
import {PiCrownSimpleBold} from "react-icons/pi";

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

        try {
            const response = await axios.get(`/song/txt/${songId}`);
            const {data} = response;

            setLyrics(data);
            setShowLyricsModal(true);

        } catch (error) {
            alert("가사를 불러오는데 실패했습니다. 다시 시도해주세요. ");
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

            const {data} = response;

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
            const {songPageList, startPage, endPage} = data;

            setSongList(updatedSongList);

            setSongPageList(songPageList);
            setStartPage(startPage);
            setEndPage(endPage);

            navigate(`/song/board?page=${page}`);

        } catch (error) {

            alert("목록을 불러오는데 실패했습니다. ");

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

            const {data} = response;

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
            const {songPageList, startPage, endPage} = data;

            setSongPageList(songPageList);
            setStartPage(startPage);
            setEndPage(endPage);


        } catch (error) {

            alert("목록을 불러오는데 실패했습니다. ");

            setError(true);
        }

    };


    useEffect(() => {

    }, [songList]);

    const handlePageChange = async (page) => {
        try {
            await fetchData(page);
        } catch (error) {
            alert('페이지를 불러오는데 실패했습니다.');
        }
    };

    useEffect(() => {
        const fetchDataAndHandleErrors = async () => {
            try {
                await fetchData();
            } catch (error) {
                alert('데이터를 불러오는데 실패했습니다.');

            }
        };

        fetchDataAndHandleErrors().catch((error) => {
            alert('데이터를 불러오는데 실패했습니다.');
        });
    }, []);

    return (
        <div className='lead-container'>
            <h1 className='leaderboard-txt'>
                <HiOutlineTrophy className={'HiOutlineTrophy'} size='55'/>LEADERBOARD
            </h1>
            <div className='buttons'>
                <ul className='bt-ul'>
                    {storedSession.loginName != null && (
                        <button className='predict-button' onClick={Posting}>
                            <div className='btn-info'><HiTrendingUp size='18'/>노래 예측하기</div>
                        </button>
                    )}
                    <button className='whole-button' onClick={() => fetchData()}>전체보기</button>
                    <br></br><br></br>
                    <div className='btns-group'>
                        <button className='pop-button' onClick={() => handleGenreFilter('pop')}>Pop</button>
                        <button className='dance-button' onClick={() => handleGenreFilter('dance')}>Dance</button>
                        <button className='ballad-button' onClick={() => handleGenreFilter('ballad')}>Ballad</button>
                    </div>
                </ul>
            </div>
            <div className="board-table-wrapper">
                <table className='leader-tbl'>
                    <thead className='tbl-head'>
                    <tr className='lead-trs'>

                        <th className='lead-ths'>순위</th>
                        <th className='lead-ths-title'>노래제목</th>
                        <th className='lead-ths'>장르</th>
                        <th className='lead-ths'>닉네임</th>
                        <th className='lead-ths'>예측결과</th>
                        <th className='lead-ths'>좋아요</th>
                        <th className='lead-ths'>재생</th>
                        {/* 재생 버튼 추가 */}
                        <th className='lead-ths'>가사</th>
                        <th className='lead-ths'>liked</th>

                    </tr>
                    </thead>
                    <tbody>
                    {songList
                        .map((song, index) => (

                            <tr key={song.id}>


                                {songPageList.number * songPageList.size + index + 1 < 4 ?
                                    <td className='tds-winner'>
                                        <PiCrownSimpleBold size='30'/>{songPageList.number * songPageList.size + index + 1} </td>
                                    :
                                    <td className='tds-nams'>
                                        {songPageList.number * songPageList.size + index + 1} </td>
                                }

                                <td className='title-tds'>
                                    <Link to={`/hit_ai_detail?id=` + song.id} style={{textDecoration: "none"}}>
                                        <div className='song-title'> {song.songTitle} </div>
                                    </Link>
                                </td>
                                <td className='lead-tds'>{song.genre}</td>
                                <td className='lead-tds'>{song.memberNickName}</td>
                                <td className='lead-tds'>{song.prediction}</td>
                                <td className='lead-tds'>{song.songLike}</td>
                                <td>

                                    <div
                                        className="play-button"
                                        onClick={() => handleOpenPlayer(song.id)}
                                    >
                                        <BsPlayCircleFill className='BsPlayCircleFill' size='20'/>

                                    </div>
                                </td>
                                <td className='lead-tds'>
                                    <button className='lr-btn' onClick={() => handleViewLyrics(song.id)}>
                                        <MdOutlineLyrics className='MdOutlineLyrics' size={'20'}/>
                                    </button>
                                </td>
                                <td className='lead-tds'>
                                    <LikeButton
                                        memberId={memberId}
                                        songId={song.id}
                                        likeId={song.likeId}
                                        isLiked={song.isLiked}
                                    />
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

            <div className='paging'>
                {/* First page */}
                <Link to="" onClick={() => handlePageChange(1)}>
                    <div className='fir-page'>{'<<'}</div>
                </Link>

                {/* Previous page */}
                {songPageList.number > 0 ? (
                    <Link to={`/song/board?page=${songPageList.number}`}
                          onClick={() => handlePageChange(songPageList.number)}><div className='prev'> {'<'}</div></Link>
                ) : (
                    <span className='prev'>{'<'}</span>
                )}

                {/* Page numbers */}
                {Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i).map((page) => (
                    <span className='cur-page' key={page}>
              {/* Current page */}
                        {page === songPageList.number + 1 ? (
                            <span>{page}</span>
                        ) : (
                            <Link to={`/song/board?page=${page}`} onClick={() => handlePageChange(page)}>
                                <div className='pages'> {page} </div>
                            </Link>
                        )}
            </span>
                ))}

                {/* Next page */}
                {songPageList.number + 1 < songPageList.totalPages ? (
                    <Link to={`/song/board?page=${songPageList.number + 2}`}
                          onClick={() => handlePageChange(songPageList.number + 2)}><div className='nxt-pg'> {'>'}</div></Link>
                ) : (
                    <span className='nxt-pg'>{'>'}</span>
                )}

                {/* Last page */}
                <Link to={`/song/board?page=${songPageList.totalPages}`}
                      onClick={() => handlePageChange(songPageList.totalPages)}>
                    <div className='last-pg'>{'>>'}</div>
                </Link>
            </div>
        </div>
    );
};


export default LeaderBoard;