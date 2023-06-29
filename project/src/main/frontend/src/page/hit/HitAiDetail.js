
import {useLocation, useNavigate} from 'react-router-dom';
import './HitAi.css'
import React, {useEffect, useState} from "react";
import axios from "axios";

const HitAiDetail = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const location = useLocation();

    let id;
    const searchParams = new URLSearchParams(location.search);

    id = parseInt(searchParams.get('id'));


    const [songTitle, setSongTitle] = useState('');
    const [songGenre, setSongGenre] = useState('');
    const [nickName, setNickName] = useState('');
    const [songPrediction, setSongPrediction] = useState('');
    const [songCreatedTIme, setSongCreatedTime] = useState('');

    function reqList() {
        // navigate(`/board/paging?page=${page}`, { state: { page: page } });
        navigate(`/song/board`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/song/detail/${id}`);
                const { data } = response;
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


                } else {
                    alert('게시글 정보를 불러오는데 실패하였습니다');
                }
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        };

        fetchData().catch((error) => {
            console.error('Error during fetch:', error);
        });
    }, []);



    return (
        <>
            {/* <!-- Navigation--> */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">HITTABLE</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/member/hit_ai">Hit</a></li>
                            <li className="nav-item"><a className="nav-link" href="/member/leader_board">Leader Board</a></li>
                            <li className="nav-item"><a className="nav-link" href="/board/paging">Community</a></li>
                            <li className="nav-item">
                                {storedSession.loginName != null && (
                                    <a className="nav-link" href="/member/mypage"><p>{storedSession.loginName}</p></a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName != null ? (
                                    <a className="nav-link" href="/member/logout">로그아웃</a>
                                ) : (
                                    <a className="nav-link" href="/member/save">Sign Up</a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName == null && (
                                    <a className="nav-link" href="/member/login">Log In</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div>
                <p>닉네임: {nickName}</p>
                <p>Title:{songTitle}</p>
                <p>Prediction: {songPrediction}</p>
                <p>CreatedTime: {songCreatedTIme}</p>
                <p>genre: {songGenre}</p>

            </div>
            <button onClick={() => reqList()}>목록</button>
        </>
    )
}


export default HitAiDetail;