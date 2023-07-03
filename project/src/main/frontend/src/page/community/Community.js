import axios from 'axios';

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
        <>

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
                                <Link to={`/board/detail?id=` + board.id + `&page=` + page} >
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
                <Link to="" onClick={() => handlePageChange(1)}>First</Link>

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