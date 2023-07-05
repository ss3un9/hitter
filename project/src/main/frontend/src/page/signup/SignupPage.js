import React, {useState} from "react";

import {useNavigate} from 'react-router-dom';

import './SignupPage.css';
import axios from "axios";


const SignupPage = () => {

    const navigate = useNavigate();

    const [pwdState, setPwdState] = useState('');                                     //비밀번호
    const [rePwdState, setRePwdState] = useState('');                                 //비밀번호 확인

    const [isValidForm, setIsValidForm] = useState(false);                          //비번조건 만족
    const [isEmailForm, setIsEmailForm] = useState(false);                          //이메일
    const [isPwForm, setPwForm] = useState(false);                                  //비번
    const [isNickForm, setIsNickForm] = useState(false);                            //닉네임
    const [isTermsChecked, setIsTermsChecked] = useState(false);                    //약관
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);                //개인정보
    const [isEmailChecked, setIsEmailChecked] = useState(false);                    // 메일체크

    const [verifyButtonVisible, setVerifyButtonVisible] = useState(true);           //일치하면 확인버튼 지움
    const [inputDisabled, setInputDisabled] = useState(false);                      //일치하면 인풋 비활성화

    const [inputCode, setInputCode] = useState('');                                   //인증번호 6자리
    const [resultMsg, setResultMsg] = useState('');                                   //인증번호 일치불일치 메세지
    const [resultColor, setResultColor] = useState('');                               //인증번호 일치불일치 색깔

    const [isMailBox, setIsMailBox] = useState(false);                              //인증하기 누르면 input창 띄우기
    const handleTermsCheckboxChange = (event) => {
        setIsTermsChecked(event.target.checked);
    };

    const handlePrivacyCheckboxChange = (event) => {
        setIsPrivacyChecked(event.target.checked);
    };

    const handlePwdInput = () => {
        const pwd = document.getElementById('pwd').value;
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        const missingConditions = [];

        try {
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
                        missingConditions.push(`비밀번호 자릿수가 16보다 작아야 합니다`);
                    }
                }
                setPwdState(`비밀번호는 ${missingConditions.join(', ')} 조건을 포함해야 합니다!`);
                setPwForm(false);
            } else {
                setPwdState('');
                setPwForm(true);
            }
            handleRePwdInput();
        } catch {
            alert('비밀번호를 입력해주세요.');
        }

    };


    const handleRePwdInput = () => {
        const pwd = document.getElementById('pwd').value;
        const rePwd = document.getElementById('re_pwd').value;

        if (rePwd !== '' && rePwd !== pwd) {
            setRePwdState('비밀번호가 다릅니다');
            setIsValidForm(false);
        } else {
            setRePwdState('');
            setIsValidForm(true);
        }
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (isTermsChecked && isPrivacyChecked) {
            try {
                const formData = new FormData(event.target);
                const response = await fetch('/member/save', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                } else {
                    alert('회원가입에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error('Error occurred:', error);
                alert('오류가 발생했습니다. 다시 시도해주세요.');
            }
        } else {
            alert("필수약관에 동의해야 합니다.")
        }


    };

    const emailCheck = () => {
        const email1 = document.getElementById("memberEmail").value;                            //이메일
        const email2 = document.getElementById("userEmail2").value;                             //이메일 도메인
        const email = email1 + "@" + email2
        const checkResult = document.getElementById("check-result");
        console.log("입력값: ", email);

        axios.post("/member/email-check", null, {
            params: {
                memberEmail: email
            }
        })
            .then(response => {

                if (response.data === "ok") {
                    checkResult.style.color = "green";
                    checkResult.innerHTML = "사용가능한 이메일";
                    alert("사용가능한 이메일입니다");
                    setIsMailBox(true);
                    setIsEmailForm(true);
                } else {
                    checkResult.style.color = "red";
                    checkResult.innerHTML = "이미 사용중인 이메일";
                    alert("이미 사용중인 이메일입니다");
                    setIsEmailForm(false);
                }
            })
            .catch(error => {
                alert("에러가 발생했습니다. 다시 시도해주세요");
            });
    };

    const NickNameCheck = () => {
        const nickname = document.getElementById("memberNickName").value;
        const checkNickResult = document.getElementById("checkNick-result");

        axios.post("/member/nick-check", null, {
            params: {
                memberNickName: nickname
            }
        })
            .then(response => {
                if (response.data === "ok") {
                    checkNickResult.style.color = "green";
                    checkNickResult.innerHTML = "사용가능한 닉네임";
                    alert("사용가능한 닉네임입니다");
                    setIsNickForm(true);
                } else {
                    checkNickResult.style.color = "red";
                    checkNickResult.innerHTML = "이미 사용중인 닉네임";
                    alert("이미 사용중인 닉네임입니다");
                    setIsNickForm(false);
                }
            })
            .catch(error => {
                alert("에러가 발생했습니다. 다시 시도해주세요");
            });
    };
    const [code, setCode] = useState('');
    const handleMailCheck = () => {
        const email1 = document.getElementById("memberEmail").value;
        const email2 = document.getElementById("userEmail2").value;
        const email = email1 + "@" + email2

        axios.get(`/mailCheck?email=${email}`)
            .then(response => {
                console.log('data: ' + response.data);
                setCode(response.data);
                alert('인증번호가 전송되었습니다.');

            })
            .catch(error => {
                alert("에러가 발생했습니다. 다시 시도해주세요");
            });
    };

    const handleNumberCheck = () => {
        const inputCode = parseInt(document.getElementById("inputcode").value, 10);

        try {
            if (inputCode == code) {
                setResultMsg('인증번호가 일치합니다.');
                alert("인증번호가 일치합니다")
                setResultColor('green');
                setIsEmailChecked(true);
                setVerifyButtonVisible(false);
                setInputDisabled(true);
            } else {
                setResultMsg('인증번호가 불일치합니다. 다시 확인해주세요!');
                alert("인증번호가 불일치합니다. 다시 확인해주세요!")
                setResultColor('red');
                setIsEmailChecked(false);
            }
        } catch {
            alert("인증번호 6글자를 입력 해주세요.");
        }
    };

    return (

        <>

            <div className="signup-box">
                <div className='form-box'>
                    <h1 className="signup-txt">SIGN UP</h1>
                    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
                            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
                            crossorigin="anonymous">
                    </script>

                    <form className='agree-list'>
                        <ul className="join_box">
                            <li className="checkBox-check02">
                                <br></br><br></br>
                                <li>이용약관 동의(필수)
                                    <input type="checkbox" name="chk" checked={isTermsChecked}
                                           onChange={handleTermsCheckboxChange}/>
                                </li>
                                <br></br>
                                <textarea className='first' name="" id="">
                                    여러분을 환영합니다.
                                    히터(HITTER) 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
                                    본 약관은 다양한 히터(HITTER) 서비스의 이용과 관련하여 히터(HITTER) 서비스를 제공하는 히터(HITTER) 주식회사(이하 ‘히트시그널’)와 이를 이용하는 히터(HITTER) 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 히터(HITTER) 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                                </textarea>
                            </li>
                            <li className="checkBox-check03">
                                <br></br><br></br>
                                <li>개인정보 수집 및 이용에 대한 안내(필수)
                                    <input type="checkbox" name="chk" checked={isPrivacyChecked}
                                           onChange={handlePrivacyCheckboxChange}/>
                                </li>
                                <br></br>
                                <textarea className='second' name="" id={""}>
                                    개인정보보호법에 따라 히터(HITTER)에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

1. 수집하는 개인정보
이용자는 회원가입을 하지 않아도 대부분의 히터(HITTER) 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 히트 예측, 글쓰기와 같은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 히트시그널은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.

회원가입 시점에 히터(HITTER)가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
- 회원 가입 시 필수항목으로 이메일, 비밀번호, 이름, 닉네임을 수집합니다.
서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
- 회원정보 또는 개별 서비스에서 프로필 정보(닉네임, 프로필 사진)를 설정할 수 있습니다.
- 히터(HITTER) 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다.

2. 수집한 개인정보의 이용
히터(HITTER) 및 히터(HITTER) 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.

- 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
- 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, 지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.
- 법령 및 히터(HITTER) 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
- 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.
- 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
- 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.
- 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.
3. 개인정보의 보관기간
회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.
단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
이용자에게 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시 동의를 얻은 경우는 아래와 같습니다.
- 부정 가입 및 이용 방지
부정 이용자의 가입인증 휴대전화번호 또는 DI : 탈퇴일로부터 6개월 보관
탈퇴한 이용자의 휴대전화번호(복호화가 불가능한 일방향 암호화(해시처리)) : 탈퇴일로부터 6개월 보관
- 통신비밀보호법
로그인 기록: 3개월

4. 개인정보 수집 및 이용 동의를 거부할 권리
이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
                                </textarea>
                            </li>
                        </ul>
                    </form>

                    <div className="jumbotron">
                        <div className="container text-center">
                            <form method="post" action="/member/save" onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label className="label_text" htmlFor="memberEmail">Email</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="memberEmail"
                                               name="memberEmail"/>
                                        <select className="select-control" name="userEmail2" id="userEmail2">
                                            <option>naver.com</option>
                                            <option>daum.net</option>
                                            <option>gmail.com</option>
                                            <option>hanmail.com</option>
                                            <option>yahoo.co.kr</option>
                                        </select>
                                        <button type="button" className="btn btn-primary" onClick={emailCheck}>Check
                                            Email
                                        </button>
                                        <p id="check-result"></p>
                                    </div>
                                </div>
                                <div className="input-group">


                                    {isMailBox && (

                                        <div className="input-group">
                                            <button type="button" className="label_text" id="mail-Check-Btn"
                                                    onClick={handleMailCheck}>본인 인증
                                            </button>
                                            <input className="form-control" id="inputcode"
                                                   placeholder="인증번호 6자리를 입력해주세요!"
                                                   onChange={(e) => setInputCode(e.target.value)} maxLength="6"
                                                   disabled={inputDisabled}/>
                                            {verifyButtonVisible && ( // 인증번호가 일치하지 않을 때만 확인 버튼을 보여줌
                                                <button type="button" id="number-Check-Btn"
                                                        onClick={handleNumberCheck}>확인</button>
                                            )}
                                            <span id="mail-check-warn" style={{color: resultColor}}>{resultMsg}</span>
                                        </div>

                                    )}
                                </div>
                                <div className="form-group">
                                    <label className="label_text" htmlFor="pwd">비밀번호</label>
                                    <input type="password" className="form-control" id="pwd" name="memberPassword"
                                           onInput={handlePwdInput}/>
                                    <div id="pwdstate">{pwdState}</div>
                                </div>
                                <div className="form-group">
                                    <label className="label_text" htmlFor="re_pwd">비밀번호 재확인</label>
                                    <input type="password" className="form-control" id="re_pwd" name="re_pwd"
                                           onInput={handleRePwdInput}/>
                                    <div id="repwdstate">{rePwdState}</div>
                                </div>
                                <div className="form-group">
                                    <label className="label_text" htmlFor="name">이름</label>
                                    <input type="text" className="form-control" id="name" name="memberName"/>
                                </div>
                                <div className="form-group">
                                    <label className="label_text" htmlFor="name">닉네임</label>
                                    <input type="text" className="form-control" id="memberNickName"
                                           name="memberNickName"/>
                                    <button type="button" className="btn btn-primary" onClick={NickNameCheck}>Check
                                        NickName
                                    </button>
                                </div>


                                <p id="checkNick-result"></p>
                                <button className="btn btn-primary btn-block" id="signup" type="submit"
                                        disabled={!isValidForm || !isEmailForm || !isPwForm || !isNickForm || !isEmailChecked}>Sign
                                    Up
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )

}


export default SignupPage;
