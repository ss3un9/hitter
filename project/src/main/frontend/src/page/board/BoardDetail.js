import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./BoardDetail.css"

const BoardDetail = () => {

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const [session, setSession] = useState({});

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('session')) || {};

        if (storedSession && storedSession.loginName) {
            setSession(storedSession);
        }
    }, []);

    const memberId = storedSession.loginId;

    const navigate = useNavigate();
    const location = useLocation();

    let id;
    let page;

    if (location.state && location.state.postResponse) {
        id = parseInt(location.state.postResponse);
        page = parseInt(location.state.page)
    } else {
        const searchParams = new URLSearchParams(location.search);

        id = parseInt(searchParams.get('id'));
        page = parseInt(searchParams.get('page'));
    }

    console.log(page);
    if (!page) {
        page = 1; // 페이지 값이 없을 경우 1( 내 게시판에서 들어왔을때임)
    }
    const [boardTitle, setBoardTitle] = useState('');
    const [boardWrite, setBoardWrite] = useState('');
    const [boardHits, setBoardHits] = useState('');
    const [boardContents, setBoardContents] = useState('');
    const [boardCreatedTIme, setBoardCreatedTime] = useState('');
    const [comments, setComments] = useState([]);

    //
    function reqList() {
        navigate(`/board/paging?page=${page}`, {state: {page: page}});
    }

    function deleteList(id) {
        const confirmDelete = window.confirm('게시글을 정말 삭제하시겠습니까?');

        if (confirmDelete) {
            navigate(`/board/delete?id=` + id, {state: {id: id}});
        }
    }

    function UpdateList() {
        navigate(`/board/update?id=` + id + `&page=` + page, {state: {id: id}, page: {page}});
    }

    const commentWrite = async () => {
        const writerId = document.getElementById("commentWriterId").value;
        const writerNickName = document.getElementById("commentNickName").value;
        const contents = document.getElementById("commentContents").value;
        const board_id = id;

        try {

            const response = await axios.post(`/comment/save`, {
                commentWriterId: writerId,
                commentNickName: writerNickName,
                commentContents: contents,
                boardId: id,
            });
            if (response.status === 200) {
                window.location.reload();

            } else {
                alert('게시글 정보가 없습니다.');
            }


        } catch (e) {
            alert('댓글 작성에 실패하였습니다');
        }


    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/board/detail/' + id);
                const {data} = response;
                if (response.status === 200) {
                    const board_title = data.board.boardTitle;
                    setBoardTitle(board_title);

                    const board_writer = data.board.boardWriter;
                    setBoardWrite(board_writer);

                    const board_hits = data.board.boardHits;
                    setBoardHits(board_hits);

                    const board_contents = data.board.boardContents;
                    setBoardContents(board_contents);

                    const board_created = data.board.boardCreatedTime;
                    setBoardCreatedTime(board_created);

                    const commentDTOList = data.commentList;
                    setComments(commentDTOList);

                } else {
                    alert('게시글 정보를 불러오는데 실패하였습니다');
                }
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        };

        fetchData().catch((error) => {
            alert('오류가 발생했습니다. 다시 시도해주세요 ');
        });
    }, []);


    const deleteComment = async (commentId) => {
        const confirmDelete = window.confirm('댓글을 정말 삭제하시겠습니까?');

        if (confirmDelete) {
            try {
                await axios.delete(`/comment/delete/${commentId}`);
                alert("성공적으로 삭제 되었습니다.")
                window.location.reload();
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    }

    const updateComment = (commentId) => {
        setEditingCommentId(commentId);
        const comment = comments.find((comment) => comment.id === commentId);
        setEditedComment(comment.commentContents);
    };
    const saveEditedComment = async (commentId) => {
        try {

            const response = await axios.put(`/comment/update/${commentId}`, {
                commentContents: editedComment,
                commentWriterId: storedSession.loginId,
                commentNickName: storedSession.loginNickName,
                boardId: id,
            });
            alert("댓글이 성공적으로 수정되었습니다.");
            window.location.reload();
        } catch (error) {
            alert("댓글 수정 실패. 다시 시도해주세요");
        }
    };

    return (
        <div className='detail-wrapper'>

            <div className='board-detail-all'>
                <div className='for-contents'>
                <div className='board-tops'>
                    <p className='board-title' style={{color:'black', fontSize: 25}}>{boardTitle}</p>
                    <p className='board-writer'> 작성자: {boardWrite}</p>
                    <p className='board-create'> {boardCreatedTIme.replace('T', ' ')}  조회수: {boardHits}</p>

                </div>
                <div className='real-content'>
                    <p style={{fontFamily:"Suit", fontSize: 20}}>{boardContents}</p>

                </div>
            <div className='btns-board'>
                <button className='btns-for-content' onClick={() => reqList()}>목록</button>

                <button className='btns-for-content' onClick={() => UpdateList()}>수정</button>
                <button className='btns-for-content' onClick={() => deleteList(id)}>삭제</button>
            </div>
                </div>
                <div className='for-comment'>
            <div className='comment-box'>
                <input type="hidden" id="commentNickName" value={storedSession.loginNickName}/>
                <input type="hidden" id="commentWriterId" value={storedSession.loginId}/>
                <div className='numcos'>
                    <p className='coms-txt'>댓글</p>
                <input className='txt-put-box' type="text" id="commentContents" placeholder="댓글을 남겨주세요."/>
                <div className='tmp-blank'></div>
                <button className='cm-wr-box' id="comment-write-btn" onClick={() => commentWrite()}>댓글작성</button>
            </div>
            </div>

            <div className='comm-list' id="commentList">
                    {comments && comments.map((comment) => (
                        <tr key={comment.id}>
                            <ul className='content-comment'>{comment.commentNickName}  </ul>
                            <li className='cm-content-real'>
                                {editingCommentId === comment.id ? (
                                    <textarea
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                        style={{
                                            width: "100%",
                                            height: "18px",
                                            fontFamily: "Suit"
                                        }} // Adjust the size as per your requirements
                                    />
                                ) : (
                                    comment.commentContents
                                )}
                            </li>
                            <p className='comment-cr-t'>{comment.commentCreatedTime.replace('T', ' ')}</p>
                            <p className='edit-btn'>
                                {storedSession.loginId === comment.commentWriterId && (
                                    <>
                                        {editingCommentId === comment.id ? (
                                            <button className='btn-writers' onClick={() => saveEditedComment(comment.id)}>
                                                저장
                                            </button>
                                        ) : (
                                            <button className='btn-writers' onClick={() => updateComment(comment.id)}>수정</button>
                                        )}
                                    </>
                                )}
                            </p>
                            <p className='edit-btn'>
                                {storedSession.loginId === comment.commentWriterId && (
                                    <button className='btn-writers' onClick={() => deleteComment(comment.id)}>삭제</button>
                                )}
                            </p>
                        </tr>
                    ))}
            </div>
            </div>
            </div>
        </div>
    )
}


export default BoardDetail;