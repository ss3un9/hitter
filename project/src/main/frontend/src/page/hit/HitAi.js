import React from "react";
import './HitAi.css'

const HitAi = () => {

    // const session = {'loginEmail':'dafd@adf.com',
    //                     'loginName':'test'};

    const session = [];
    const storedSession = JSON.parse(localStorage.getItem('session'));

// 다른 페이지에서 storedSession 값 사용
    if (storedSession && storedSession.loginName) {
        console.log(storedSession.loginName);
    }
    

    return (
            <>
            {/* <!-- Navigation--> */}
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container px-5">
                    <a class="navbar-brand" href="/">HITTABLE</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span
                            class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="/member/hit_ai">Hit</a></li>
                            <li class="nav-item"><a class="nav-link" href="/member/leader_board">Leader Board</a></li>
                            <li class="nav-item"><a class="nav-link" href="/board/paging">Community</a></li>
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

            <body>

                <h2>이 곡이 히트할 확률은 얼마나 될까요?<br></br>
                    AI 기반 예측 모델로 측정해보세요!
                </h2>

                <form action="/api/upload" method="post" enctype="multipart/form-data">
                    <label for="music">Choose a music file:</label>
                    <input type="file" id="music" name="file" accept="audio/*"/>
                        <input type="submit" value="Upload"/>
                </form>
            </body>
            </>
                )
}


                export default HitAi;