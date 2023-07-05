import React, {useState} from "react";
import './FindPw.css';
import {Link, useNavigate} from 'react-router-dom';

import axios from "axios";

const FindPw = () => {

    const [code, setCode] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [isPWForm, setIsPWForm] = useState(false);

    const navigate = useNavigate();
    const handleMailCheck = (event) => {
        event.preventDefault();
        const email = document.getElementById("memberEmail").value;
        console.log(email);

        axios.post("/member/email-check", null, {
            params: {
                memberEmail: email
            }
        })

            .then(response => {
                console.log(response);

                if (response.data !== "ok") {

                    axios.get(`/mailCheck?email=${email}`)
                        .then(response => {
                            setCode(response.data);
                            alert('인증번호가 전송되었습니다.');
                            setIsValidForm(true);


                        })
                        .catch(error => {
                            alert("에러가 발생했습니다. 다시 시도해주세요");
                        });
                } else {
                    alert("일치하는 회원이 없습니다.");
                }
            })
            .catch(error => {
                alert("일치하는 회원이 없습니다.");
            });
    }
    const handleNumberCheck = (event) => {
        event.preventDefault();
        const inputCode = parseInt(document.getElementById("inputcode").value, 10);

        try {
            if (inputCode == code) {
                alert("인증번호가 일치합니다")
                const memberEmail = document.getElementById("memberEmail").value;
                navigate("/setPw", { state: { "memberEmail" : memberEmail } });

            } else {
                alert("인증번호가 불일치합니다. 다시 확인해주세요!")

            }
        } catch {
            alert("인증번호 6글자를 입력 해주세요.");
        }
    };



    return (
        <div className='login-page-resetpw'>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <form className='login-form-resetpw'>
                <h1 className="header-id">HITTER</h1>
                <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
                <div className="id-pwd-input">
                    <label className='id-p' htmlFor="email">
                        <input className='id-input' type="text" id="memberEmail" name="memberEmail"
                               placeholder="Email"></input>
                    </label>
                    <label className='pwd-p' htmlFor="pwd">
                        <input className='pwd-input' type="text" placeholder="인증번호 6자리"
                               id="inputcode" disabled={!isValidForm}></input>
                    </label>
                    {isValidForm ? (
                        <button className="login-button" onClick={handleNumberCheck}>
                            확인
                        </button>
                    ) : (
                        <button className="send-btn" id="signin" onClick={handleMailCheck}>
                            인증번호 전송
                        </button>
                    )}
                    <p className='text-bottom'>
                        <Link to='/signup'>
                            Want to be HITTER?
                        </Link>
                        <Link to='/login'>
                            Login
                        </Link>
                    </p>

                </div>
            </form>
        </div>
    );
};

export default FindPw;
