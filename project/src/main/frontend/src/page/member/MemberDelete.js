import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";
import "./MemberDelete.css"
import {FaRegFaceSadTear} from "react-icons/fa6";

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
                <span className='main-del'> <FaRegFaceSadTear className='tearrr' size='30' style={{alignContent: "center", textAlign: "center"}}/>회원 탈퇴 신청<FaRegFaceSadTear className='tearrr' size='30' style={{alignContent: "center", textAlign: "center"}}/> </span> <br />
                <div className='chkpoint'>
                1. 회원 탈퇴 시 업로드한 파일이 전부 삭제됩니다. <br/>
                2. 작성한 게시글이 모두 삭제됩니다. <br/>
                </div>
                <div className='btn-posi'>
                <button className='byebtn' type="submit">탈퇴하기</button>
                </div>
            </form>

        </div>
    );
};


export default MemberDelete;