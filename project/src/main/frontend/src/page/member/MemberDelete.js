import React from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import MypageBar from "../../component/MypageBar";



const MemberDelete = ({}) => {


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
                if (response.status === 200) {
                    alert("탈퇴되었습니다 ");
                    navigate("/member/logout")

                } else {
                    alert("탈퇴 중 오류가 발생했습니다. 다시 시도해주세요 ");
                }
            } catch (error) {
                alert("탈퇴 실패. 다시 시도해주세요 ");
            }
        }
    };

    return (

        <>
            <MypageBar/>
            <form onSubmit={handleSubmitDelete}>
                <span> 회원 탈퇴 신청 </span> <br/>

                유의사항 1. 회원탈퇴하면 곡이 전부 삭제됨 <br/>
                2. 게시글 삭제됨 <br/>
                3. 123123123123 <br/>
                <button type="submit">탈퇴하기</button>
            </form>

        </div>
    );
};


export default MemberDelete;