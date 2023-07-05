import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import "../community/Write.css"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';

const BoardUpdate = () => {

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    const navigate = useNavigate();
    const location = useLocation();

    let id;
    let page;
    console.log(location);

    if (location.state && location.state.postResponse) {
        id = parseInt(location.state.postResponse);
        page = parseInt(location.state.page)
    } else {
        const searchParams = new URLSearchParams(location.search);

        id = parseInt(searchParams.get('id'));
        page = parseInt(searchParams.get('page'));
    }
    const [boardId, setBoardId] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardWrite, setBoardWrite] = useState('');
    const [boardWriteId, setBoardWriteId] = useState('');
    const [boardContents, setBoardContents] = useState('');
    const [boardCreatedTIme, setBoardCreatedTime] = useState('');

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/board/PostUpdate/' + id);
                const {data} = response;
                console.log(data)
                if (response.status === 200) {

                    const board_id = data.boardUpdate.id;
                    setBoardId(board_id);

                    const board_title = data.boardUpdate.boardTitle;
                    setBoardTitle(board_title);

                    const board_writer = data.boardUpdate.boardWriter;
                    setBoardWrite(board_writer);

                    const board_writerId = data.boardUpdate.boardWriterId;
                    setBoardWriteId(board_writerId);

                    const board_contents = data.boardUpdate.boardContents;
                    setBoardContents(board_contents);

                    const board_created = data.boardUpdate.boardCreatedTime;
                    setBoardCreatedTime(board_created);
                } else {
                    throw new Error('네트워크 오류. 다시시도해주세요');
                }
            } catch (error) {
                alert('게시글 정보를 불러오는데 실패하였습니다');
            }
        };

        fetchData().catch((error) => {
            alert('게시글 정보를 불러오는데 실패하였습니다');
        });
    }, []);

    const [repostResponse, setRepostResponse] = useState(null);

    const PostUpdate = async (event) => {
        event.preventDefault();


        try {
            const formData = new FormData(event.target);
            formData.set('boardContents', stripPTags(boardContents));
            const response = await axios.post('/board/PostUpdate', formData, {responseType: "json"});
            if (response.status === 200) {
                setRepostResponse(response.data.post);
                alert("게시글이 성공적으로 수정되었습니다");
                navigate(`/board/detail?id=${id}&page=${page}`);


            } else {
                alert('게시글 정보가 없습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('게시글 수정에 실패하였습니다');
        }
    };
    const stripPTags = (content) => {

        return content.replace(/<p>/g, '').replace(/<\/p>/g, ''); // Use a regular expression to remove <p> and </p> tags
      };

    return (
        <>

            <div>
                <form method="post" encType="multipart/form-data" onSubmit={PostUpdate}>
                    <label>
                        title: <input type="text" name="boardTitle" value={boardTitle}
                                      onChange={(e) => setBoardTitle(e.target.value)}/>
                    </label>
                    <input type="hidden" name="Id" value={boardId}/>
                    <input type="hidden" name="boardWriterId" value={boardWriteId}/>
                    <input type="hidden" name="boardWriter" value={boardWrite}/>
                    <label>
                        contents: <CKEditor
                        editor={ClassicEditor}
                        data={boardContents}
                        onChange={(event, editor) => setBoardContents(editor.getData())}
                    />
                    </label>
                    <label>
                        file: <input type="file" name="boardFile"/>
                    </label>
                    <button>수정</button>
                </form>

            </div>
            <button onClick={() => reqList()}>목록</button>
            <button onClick={() => deleteList(id)}>삭제</button>
        </>
    )
}


export default BoardUpdate;