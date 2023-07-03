import axios from 'axios';

import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./mainLb.css"
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
        navigate("/hit")
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