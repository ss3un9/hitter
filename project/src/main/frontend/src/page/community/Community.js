
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Community.css"
import NavBar from "../../components/NavBar";
const Community = () => {
    const [session, setSession] = useState({});
    const [boardList, setBoardList] = useState([]);
    useEffect(() => {
        const fetchBoardList = async () => {
            const response = await fetch('/board/paging');
            if (response.ok) {
                const data = await response.json();
                setBoardList(data.boardList);
            }
        };
        fetchBoardList();
    }, []);
    const saveReq = () => {
        if (session.loginEmail != null) {
            // location.href = '/board/write';
        }
    };
    return (
        <>
                {/* <!-- Navigation--> */}
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container px-5">
                    <a class="navbar-brand" href="/">HITTABLE</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                        class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="/song/hit_ai">Hit</a></li>
                            <li class="nav-item"><a class="nav-link" href="/song/leader_board">Leader Board</a></li>
                            <li class="nav-item"><a class="nav-link" href="/board/paging">Community</a></li>
                            <li className="nav-item">
                                {session.loginEmail != null && (
                                    <a className="nav-link" href="/member/mypage"><p>{session.loginName}</p></a>
                                )}
                            </li>
                            <li className="nav-item">
                                {session.loginEmail != null ? (
                                    <a className="nav-link" href="/member/logout">로그아웃</a>
                                ) : (
                                    <a className="nav-link" href="/member/save">Sign Up</a>
                                )}
                            </li>
                            <li className="nav-item">
                                {session.loginEmail == null && (
                                    <a className="nav-link" href="/member/login">Log In</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header class="masthead text-center text-white">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h2 class="masthead-subheading mb-0">COMMUNITY</h2>
                    </div>
                </div>
            </header>
            <body class="community-body">
            <div class="community-table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>writer</th>
                        <th>date</th>
                        <th>hits</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boardList.map((board) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>
                                <Link to={`/board/${board.id}`}>{board.boardTitle}</Link>
                            </td>
                            <td>{board.boardWriter}</td>
                            <td>{board.boardCreatedTime}</td>
                            <td>{board.boardHits}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={saveReq}>글작성</button>
            </div>
            <div>
                <Link to="/board/paging?page=1">First</Link>
                <Link to={boardList.first ? '#' : '/board/paging?page=1'}>prev</Link>
                {boardList.slice().map((page) => (
                    <Link key={page} to={`/board/paging?page=${page}`}>{page}</Link>
                ))}
                <Link to={boardList.last ? '#' : '/board/paging?page=${boardList.number + 2}'}>next</Link>
                <Link to="/board/paging?page=${boardList.totalPages}">Last</Link>
            </div>

            </body>
            <NavBar></NavBar>
            <h1>hello world</h1>

            </>
            )

            }


export default Community;