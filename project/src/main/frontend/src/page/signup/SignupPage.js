import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
    const [session, setSession] = useState(null);
    const navigate = useNavigate();


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await fetch("/member/save", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                alert("회원가입이 완료되었습니다.");
                navigate('/member/login');
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            // 네트워크 오류 등 예외 처리를 수행합니다.
            console.error("Error occurred:", error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
    };




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
                            <li className="nav-item"><a className="nav-link" href="/member/save">Sign Up</a></li>
                            <li className="nav-item"><a className="nav-link" href="/member/login">Log In</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* <!-- Header--> */}
            <header class="masthead text-center text-white">
                <div class="masthead-content">
                    <div class="container px-5">
                        <h2 class="masthead-subheading mb-0">SIGN UP</h2>
                    </div>
                </div>
            </header>
            <script src="https://code.jquery.com/jquery-3.2.1.min.js"
                integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
            <body>
                {/* <!-- action속성: form에 작성한 데이터를 어디로 보낼지 지정 --> */}
                <div class="jumbotron">
                    <div class="container text-center">
                        <form method="post" onSubmit={handleFormSubmit}>
                            <div class="form-group">
                                <label class="label_text" for="memberEmail">Email</label>
                                <input type="text" class="form-control" id="memberEmail" name="memberEmail" onblur="emailCheck()" /><p id="check-result"></p>
                                <div id="emailstate"> </div>
                            </div>


                            <div class="form-group">
                                <label class="label_text" for="pwd">비밀번호</label>
                                <input type="password" class="form-control" id="pwd" name="memberPassword" oninput='checkpwd()' />
                                <div id="pwdstate"> </div>
                            </div>



                            <div class="form-group">
                                <label class="label_text" for="re_pwd">비밀번호 재확인</label>
                                <input type="password" class="form-control" id="re_pwd" name="re_pwd" oninput='checkrepwd()' />
                                <div id="repwdstate"> </div>
                            </div>



                            <div class="form-group">
                                <label class="label_text" for="name">이름</label>
                                <input type="text" class="form-control" id="name" name="memberName" />
                            </div>

                            <div class="form-group">
                                <label class="label_text" for="name">닉네임</label>
                                <input type="text" class="form-control" id="nickname" name="memberNickName" />
                            </div>

                            {/* <input type="submit" value="회원가입" /> */}
                            <button class="btn btn-primary btn-block" id="signup" onclick="checksingup()" type="submit">Sign Up</button>

                        </form>
                    </div>
                </div>
            </body>
        </>
    )
}


export default SignupPage;