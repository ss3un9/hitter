import axios from 'axios';

import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../community/Write.css"
const Write =  () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const [postResponse, setPostResponse] = useState(null);
    const page = 1;
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            const response = await axios.post('/board/post', formData, { responseType: "json" });

            if(response.status === 200) {
                setPostResponse(response.data.post);
                alert("게시글이 성공적으로 등록되었습니다");


            }else{
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

            <div>
                <form onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
                    <label>
                        title: <input type="text" name="boardTitle" />
                    </label>
                    <input type="hidden" name="boardWriterId" value={storedSession.loginId} />
                    <input type="hidden" name="boardWriter" value={storedSession.loginNickName } />
                    <label>
                        contents: <textarea name="boardContents" cols="30" rows="10" />
                    </label>
                    <label>
                        file: <input type="file" name="boardFile" />
                    </label>
                    <button className="btn-list">글작성</button>
                </form>

            </div>
        </>

    )
}


export default Write;