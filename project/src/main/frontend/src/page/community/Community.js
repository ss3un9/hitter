import axios from 'axios';

import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Community.css"
const Community =  () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const [postResponse, setPostResponse] = useState(null);

    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [boardPageList, setBoardPageList] = useState([]);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [error, setError] = useState(false);

    const [page, setPage] = useState(1); // 페이지 정보 상태 추가
    const Posting = () => {
        navigate("/board/write")
    }
    const fetchData = async (page = 1) => {
            try {


                const response = await axios.get('/board/paging?page='+page);

                const { data } = response;
                const { boardPageList ,startPage, endPage } = data;



                setBoardList(boardPageList.content);
                setBoardPageList(boardPageList);
                setStartPage(startPage);
                setEndPage(endPage);

            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);

                setError(true);
            }
        };

        useEffect(() => {
            fetchData();
        }, []);


    const handlePageChange = (page) => {
        fetchData(page);
    };

    const handlePostResponse = (boardId) => {

        if (boardId) {
            navigate(`/board/detail?id=${boardId}`, {
                state: {
                    postResponse: boardId,
                    page: page
                }
            });
        }
    };

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

            {storedSession.loginName != null && (
                <button onClick={Posting}>글작성</button>
            )}

            <div className="community-table-wrapper">
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
                    {boardList.map(board => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>
                                <Link to={`/board/detail/?id=` + board.id} onClick={() => handlePostResponse(board.id)}>
                                    {board.boardTitle}
                                </Link>
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
                {/* First page */}
                <Link to="/board/paging?page=1" onClick={() => handlePageChange(1)}>First</Link>

                {/* Previous page */}
                {boardPageList.number > 0 ? (
                    <Link to={`/board/paging?page=${boardPageList.number}`} onClick={() => handlePageChange(boardPageList.number)}>prev</Link>
                ) : (
                    <span>prev</span>
                )}

                {/* Page numbers */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <span key={page}>
    {/* Current page */}
                        {page === boardPageList.number + 1 ? (
                            <span>{page}</span>
                        ) : (
                            <Link to={`/board/paging?page=${page}`} onClick={() => handlePageChange(page)}>
                                {page}
                            </Link>
                        )}
  </span>
                ))}

                {/* Next page */}
                {boardPageList.number + 1 < boardPageList.totalPages ? (
                    <Link to={`/board/paging?page=${boardPageList.number + 2}` }  onClick={() => handlePageChange(boardPageList.number + 2)}>next</Link>
                ) : (
                    <span>next</span>
                )}

                {/* Last page */}
                <Link to={`/board/paging?page=${boardPageList.totalPages}`}  onClick={() => handlePageChange(boardPageList.totalPages)}>Last</Link>
            </div>
        </>
    );
};


export default Community;