import React from "react";
import './HowToUse.css'
import MenuBar from "../../component/MenuBar";
import BackColor from "../../component/BackColor";
import Rimg from "../../imgs/react.svg";
import Timg from "../../imgs/tensorflow.svg";
import Jimg from "../../imgs/java.svg";
import SingSong from "../../imgs/singasong.jpg";
import CompanyL from "../../imgs/com-logo.png"
import Equal from "../../imgs/equal.png"
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const HowtoUse = () => {
    const inputForm = useRef();
    const navigate = useNavigate();
    const onMoveToForm = () => {
        // inputForm.current.scrollIntoView({behavior: 'smooth', block: 'start'}); };
        navigate("/howtouse")
    }

    return (
        <div className='home-page'>
            <section className='header'>
                <div className='header-title'>
                    <h1 className='main-msg'>HITTER</h1>
                    <p className='explain-main'> Predict Music Hit based on AI </p>
                    <button className='about-us' onClick={onMoveToForm}>About Us</button>
                </div>
            </section>

           <h3>HITTER</h3>
            이 페이지는 HITTER 사용법과 ㅇㅇㅇ에 대하여 안내합니다.

            <hr></hr>
            <h3>서비스 안내</h3>
                HITTER는 ㅇㅇㅇㅇ 기술을 사용하여 사용자가 업로드한 음악을 제공합니다.
                사용자는 mp3파일과 txt파일을 업로드하고 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ. <br />

                HITTER는 모바일/ PC 웹 환경 어디서는 이용 가능합니다.<br />

                당신의 음악을 올리고싶다면 hit 으로 이동하세요(링크걸기) .
            <hr></hr>
            <h3>사용 방법 안내</h3>
            테스트 하러가기



            <footer className='bottom'>
                <div className='fo-container'>
                    <div className='left'>
                        <img className='bottom-logo' src={CompanyL}/></div>
                    <div className='right-coms'>
                        <div className='coms-list'>
                            <h2 className='connect'>CONTACT</h2>
                            <ul className='connect-list'>
                                <li className='contact'>Yewon Kim - feb_ye@naver.com</li>
                                <li className='contact'>이름메일</li>
                                <li className='contact'>이름메일</li>
                                <li className='contact'>이름메일</li>
                                <li className='contact'>이름메일</li>
                                <li className='contact'>이름메일</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <p className='copp'>
                        저작권 어쩌고저쩌고
                    </p>
                </div>
            </footer>
        </div>

    );

};


export default HowtoUse;
