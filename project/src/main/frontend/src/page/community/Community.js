import axios from 'axios';
import {PiChatsCircleLight} from "react-icons/pi";

import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import "./Community.css"

const Community =  () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const page = parseInt(searchParams.get('page')) || 1;


    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [boardPageList, setBoardPageList] = useState([]);
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [error, setError] = useState(false);

    const Posting = () => {
        navigate("/board/write")
    }
    const fetchData = async (currentPage = page) => {
            try {


                const response = await axios.get('/board/paging?page='+currentPage);

                const { data } = response;

                console.log(response);
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


    function handlePageChange(page) {
        fetchData(page);
    };

    useEffect(() => {
        fetchData();
    }, [page]);



    return (
        <div className='cm-container'>
            <h1 className='cm-txt'>
                <PiChatsCircleLight className={'PiChatsCircleLight'} size='55'/>COMMUNITY
            </h1>

            <div className="community-table-wrapper">
                <table className='cmtbl'>
                    <thead className='cmtbl-head'>
                    <tr className='trs'>
                        <th className='cmths'>id</th>
                        <th className='cmths'>title</th>
                        <th className='cmths'>writer</th>
                        <th className='cmths'>date</th>
                        <th className='cmths'>hits</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boardList.map(board => (
                        <tr key={board.id}>
                            <td className='idtd'>{board.id}</td>
                            <td>
                                <Link to={`/board/detail?id=` + board.id + `&page=` + page} >
                                    <div className='board-title'>{board.boardTitle}</div>
                                </Link>
                            </td>
                            <td className='cmtds'>{board.boardWriter}</td>
                            <td className='cmtds'>{board.boardCreatedTime.replace('T', ' ')}</td>
                            <td className='cmtds'>{board.boardHits}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className='cm-paging'>
            {storedSession.loginName != null && (
                <button className='write-ar-btn' onClick={Posting}>글작성</button>
            )}
            <div>
                {/* First page */}
                <Link to="" onClick={() => handlePageChange(1)}><div className='rjrthl'>{'<<'}</div></Link>

                {/* Previous page */}
                {boardPageList.number > 0 ? (
                    <Link to={`/board/paging?page=${boardPageList.number}`} onClick={() => handlePageChange(boardPageList.number)}><div className='rjrthl'>{'<'}</div> </Link>
                ) : (
                    <span className='rjrthl'>{'<'}</span>
                )}

                {/* Page numbers */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                    <span className='rjrthl' key={page}>
    {/* Current page */}
                        {page === boardPageList.number + 1 ? (
                            <span className='rjrthl'>{page}</span>
                        ) : (
                            <Link to={`/board/paging?page=${page}`} onClick={() => handlePageChange(page)}>
                                <div className='rjrthl'> {page} </div>
                            </Link>
                        )}
  </span>
                ))}

                {/* Next page */}
                {boardPageList.number + 1 < boardPageList.totalPages ? (
                    <Link to={`/board/paging?page=${boardPageList.number + 2}` }  onClick={() => handlePageChange(boardPageList.number + 2)}><div className='rjrthl'>{'>'}</div> </Link>
                ) : (
                    <span className='rjrthl'>{'>'}</span>
                )}

                {/* Last page */}
                <Link to={`/board/paging?page=${boardPageList.totalPages}`}  onClick={() => handlePageChange(boardPageList.totalPages)}><div className='rjrthl'>{'>>'}</div></Link>
            </div>
            </div>
        </div>
    );
};


export default Community;