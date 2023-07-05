import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";
import "./MemberDelete.css"
function Select() {
    return null;
}

const MemberDelete = ({session}) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();

    const id = storedSession.loginId;

    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
        if (confirmed) {
            try {
                const formData = new FormData(event.target);
                const response = await axios.get(`/member/delete/${id}`, formData, {
                    responseType: "json",
                });
                console.log(response);
                if (response.status === 200) {

                    alert("탈퇴되었습니다 ");
                    navigate("/member/logout")


                } else {
                    console.error('오류가 발생했습니다. 다시 시도해주세요 ');
                }
            } catch (error) {
                console.error("탈퇴 실패.", error);
            }
        }
    };

    return (
        <div className='del-wrapper'>
            <div className='delmenubar'>
                <MypageBar /></div>
            <form className='del-form' onSubmit={handleSubmitDelete}>
                <span> 회원 탈퇴 신청 </span> <br />
                유의사항 1. 회원탈퇴하면 곡이 전부 삭제됨 <br/>
                2. 게시글 삭제됨  <br/>
                3. 123123123123  <br/>
                <button type="submit">탈퇴</button>
            </form>

        </div>
    );
};


export default MemberDelete;