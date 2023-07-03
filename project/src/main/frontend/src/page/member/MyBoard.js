import React, {useEffect, useState} from "react";
import "./MyBoard.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";

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
            console.error('Error fetching data:', error);

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
            (
            <div className='bar-tbl'>
                <MypageBar/>
                <div className='table'>
                    <table className='table'>
                        {myBoardList.length === 0 ? (
                            <tbody className='tb-top-body'>
                            <tr className='tr-info'>
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
                </div>
            </div>

        </>
    )
}


export default MyBoard;