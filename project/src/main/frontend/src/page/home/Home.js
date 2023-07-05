import React from "react";
import './Home.css'
import Rimg from "../../imgs/react.svg";
import Timg from "../../imgs/tensorflow.svg";
import Jimg from "../../imgs/java.svg";
import SingSong from "../../imgs/singasong.jpg";
import CompanyL from "../../imgs/com-logo.png"
import Equal from "../../imgs/equal.png"
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const inputForm = useRef();
    const navigate = useNavigate();
    const onMoveToForm = () => {
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

            <section className='intro' ref={inputForm}>
                <div className='card'>
                    <img className='react' src={Rimg}/>
                    <h1 className='react-logo'>REACT</h1>
                    <p className='react-exp'>오픈소스 자바스크립트 라이브러리</p>
                </div>
                <div className='card'>
                    <img className='tensorflow' src={Timg}/>
                    <h1 className='tensorflow-logo'>TENSORFLOW</h1>
                    <p className='tensorflow-exp'>오픈소스 기계학습 라이브러리</p>
                </div>
                <div className='card'>
                    <img className='java' src={Jimg}/>
                    <h1 className='java-logo'>JAVA</h1>
                    <p className='java-exp'>오라클의 객체 지향 프로그래밍 언어</p>
                </div>
            </section>


            <section className='service-intro'>
                <div className='s-container'>
                    <div className='exp-img'>
                        <img className='person' src={SingSong} alt='pes'/>
                    </div>
                    <div className='exp-txt'>
                        <h1 className='behitter'>BE HITTER</h1>
                        <p className='be-exp'>
                            HITTER의 AI는 수많은 히트곡을 분석합니다.
                            <br></br>
                            학습된 데이터를 바탕으로 음원의 히트 가능성을 예측합니다.
                        </p>
                    </div>
                </div>
            </section>

            <section className='service-intro2'>
                <div className='s-container2'>
                    <div className='exp-txt2'>
                        <h1 className='behitter2'>Simple HITTER</h1>
                        <p className='be-exp2'>
                            HITTER는 간단합니다.
                            <br></br>
                            음원의 mp3 파일과 가사를 업로드하세요.

                        </p>
                    </div>
                    <div className='exp-img2'>
                        <img className='person2' src={Equal} alt='equalizer'/>
                    </div>
                </div>
            </section>

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


export default Home;
