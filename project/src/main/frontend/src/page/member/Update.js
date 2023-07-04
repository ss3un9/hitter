import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";

const Update = () => {
    const storedSession = JSON.parse(localStorage.getItem("session")) || {};
    const navigate = useNavigate();
    const id = storedSession.loginId;
    const [session, setSession] = useState({});

    const [memberId, setMemberId] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberNickName, setMemberNickName] = useState("");
    const [memberPassword, setMemberPassword] = useState("");
    const [editingPassword, setEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [pwdState, setPwdState] = useState("");
    const [isValidForm, setIsValidForm] = useState(false);

    const [editingName, setEditingName] = useState(false);
    const [editingNickName, setEditingNickName] = useState(false);

    const [isNickForm, setIsNickForm] = useState(false);  //닉네임

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/member/update");
                const { data } = response;
                console.log(data);
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
                    throw new Error("회원 정보를 불러오는데 실패하였습니다");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
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
            console.log(response);
            if(response.status === 200) {

                alert("회원 정보가 성공적으로 수정되었습니다");
                alert("다시 로그인 해주세요")
                console.log()
                setTimeout(() => {
                    navigate("/member/logout");
                }, 1000);



            }else{
                console.error('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        } catch (error) {
            console.error("회원정보를 수정하지 못했습니다.", error);
        }
    };
    const handleSubmitName = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);
            const response = await axios.post("/member/update/name", formData, {
                responseType: "json",
            });
            console.log(response);
            if(response.status === 200) {

                alert("회원 정보가 성공적으로 수정되었습니다");
                alert("다시 로그인 해주세요")
                navigate("/member/logout")



            }else{
                console.error('오류가 발생했습니다. 다시 시도해주세요 ');
            }
        } catch (error) {
            console.error("회원정보를 수정하지 못했습니다.", error);
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
    };
    const NickNameCheck = (nickname) => {
        const checkNickResult = document.getElementById("checkNick-result");
        console.log("입력값: ", nickname);

        axios.post("/member/nick-check", null, {
            params: {
                memberNickName: nickname
            }
        })
            .then(response => {
                console.log("요청성공", response.data);
                if (response.data === "ok") {
                    console.log("사용가능한 닉네임");
                    checkNickResult.style.color = "green";
                    checkNickResult.innerHTML = "사용가능한 닉네임";
                    alert("사용가능한 닉네임입니다");
                    setIsNickForm(true);
                } else {
                    console.log("이미 사용중인 닉네임");
                    checkNickResult.style.color = "red";
                    checkNickResult.innerHTML = "이미 사용중인 닉네임";
                    alert("이미 사용중인 닉네임입니다");
                    setIsNickForm(false);
                }
            })
            .catch(error => {
                console.log("에러발생", error);
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
                        <form className='info-login' method="post" onSubmit={ handleSubmit }>
                            로그인 정보
                            <input type="hidden" value={memberId} name="id" />
                            <input type="hidden" value={memberEmail} name="memberEmail" />
                            <input type="hidden" value={memberName} name="memberName" />
                            <input type="hidden" value={memberNickName} name="memberNickName" />
                            {passwordMatchError || !editingPassword ? null : (
                                <input type="hidden" value={newPassword} name="memberPassword" />
                            )}

                            <br />
                            이메일: <span>{memberEmail}</span>
                            <br />
                            비밀번호:{" "}
                            {editingPassword ? (
                                <>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        id="pwd"
                                        onChange={(e) => {setNewPassword(e.target.value); handlePwdInput();}}
                                        placeholder="새로운 비밀번호"

                                    />
                                    {pwdState && <span style={{ color: "red" }}>{pwdState}</span>}
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        id="re_pwd"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            handlePwdInput();
                                        }}
                                        placeholder="비밀번호 확인"

                                    />
                                    {passwordMatchError && (
                                        <span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>
                                    )}

                                    <button type = "submit" disabled={!isValidForm}>
                                        수정하기
                                    </button>
                                    <button type="button" onClick={handleCancelEdit}>변경취소</button>
                                </>
                            ) : (
                                <>
                                    <span>********</span>
                                    <button type="button" onClick={handlePasswordEdit}>수정</button>
                                </>
                            )}
                        </form>

                        <form method="post" onSubmit={ handleSubmitName }>
                            <input type="hidden" value={memberId} name="id" />
                            <input type="hidden" value={memberEmail} name="memberEmail" />
                            <input type="hidden" value={memberNickName} name="memberNickName" />
                            <input type="hidden" value={memberPassword} name="memberPassword" />

                            사용자 정보 <br />
                            이름:{" "}
                            {editingName ? (
                                <>
                                    <input
                                        type="text"
                                        value={memberName}
                                        name="memberName"
                                        onChange={(e) => setMemberName(e.target.value)}
                                    />

                                    <button type="button" onClick={() => setEditingName(false)}>변경취소</button>
                                    <button type = "submit" >수정하기</button>

                                </>
                            ) : (
                                <>
                                    <span>{memberName}</span>
                                    <button type="button" onClick={() => setEditingName(true)}>변경하기</button>

                                </>
                            )}
                            <br />
                        </form>

                        <form method="post" onSubmit={handleSubmit}>
                            <input type="hidden" value={memberId} name="id" />
                            <input type="hidden" value={memberEmail} name="memberEmail" />
                            <input type="hidden" value={memberName} name="memberName" />
                            <input type="hidden" value={memberPassword} name="memberPassword" />
                            <br />
                            닉네임:{" "}
                            {editingNickName ? (
                                <>
                                    <input
                                        type="text"
                                        value={memberNickName}
                                        name="memberNickName"
                                        onChange={(e) => setMemberNickName(e.target.value)}
                                    />

                                    <button type="button"  onClick={() => setEditingNickName(false)}>취소</button>
                                    <button type = "submit" disabled={!isNickForm}>수정하기</button>
                                    <button type="button" onClick={() => NickNameCheck(memberNickName)}>Check</button>
                                    <p id="checkNick-result"></p>
                                </>
                            ) : (
                                <>
                                    <span>{memberNickName}</span>
                                    <button type="button"  onClick={() => setEditingNickName(true)} >수정</button>

                                </>
                            )}
                            <br />
                        </form>
                    </div>
            </div>
    );

};

export default Update;