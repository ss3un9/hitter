import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../community/Write.css"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Write = () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const [editorData, setEditorData] = useState('');


    const [postResponse, setPostResponse] = useState(null);
    const page = 1;
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const sanitizedData = editorData.replace(/<p>/g, '').replace(/<\/p>/g, '');


        try {
            const formData = new FormData(event.target);
            formData.append('boardContents', sanitizedData);

            const response = await axios.post('/board/post', formData, { responseType: "json" });

            if (response.status === 200) {
                setPostResponse(response.data.post);
                alert("게시글이 성공적으로 등록되었습니다");


            } else {
                console.error('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        } catch (error) {
            console.error('게시글을 등록하지 못했습니다.');
        }
    };
    useEffect(() => {
        if (postResponse && postResponse.id) {
            navigate(`/board/detail?id=${postResponse.id}&page=${page}`, {
                state: {
                    postResponse: postResponse.id,
                    page: page
                }
            });
        }
    }, [postResponse, navigate]);
    return (
        <>
        <div className="write-page"></div>
            <div className="write-container">
                <form onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="boardTitle">Title:</label>
                        <input type="text" name="boardTitle" id="boardTitle" className="form-control" />
                    </div>
                    <input type="hidden" name="boardWriterId" value={storedSession.loginId} />
                    <input type="hidden" name="boardWriter" value={storedSession.loginNickName} />
                    <div className="form-group">
                        <label>Contents:</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorData}
                            onChange={handleEditorChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="boardFile">File:</label>
                        <input type="file" name="boardFile" id="boardFile" className="form-control" />
                    </div>
                    <button className="btn btn-list write-button">글작성</button>
                </form>
            </div>
    

        </>
    );
};


export default Write;