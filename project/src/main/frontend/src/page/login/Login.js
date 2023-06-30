import './Login.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [session, setSession] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('session'));

        if (storedSession && storedSession.loginName) {
            setSession(storedSession);
        }
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await fetch('/member/login', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    // 로그인 성공
                    setSession(data.session);
                    localStorage.setItem('session', JSON.stringify(data.session)); // 세션 정보를 로컬 스토리지에 저장
                    console.log(localStorage);
                    navigate('/');
                } else {
                    // 로그인 실패
                    console.error('Login failed');
                }
            } else {
                // API 요청 실패 처리
                console.error('API request failed');
            }
        } catch (error) {
            // 오류 처리
            console.error('Error occurred:', error);
        }
    };


    return (
        <>
            {/* <!-- Navigation--> */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">
                        HITTABLE
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/member/hit_ai">
                                    Hit
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/song/board">
                                    Leader Board
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/board/paging">
                                    Community
                                </a>
                            </li>
                            <li className="nav-item">
                                {session.loginEmail != null && (
                                    <a className="nav-link" href="/member/mypage">
                                        <p>{session.loginName}</p>
                                    </a>
                                )}
                            </li>
                            <li className="nav-item">
                                {session.loginEmail != null ? (
                                    <a className="nav-link" href="/member/logout">
                                        로그아웃
                                    </a>
                                ) : (
                                    <a className="nav-link" href="/member/save">
                                        Sign Up
                                    </a>
                                )}
                            </li>
                            <li className="nav-item">
                                {session.loginEmail == null && (
                                    <a className="nav-link" href="/member/login">
                                        Log In
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead text-center text-white">
                <div className="masthead-content">
                    <div className="container px-5">
                        <h2 className="masthead-subheading mb-0">HITTABLE</h2>
                    </div>
                </div>
            </header>

            <div className="jumbotron">
                <div className="container text-center">
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label className="label_text" htmlFor="email">
                                Email
                            </label>
                            <input type="text" className="form-control" id="email" name="memberEmail" />
                        </div>
                        <div className="form-group">
                            <label className="label_text" htmlFor="pwd">
                                Password
                            </label>
                            <input type="password" className="form-control" id="pwd" name="memberPassword" />
                        </div>
                        <button className="btn btn-primary btn-block" id="signin" type="submit">
                            LOGIN
                        </button>
                        <div>
                            <a href="/member/save" id="link_text">
                                Want to sign up?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
