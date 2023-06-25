

import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import './SignupPage.css';


const SignupPage = () => {

    const [emailState, setEmailState] = useState('');

    const [pwdState, setPwdState] = useState('');

    const [repwdState, setRepwdState] = useState('');

    const [isValidForm, setIsValidForm] = useState(false);

    const navigate = useNavigate();


    const handleEmailBlur = () => {

        const email = document.getElementById('memberEmail').value;

        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


        if (email.match(regExp) != null) {

            setEmailState('올바른 이메일 형식입니다!');

            setIsValidForm(true);

        } else {

            setEmailState('이메일 형식이 올바르지 않습니다!');

            setIsValidForm(false);

        }

    };


    const handlePwdInput = () => {

        const pwd = document.getElementById('pwd').value;

        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

        const missingConditions = [];




        if (!regExp.test(pwd)) {

            if (!/(?=.*[A-Za-z])/.test(pwd)) {

                missingConditions.push('영문자');

            }

            if (!/(?=.*\d)/.test(pwd)) {

                missingConditions.push('숫자');

            }

            if (!/(?=.*[@$!%*#?&])/.test(pwd)) {

                missingConditions.push('특수문자');

            }

            if (pwd.length < 8 || pwd.length > 16) {

                if (pwd.length < 8) {

                    missingConditions.push(`비밀번호 자릿수(${pwd.length}/8)`);

                } else if (pwd.length > 16) {

                    missingConditions.push(`비밀번호 자릿수가 16보다 작아야 하는`);

                }

            }




            setPwdState(`비밀번호는 ${missingConditions.join(', ')} 조건을 포함해야 합니다!`);

            setIsValidForm(false);

        } else {

            setPwdState('');

            setIsValidForm(true);

        }

        handleRepwdInput();

    };




    const handleRepwdInput = () => {

        const pwd = document.getElementById('pwd').value;

        const repwd = document.getElementById('re_pwd').value;




        if (repwd !== '' && repwd !== pwd) {

            setRepwdState('비밀번호가 다릅니다');

            setIsValidForm(false);

        } else {

            setRepwdState('');

            setIsValidForm(true);

        }

    };
    const handleFormSubmit = async (event) => {

        event.preventDefault();


        if (!isValidForm) {

            alert('입력값이 올바르지 않습니다. 다시 확인해주세요.');

            return;

        }


        try {

            const formData = new FormData(event.target);

            const response = await fetch('/member/save', {

                method: 'POST',

                body: formData,

            });


            if (response.ok) {

                alert('회원가입이 완료되었습니다.');

                navigate('/member/login');

            } else {

                alert('회원가입에 실패했습니다. 다시 시도해주세요.');

            }

        } catch (error) {

            console.error('Error occurred:', error);

            alert('오류가 발생했습니다. 다시 시도해주세요.');

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

                            <li class="nav-item"><a className="nav-link" href="/member/hit_ai">Hit</a></li>

                            <li className="nav-item"><a className="nav-link" href="/member/leader_board">Leader Board</a></li>

                            <li className="nav-item"><a className="nav-link" href="/board/paging">Community</a></li>

                            <li className="nav-item"><a className="nav-link" href="/member/save">Sign Up</a></li>

                            <li className="nav-item"><a className="nav-link" href="/member/login">Log In</a></li>

                        </ul>

                    </div>

                </div>

            </nav>

            {/* <!-- Header--> */}

            <header className="masthead text-center text-white">

                <div className="masthead-content">

                    <div className="container px-5">

                        <h2 className="masthead-subheading mb-0">SIGN UP</h2>

                    </div>

                </div>

            </header>

            <script src="https://code.jquery.com/jquery-3.2.1.min.js"

                    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>


            {/* <!-- action속성: form에 작성한 데이터를 어디로 보낼지 지정 --> */}

            <div className="jumbotron">

                <div className="container text-center">

                    <form method="post" action="/member/save" onSubmit={handleFormSubmit}>

                        <div className="form-group">

                            <label className="label_text" htmlFor = "memberEmail">

                                Email

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                id="memberEmail"

                                name="memberEmail"

                                onBlur={handleEmailBlur}

                            />

                            <p id="check-result"></p>

                            <div id="emailstate">{emailState}</div>

                        </div>


                        <div className="form-group">

                            <label className="label_text" for="pwd">

                                비밀번호

                            </label>

                            <input

                                type="password"

                                className="form-control"

                                id="pwd"

                                name="memberPassword"

                                onInput={handlePwdInput}

                            />

                            <div id="pwdstate">{pwdState}</div>

                        </div>


                        <div className="form-group">

                            <label className="label_text" htmlFor="re_pwd">

                                비밀번호 재확인

                            </label>

                            <input

                                type="password"

                                className="form-control"

                                id="re_pwd"

                                name="re_pwd"

                                onInput={handleRepwdInput}

                            />

                            <div id="repwdstate">{repwdState}</div>

                        </div>


                        <div className="form-group">

                            <label className="label_text" htmlFor="name">이름</label>

                            <input type="text" className="form-control" id="name" name="memberName" />

                        </div>


                        <div className="form-group">

                            <label className="label_text" htmlFor="name">닉네임</label>

                            <input type="text" className="form-control" id="nickname" name="memberNickName" />

                        </div>


                        <button className="btn btn-primary btn-block" id="signup" type="submit">

                            Sign Up

                        </button>

                    </form>

                </div>

            </div>


        </>

    )

}



export default SignupPage;