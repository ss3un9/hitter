import React from "react";
import "./MyPage.css"
import MyBar from "../../component/MypageBar"

const Mypage = ({session}) => {

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    return (
        <div className='main'>
            <MyBar/>
            <div className='mpg-txt'>
                안녕하세요! 이곳은 마이페이지 입니다.
                <br></br>
                이동하기 원하는 메뉴틀 클릭하세요.
            </div>
        </div>


    )
}
export default Mypage;
