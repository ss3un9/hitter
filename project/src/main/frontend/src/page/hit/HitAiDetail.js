import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import './HitAi.css'

const HitAiDetail = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    const location = useLocation();
    const UserNickName = location.state.UserNickName;
    const Title = location.state.Title;
    const Prediction = location.state.Prediction;
    console.log(UserNickName);
    console.log(Title);
    console.log( Prediction);

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
                <p>Member ID: {UserNickName}</p>
                <p>Prediction: {Title}</p>
                <p>Title: {Prediction}</p>
            </div>

        </>
    )
}


export default HitAiDetail;