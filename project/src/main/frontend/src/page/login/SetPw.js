import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';

import axios from "axios";

const SetPw = () => {

    const location = useLocation();
    const memberEmail = location?.state?.memberEmail;

    const [pwdState, setPwdState] = useState('');                                     //비밀번호
    const [rePwdState, setRePwdState] = useState('');
    const [isPwForm, setPwForm] = useState(false);
    const [values, setValues] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const [memberPassword, setMemberPassword] = useState('');
    const navigate = useNavigate();


    const [editingPassword, setEditingPassword] = useState(false);                //비밀번호 입력창 값
    const [newPassword, setNewPassword] = useState("");                             //변경할 비밀번호
    const [confirmPassword, setConfirmPassword] = useState("");                     //변경할 비밀번호 재입력
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const handlePwdInput = (event) => {

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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const findResponse = await axios.get(`/member/find/${memberEmail}`);
            const { data } = findResponse;

            if (data !=null) {

                const formData = new FormData();
                formData.append("memberEmail", memberEmail);
                formData.append("id", data.memberDTO.id);
                formData.append("memberNickName", data.memberDTO.memberNickName);
                formData.append("memberName", data.memberDTO.memberName);
                formData.append("memberPassword", memberPassword);
                console.log(formData)

                const updateResponse = await axios.post("/member/update", formData, {
                    responseType: "json",
                });

                if (updateResponse.status === 200) {
                    alert("비밀번호가 재설정되었습니다.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                } else {

                    alert("회원정보를 수정하는데 실패했습니다. 다시 시도해 주세요.");
                }
            }

        } catch (error) {
            console.log(error);
            alert("가사를 불러오지 못했습니다. 다시 시도해 주세요.");
        }
    };
    useEffect(() => {
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
            setIsValidForm(false);
        } else {
            setPasswordMatchError(false);
            setMemberPassword(newPassword);
        }
    }, [newPassword, confirmPassword]);
    return (
        <div className='login-page'>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <form className='login-form'>
                <h1 className="header-id">HITTER</h1>
                <p>비밀번호를 재설정 해주세요.</p>
                <div className="id-pwd-input">
                    <div>
                        <div className="form-group">
                            <label className="label_text" htmlFor="pwd">
                                비밀번호
                            </label>

                            <input
                                type="password"
                                value={newPassword}
                                id="pwd"
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    handlePwdInput();
                                }}
                                placeholder="새로운 비밀번호"

                            />
                            {pwdState && <span style={{color: "red"}}>{pwdState}</span>}
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
                                <span style={{color: "red"}}>비밀번호가 일치하지 않습니다.</span>
                            )}
                        </div>
                        <button type="button" onClick={handleSubmit} disabled={!isValidForm} >수정</button>
                    </div>

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

export default SetPw;
