import React, {useEffect, useState} from "react";
import "./MyPage.css"
import {Link, useNavigate} from "react-router-dom";
import {BsPencilSquare} from "react-icons/bs";
import {Button, Container} from "react-bootstrap";
import {GiMusicalNotes} from "react-icons/gi";
import photo from "../../imgs/profile.png";
import {FaChalkboardUser} from "react-icons/fa6";
import {FaRegFaceSadTear} from "react-icons/fa6"
import MyBar from "../../component/MypageBar"
function Select() {
    return null;
}

const Mypage = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const id = storedSession.loginId;


    return (
        <div className='main'>
            <MyBar/>
            <div className='mpg-txt'>
                안녕하세요! 이곳은 마이페이지 입니다.
                <br></br>
                이동하기 원하는 메뉴틀 클릭하세요.
            </div>
        </div>


    )
}
export default Mypage;

            /*<nav>
                <ul>
                    <li className="nav-item">
                        <Link to={`/member/update?id=${id}`} className="nav-link">
                            <Button className='info-corr-button'>
                                <div className='info-corr'>
                                    <BsPencilSquare className= "BsPencilSquare" size="20"/>
                                    회원 정보 수정하기
                                </div>

                            </Button>

                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/member/mySong" className="nav-link">
                            <Button className='song-info-button'>
                                <GiMusicalNotes className="GiMusicalNotes" size="20"/>
                                내 노래 조회하기
                            </Button>
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

    )
}


export default Mypage;

/*
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
 */