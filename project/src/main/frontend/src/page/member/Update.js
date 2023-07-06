import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";
import "./Update.css"

const Update = () => {

    const navigate = useNavigate();

    const [memberId, setMemberId] = useState("");                                   //memberId
    const [memberEmail, setMemberEmail] = useState("");                             //memberEmail
    const [memberName, setMemberName] = useState("");                               //memberName
    const [memberNickName, setMemberNickName] = useState("");                       //memberNickName
    const [memberPassword, setMemberPassword] = useState("");                       //memberPassword
    const [editingPassword, setEditingPassword] = useState(false);                //비밀번호 입력창 값
    const [newPassword, setNewPassword] = useState("");                             //변경할 비밀번호
    const [confirmPassword, setConfirmPassword] = useState("");                     //변경할 비밀번호 재입력
    const [passwordMatchError, setPasswordMatchError] = useState(false);          //비밀번호 일치불일치 메세지설정

    const [pwdState, setPwdState] = useState("");                                   //비밀번호 변경 조건
    const [isValidForm, setIsValidForm] = useState(false);                        //비밀번호 일치불일치값

    const [editingName, setEditingName] = useState(false);                        //이름 변경
    const [editingNickName, setEditingNickName] = useState(false);                //닉네임 변경

    const [isNickForm, setIsNickForm] = useState(false);                          //닉네임 중복 체크값

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/member/update");
                const {data} = response;
                if (response.status === 200) {
                    const member_id = data.updateMember.id;
                    setMemberId(member_id);

                    const member_Email = data.updateMember.memberEmail;
                    setMemberEmail(member_Email);

                    const member_name = data.updateMember.memberName;
                    setMemberName(member_name);

                    const member_nickname = data.updateMember.memberNickName;
                    setMemberNickName(member_nickname);

                    const member_password = data.updateMember.memberPassword;
                    setMemberPassword(member_password);
                } else {
                    alert('회원정보를 불러오는데 실패했습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await axios.post("/member/update", formData, {
                responseType: "json",
            });
            if (response.status === 200) {
                alert("회원 정보가 성공적으로 수정되었습니다");
                alert("다시 로그인 해주세요")
                console.log()
                setTimeout(() => {
                    navigate("/member/logout");
                }, 1000);

            } else {
                alert('회원정보를 수정하는데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };
    const handleSubmitName = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await axios.post("/member/update/name", formData, {
                responseType: "json",
            });
            if (response.status === 200) {
                alert("닉네임이 성공적으로 수정되었습니다");
                alert("다시 로그인 해주세요")
                navigate("/member/logout")

            } else {
                alert('회원정보를 수정하는데 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };
    const handlePasswordEdit = () => {
        setEditingPassword(true);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMatchError(false);
    };

    const handleCancelEdit = () => {
        setEditingPassword(false);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMatchError(false);
    };

    const handlePwdInput = () => {
        const pwd = document.getElementById("pwd").value;
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
        const missingConditions = [];
        try {
            if (!regExp.test(pwd)) {
                if (!/(?=.*[A-Za-z])/.test(pwd)) {
                    missingConditions.push("영문자");
                }
                if (!/(?=.*\d)/.test(pwd)) {
                    missingConditions.push("숫자");
                }
                if (!/(?=.*[@$!%*#?&])/.test(pwd)) {
                    missingConditions.push("특수문자");
                }
                if (pwd.length < 8 || pwd.length > 16) {
                    if (pwd.length < 8) {
                        missingConditions.push(`비밀번호 자릿수(${pwd.length}/8)`);
                    } else if (pwd.length > 16) {
                        missingConditions.push(`비밀번호 자릿수가 16보다 작아야 합니다.`);
                    }
                }
                setPwdState(`비밀번호는 ${missingConditions.join(", ")} 조건을 포함해야 합니다!`);
                setIsValidForm(false);
            } else {
                setPwdState("");
                setIsValidForm(true);
            }

        } catch {
            alert('변경할 비밀번호를 입력 해주세요.');
        }

    };
    const NickNameCheck = (nickname) => {
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

    useEffect(() => {
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
            setIsValidForm(false);
        } else {
            setPasswordMatchError(false);
        }
    }, [newPassword, confirmPassword]);

    return (
        <div className='update-main'>
            <div className='upd-bar'>
                <MypageBar/></div>
            <div className='upt-form'>
                <form className='info-login' method="post" onSubmit={handleSubmit}>
                    <h2 className='h2-lg-if'>로그인 정보</h2>
                    <input type="hidden" value={memberId} name="id"/>
                    <input type="hidden" value={memberEmail} name="memberEmail"/>
                    <input type="hidden" value={memberName} name="memberName"/>
                    <input type="hidden" value={memberNickName} name="memberNickName"/>
                    {passwordMatchError || !editingPassword ? null : (
                        <input type="hidden" value={newPassword} name="memberPassword"/>
                    )}

                    <br/>
                    <p className='emailcan'> Email: <span>{memberEmail}</span> </p>
                    <p className='pwdcan'>비밀번호:{" "}
                    {editingPassword ? (
                        <div className='pwd-chk-wrap'>
                            <input className='newpwdd'
                                type="password"
                                value={newPassword}
                                id="pwd"
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    handlePwdInput();
                                }}
                                placeholder="새로운 비밀번호"

                            />
                            <br/>
                            {pwdState && <span className='alert-msg1' style={{color: "black", fontSize: 12, fontFamily:"Suit"}}>{pwdState}</span>}
                            <br/>
                            <input className='chkpwd'
                                type="password"
                                value={confirmPassword}
                                id="re_pwd"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    handlePwdInput();
                                }}
                                placeholder="비밀번호 확인"

                            /><br/>
                            {passwordMatchError && (
                                <span style={{color: "red", fontSize: 12, fontFamily:"Suit"}}> 비밀번호가 일치하지 않습니다.</span>
                            )}
                            <br/>
                            <button className='btn-pwdd' type="submit" disabled={!isValidForm}>
                                수정하기
                            </button>
                            <button className='btn-pwdd' type="button" onClick={handleCancelEdit}>변경취소</button>
                        </div>
                    ) : (
                        <>
                            <span className='stars'>********</span>
                            <button type="button" onClick={handlePasswordEdit}>수정</button>
                        </>
                    )}</p>
                </form>

                <form method="post" onSubmit={handleSubmitName}>
                    <input type="hidden" value={memberId} name="id"/>
                    <input type="hidden" value={memberEmail} name="memberEmail"/>
                    <input type="hidden" value={memberNickName} name="memberNickName"/>
                    <input type="hidden" value={memberPassword} name="memberPassword"/>

                    이름:{" "}
                    {editingName ? (
                        <div className='chgname-wrapper'>
                            <input className=''
                                type="text"
                                value={memberName}
                                name="memberName"
                                onChange={(e) => setMemberName(e.target.value)}
                            />
                            <br/><br/>
                            <button type="submit">수정하기</button>
                            <button type="button" onClick={() => setEditingName(false)}>변경취소</button>


                        </div>
                    ) : (
                        <>
                            <span className='mbn'>{memberName}</span>
                            <button type="button" onClick={() => setEditingName(true)}>변경하기</button>

                        </>
                    )}
                    <br/>
                </form>

                <form method="post" onSubmit={handleSubmit}>
                    <input type="hidden" value={memberId} name="id"/>
                    <input type="hidden" value={memberEmail} name="memberEmail"/>
                    <input type="hidden" value={memberName} name="memberName"/>
                    <input type="hidden" value={memberPassword} name="memberPassword"/>
                    <br/>
                    닉네임:{" "}
                    {editingNickName ? (
                        <div className='nick-chg'>
                            <input
                                type="text"
                                value={memberNickName}
                                name="memberNickName"
                                onChange={(e) => setMemberNickName(e.target.value)}
                            />
            <br/><br/>

                            <button type="submit" disabled={!isNickForm}>수정하기</button>
                            <button type="button" onClick={() => NickNameCheck(memberNickName)}>Check</button>
                            <button type="button" onClick={() => setEditingNickName(false)}>취소</button>
                            <p id="checkNick-result"></p>
                        </div>
                    ) : (
                        <>
                            <span className='nikkk'>{memberNickName}</span>
                            <button type="button" onClick={() => setEditingNickName(true)}>수정</button>

                        </>
                    )}
                    <br/>
                </form>
            </div>
        </div>
    );

};

export default Update;