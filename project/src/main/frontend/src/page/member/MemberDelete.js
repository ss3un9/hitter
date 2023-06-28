import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
function Select() {
    return null;
}

const MemberDelete = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const id = storedSession.loginId;

    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        if (confirmed) {
            try {
                const formData = new FormData(event.target);
                const response = await axios.get(`/member/delete/${id}`, formData, {
                    responseType: "json",
                });
                console.log(response);
                if (response.status === 200) {

                    alert("탈퇴되었습니다 ");
                    navigate("/member/logout")


                } else {
                    console.error('오류가 발생했습니다. 다시 시도해주세요 ');
                }
            } catch (error) {
                console.error("탈퇴 실패.", error);
            }
        }
    };

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

            <form onSubmit={handleSubmitDelete}>
                <span> 회원 탈퇴 신청 </span> <br />
                유의사항 1. 회원탈퇴하면 곡이 전부 삭제됨 <br/>
                2. 게시글 삭제됨  <br/>
                3. 123123123123  <br/>
                <button type="submit">탈퇴</button>
            </form>

        </>
    );
};


export default MemberDelete;