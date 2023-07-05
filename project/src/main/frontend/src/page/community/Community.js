import axios from 'axios';
import { PiChatsCircleLight } from "react-icons/pi";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Community.css"

import { HiOutlineTrophy } from "react-icons/hi2";



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
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/board/search?page=1&keyword=${searchKeyword}`);
            const { data } = response;

            // Update the boardList, boardPageList, startPage, and endPage states with the search results
            setBoardList(data.boardList);
            setBoardPageList(data.boardPageList);
            setStartPage(data.startPage);
            setEndPage(data.endPage);
        } catch (error) {
            console.error('Error fetching search data:', error);
            setError(true);
        }
    };
    const Posting = () => {
        navigate("/board/write")
    }
    const fetchData = async (currentPage = page, keyword = "") => {
        try {
            const response = await axios.get(`/board/paging?page=${currentPage}&keyword=${keyword}`);
            const { data } = response;
            console.log(response);
            const { boardPageList, startPage, endPage } = data;
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
        fetchData(1, searchKeyword); // Call fetchData with page 1 and the search keyword
    }, [page, searchKeyword]);



    function handlePageChange(page) {
        fetchData(page);
    };



    return (
        <div className='cm-container'>
            <h1 className='cm-txt'>
                <PiChatsCircleLight className={'PiChatsCircleLight'} size='55' />COMMUNITY
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
                        <Link to={`/board/paging?page=${boardPageList.number + 2}`} onClick={() => handlePageChange(boardPageList.number + 2)}><div className='rjrthl'>{'>'}</div> </Link>
                    ) : (
                        <span className='rjrthl'>{'>'}</span>
                    )}

                    {/* Last page */}
                    <Link to={`/board/paging?page=${boardPageList.totalPages}`} onClick={() => handlePageChange(boardPageList.totalPages)}><div className='rjrthl'>{'>>'}</div></Link>
                </div>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

        </div>
    );
};


export default Community;