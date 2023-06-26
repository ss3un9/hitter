import axios from 'axios';

import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Write.css"
const Write =  () => {
    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const [postResponse, setPostResponse] = useState(null);
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
            navigate(`/board/detail?id=${postResponse.id}`, {
                state: {
                    postResponse: postResponse.id
                }
            });
        }
    }, [postResponse, navigate]);
    return (
        <>
            {/* <!-- Navigation--> */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">HITTABLE</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/member/hit_ai">Hit</a></li>
                            <li className="nav-item"><a className="nav-link" href="/member/leader_board">Leader Board</a></li>
                            <li className="nav-item"><a className="nav-link" href="/board/paging">Community</a></li>
                            <li className="nav-item">
                                {storedSession.loginName != null && (
                                    <a className="nav-link" href="/member/mypage"><p>{storedSession.loginName}</p></a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName != null ? (
                                    <a className="nav-link" href="/member/logout">로그아웃</a>
                                ) : (
                                    <a className="nav-link" href="/member/save">Sign Up</a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName == null && (
                                    <a className="nav-link" href="/member/login">Log In</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

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