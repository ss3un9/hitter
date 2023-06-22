import React from "react";
import './HitAi.css'

const HitAi = () => {

    // const session = {'loginEmail':'dafd@adf.com',
    //                     'loginName':'test'};

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};


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



                <h2>이 곡이 히트할 확률은 얼마나 될까요?<br></br>
                    AI 기반 예측 모델로 측정해보세요!
                </h2>

                <form action="/api/upload" method="post" encType="multipart/form-data">
                    <label htmlFor="music">Choose a music file:</label>
                    <input type="file" id="music" name="file" accept="audio/*"/>
                        <input type="submit" value="Upload"/>
                </form>

            </>
                )
}


                export default HitAi;