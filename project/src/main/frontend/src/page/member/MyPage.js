import React, {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";

function Select() {
    return null;
}

const Mypage = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const id = storedSession.loginId;


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
            <nav>
                <ul>
                    <li className="nav-item">
                        <Link to={`/member/update?id=${id}`} className="nav-link">
                            회원 정보 수정하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/mySong" className="nav-link">
                            내 노래 조회하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/myBoard" className="nav-link">
                            내 게시판 조회하기
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/delete" className="nav-link">
                            회원 탈퇴하기
                        </Link>
                    </li>
                </ul>
            </nav>


        </>
    )
}


export default Mypage;