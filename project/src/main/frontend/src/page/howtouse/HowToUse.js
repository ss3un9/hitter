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
        navigate("/hit")
    }

    return (
        <div className='home-page'>
            <section className='header'>
                <div className='header-title'>
                    <h1 className='main-msg'>HITTER</h1>
                    <p className='explain-main'> Predict Music Hit based on AI </p>
                    <button className='about-us' onClick={onMoveToForm}>Let's HIT!</button>
                </div>
            </section>
            <div className='how-wrapper'>
            <p className='neyong'>
                <br/>
            HITTER에 처음 오신 여러분, 환영합니다!
                <br></br>
            이 페이지는 HITTER의 서비스 안내 및 사용 방법에 대해 설명합니다.
                <br></br>
            추가적인 문의사항이 있다면 하단의 이메일 주소로 메일을 보내주세요.
            </p>
            <div className='lineee'></div>
            <h2 className='service-info'>서비스 안내</h2>
            <p className='service-ne'>
                HITTER는 2010년대 댄스/발라드/팝 장르 음원을 바탕으로 학습되어 있습니다.
                <br></br>
                히트 예측 결과는 학습된 데이터 기반으로 산출되는 결과물이며, 음원을 평가하는 하나의 지표로 사용될 수 있습니다.
                <br></br>
                HITTER의 사용에 대한 결과 데이터는 전적으로 사용자의 책임 하에 있으며,
                <br/>
                이에 따른 컨텐츠의 사용으로 발생하는 저작권 침해 등에 관한 책임은
                <br/>
                모두 사용자에게 있습니다.
                <br/>
            </p>
                <div className='lineee'></div>
            <h2 className='info-use'>사용 방법 안내</h2>
            <p className='use-pg'>
                회원 가입 후 로그인까지 마치셨다면, HITTER를 시작해볼 시간입니다!
                <h3 className='h3h3'>1. 상단 메뉴바의 HIT으로 이동하기</h3>
                <h3 className='h3h3'>2. 음원(.mp3) 파일과 가사(.txt) 파일을 업로드하기</h3>
                <h3 className='h3h3'>3. 결과 확인하기</h3>
                이후 리더보드 및 마이페이지에서 업로드한 곡을 확인할 수 있으며,
                <br/>
                다른 사용자가 업로드한 곡 또한 들어볼 수 있습니다.
                <br/>
                커뮤니티를 통해 여러 사용자와 교류해보세요!
                <br/>
                그럼, HITTER에서 즐거운 시간 보내시기 바랍니다.
            </p>
            </div>


            <footer className='bottom'>
                <div className='fo-container'>
                    <div className='left'>
                        <img className='bottom-logo' src={CompanyL}/></div>
                    <div className='right-coms'>
                        <div className='coms-list'>
                            <h2 className='connect'>CONTACT</h2>
                            <ul className='connect-list'>
                                <li className='contact'>Yewon Kim - feb_ye@naver.com</li>
                                <li className='contact'>Youngjun Jo - j00jun924@gmail.com </li>
                                <li className='contact'>Hyun Kim - hyunonblue@naver.com</li>
                                <li className='contact'>Nuri Kim - nu_r_i@naver.com </li>
                                <li className='contact'>Seokwon Kim - ksw5994@naver.com</li>
                                <li className='contact'>Seunghyeon Park - ss3un9@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <p className='copp'>
                        Copyright 2023. HITTER inc. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>

    );

};


export default HowtoUse;
