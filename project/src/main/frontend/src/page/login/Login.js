import './Login.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

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

                if (data.success) {

                    setSession(data.session);
                    localStorage.setItem('session', JSON.stringify(data.session)); // 세션 정보를 로컬 스토리지에 저장

                    navigate('/');
                    window.location.reload();

                } else {

                    alert("로그인 정보가 틀렸거나 일치하는 회원이 없습니다.");
                }
            } else {
                // API 요청 실패 처리
                alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요. ");
            }
        } catch (error) {
            // 오류 처리
            alert("로그인 실패. 다시 시도해주세요. ");
        }
    };


    return (

        <div className='login-page'>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <form className='login-form' onSubmit={handleFormSubmit} method="post">
                <h1 className="header-id">HITTER</h1>
                <div className="id-pwd-input">
                    <label className='id-p' htmlFor="email">
                        <input className='id-input' type="text" id="email" name="memberEmail"
                               placeholder="Email"></input>
                    </label>
                    <label className='pwd-p' htmlFor="pwd">
                        <input className='pwd-input' type="password" placeholder="Password"
                               name="memberPassword"></input>
                    </label>
                    <button className='login-button' id="signin" type="submit">Login</button>
                    <p className='text-bottom'>
                        <Link to='/signup'>
                            Want to be HITTER?
                        </Link>
                        <Link to='/findIdPw'>
                            Lost your ID PW?
                        </Link>
                    </p>

                </div>
            </form>
        </div>

    );
};

export default Login;
