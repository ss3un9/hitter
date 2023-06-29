import axios from 'axios';

import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "../community/Community.css"
const LeaderBoard =  () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const page = parseInt(searchParams.get('page')) || 1;


    const navigate = useNavigate();
    const [songList, setSongList] = useState([]);
    const [boardPageList, setBoardPageList] = useState([]);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [error, setError] = useState(false);

    const Posting = () => {
        navigate("/member/hit_ai")
    }
    const fetchData = async (currentPage = page) => {
        try {


            const response = await axios.get(`/song/leader_board`);

            const { data } = response;

            console.log(data);
            setSongList(data.songList);


            // const { boardPageList ,startPage, endPage } = data;
            //
            // setBoardList(boardPageList.content);
            // setBoardPageList(boardPageList);
            // setStartPage(startPage);
            // setEndPage(endPage);

        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);

            setError(true);
        }
    };



    // function handlePageChange(page) {
    //     fetchData(page);
    // };

    useEffect(() => {
        fetchData();
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

            {storedSession.loginName != null && (
                <button onClick={Posting}>노래 예측하기 </button>
            )}

            <div className="community-table-wrapper">
                <table>
                    <thead>
                    <tr>
                        {/*<th>좋아요</th>*/}
                        <th>id</th>
                        <th>노래제목</th>
                        <th>장르</th>
                        <th>닉네임</th>
                        <th>예측결과</th>
                        <th>시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songList.map(song => (
                        <tr key={song.id}>
                            <td>{song.id}</td>
                            <td>
                                <Link to={`/hit_ai_detail?id=` + song.id} >
                                    {song.songTitle}
                                </Link>
                            </td>
                            <td>{song.genre}</td>
                            <td>{song.memberNickName}</td>
                            <td>{song.prediction}</td>
                            <td>{song.songCreatedTime.replace("T", " ")}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


  {/*          <div>*/}
  {/*              /!* First page *!/*/}
  {/*              <Link to="" onClick={() => handlePageChange(1)}>First</Link>*/}

  {/*              /!* Previous page *!/*/}
  {/*              {boardPageList.number > 0 ? (*/}
  {/*                  <Link to={`/board/paging?page=${boardPageList.number}`} onClick={() => handlePageChange(boardPageList.number)}>prev</Link>*/}
  {/*              ) : (*/}
  {/*                  <span>prev</span>*/}
  {/*              )}*/}

  {/*              /!* Page numbers *!/*/}
  {/*              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (*/}
  {/*                  <span key={page}>*/}
  {/*  /!* Current page *!/*/}
  {/*                      {page === boardPageList.number + 1 ? (*/}
  {/*                          <span>{page}</span>*/}
  {/*                      ) : (*/}
  {/*                          <Link to={`/board/paging?page=${page}`} onClick={() => handlePageChange(page)}>*/}
  {/*                              {page}*/}
  {/*                          </Link>*/}
  {/*                      )}*/}
  {/*</span>*/}
  {/*              ))}*/}

  {/*              /!* Next page *!/*/}
  {/*              {boardPageList.number + 1 < boardPageList.totalPages ? (*/}
  {/*                  <Link to={`/board/paging?page=${boardPageList.number + 2}` }  onClick={() => handlePageChange(boardPageList.number + 2)}>next</Link>*/}
  {/*              ) : (*/}
  {/*                  <span>next</span>*/}
  {/*              )}*/}

  {/*              /!* Last page *!/*/}
  {/*              <Link to={`/board/paging?page=${boardPageList.totalPages}`}  onClick={() => handlePageChange(boardPageList.totalPages)}>Last</Link>*/}
  {/*         */}
        </>
    );
};


export default LeaderBoard;