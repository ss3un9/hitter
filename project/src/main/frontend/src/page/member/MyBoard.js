import React, {useEffect, useState} from "react";
import "./MyBoard.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";

const MyBoard = () => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const id = Number(storedSession.loginId);


    const [myBoardList, setMyBoardList] = useState([]);


    const fetchData = async () => {
        try {

            const response = await axios.get(`/board/MyPosts/${id}`);
            const {data} = response;
            setMyBoardList(data.boardList);


        } catch (error) {

            alert('내 글 목록을 불러오지 못했습니다. 다시 시도해 주세요.');

        }
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await fetchData();
            } catch (error) {
            }
        };
        fetchDataAsync().then(() => {
        }).catch((error) => {
        });
    }, []);

    const handleBoardClick = (id) => {
        navigate(`/board/detail?id=${id}`);
    }

    function UpdateList(id) {
        navigate(`/board/update?id=${id}&page=${1}`);
    }

    function deleteList(id) {
        try {
            const confirmDelete = window.confirm('게시글을 정말 삭제하시겠습니까?');

            if (confirmDelete) {
                navigate(`/board/delete?id=` + id, {state: {id: id}});
            }
        }catch {

            alert('삭제할 게시글을 선택해주세요. ');
        }

    }

    return (
        <>
            (
            <div className='myboardWrap'>
                <MypageBar/>
                <div className='Btable'>
                    <table className='myBtable'>
                        {myBoardList.length === 0 ? (
                            <tbody className='tb-top-body'>
                            <tr className='tr-info'>
                                <td className='nono' colSpan="5">
                                    작성된 글이 없습니다.{" "}
                                    <Link to="/board/write">새글 쓰러가기</Link>
                                </td>
                            </tr>
                            </tbody>
                        ) : (
                            <>
                                <thead>
                                <tr>
                                    <th className='mlth'>ID</th>
                                    <th className='mlth-title'>제목</th>
                                    <th className='mlth'>작성자</th>
                                    <th className='mlth'>올린시각</th>
                                    <th className='mlth'>동작</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myBoardList.map((board) => (
                                    <tr key={board.id}>
                                        <td className='mltd'>{board.id}</td>
                                        <td className='mltd' onClick={() => handleBoardClick(board.id)}>
                                            {board.boardTitle}
                                        </td>
                                        <td className='mltd'>{board.boardWriter}</td>
                                        <td className='mltd'>{board.boardCreatedTime.replace("T", " ")}</td>
                                        <td className='mltd'>
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