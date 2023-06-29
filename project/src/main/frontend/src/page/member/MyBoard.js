import React, {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const MyBoard = ()  => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const id = Number(storedSession.loginId);



    const [myBoardList, setMyBoardList] = useState([]);


    const fetchData = async () => {
        try {


            const response = await axios.get(`/board/MyPosts/${id}`);
            console.log(response);
            const {data} = response;
            console.log(data.boardList);
            setMyBoardList(data.boardList);



        } catch (error) {
            // Handle errors
            alert("로그인 세션이 만료되었습니다. 다시 로그인")
            navigate("/member/login")

        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleBoardClick = (id) => {
        navigate(`/board/detail?id=${id}`);
    }

    function UpdateList(id) {
            navigate(`/board/update?id=${id}&page=${1}`);
        }

        function deleteList(id) {
            const confirmDelete = window.confirm('게시글을 정말 삭제하시겠습니까?');

            if (confirmDelete) {
                navigate(`/board/delete?id=` + id, {state: {id: id}});
            }
        }

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

            <nav>
                <ul>
                    <li className="nav-item">
                        <Link to={`/member/update?id=${id}`} className="nav-link">
                            회원 정보 수정하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/mySong" className="nav-link">
                            내 노래 조회하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/myBoard" className="nav-link">
                            내 게시판 조회하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/delete" className="nav-link">
                            회원 탈퇴하기
                        </Link>
                    </li>
                </ul>
            </nav>

            (
            <table>

                {myBoardList.length === 0 ? (
                    <tbody>
                    <tr>
                        <td colSpan="5">
                            작성된 글이 없습니다.{" "}
                            <Link to="/board/write">새글 쓰러가기</Link>
                        </td>
                    </tr>
                    </tbody>
                ) : (
                    <>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>올린시각</th>
                            <th>동작</th>
                        </tr>
                        </thead>
                        <tbody>
                        {myBoardList.map((board) => (
                            <tr key={board.id}>
                                <td>{board.id}</td>
                                <td onClick={() => handleBoardClick(board.id)}>
                                    {board.boardTitle}
                                </td>
                                <td>{board.boardWriter}</td>
                                <td>{board.boardCreatedTime.replace("T", " ")}</td>
                                <td>
                                    <button onClick={() => UpdateList(board.id)}>수정</button>
                                    <button onClick={() => deleteList(board.id)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </>
                )}

            </table>
        </>
    )
}


export default MyBoard;