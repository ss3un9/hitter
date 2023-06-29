import React from "react";
import './Index.css'
import img1 from './img/01.jpg'
import img2 from './img/02.jpg'
import img3 from './img/03.jpg'

const Index = ({ session }) => {

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    return (
        <>
            {/* <!-- Navigation--> */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">HITTABLE</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="/member/hit_ai">Hit</a></li>
                            <li className="nav-item"><a className="nav-link" href="/song/board">Leader Board</a></li>
                            <li className="nav-item"><a className="nav-link" href="/board">Community</a></li>
                            <li className="nav-item">
                                {storedSession.loginName != null && (
                                    <a className="nav-link" href="/member/mypage">
                                        <p>{storedSession.loginName}</p>
                                    </a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName != null ? (
                                    <a className="nav-link" href="/member/logout">로그아웃</a>
                                ) : (
                                    <a className="nav-link" href="/member/save">Sign Up</a>
                                )}
                            </li>
                            <li className="nav-item">
                                {storedSession.loginName == null && (
                                    <a className="nav-link" href="/member/login">Log In</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <!-- Header--> */}
            <header className="masthead text-center text-white">
                <div className="masthead-content">
                    <div className="container px-5">
                        <h2 className="masthead-subheading mb-0">HITTABLE</h2>
                        <h3 className="masthead-subsubheading mb-0">딥러닝 모델을 활용해 히트 확률을 예측하는 서비스.<br></br>
                            이를 활용해 음악 제작자나 음악 비즈니스 관계자들이 향후 트렌드에 맞는 음악을 준비하는 데 도움을 줄 수 있습니다.</h3>
                        <a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Learn More</a>
                    </div>
                </div>
            </header>

            {/* <!-- Content section 1--> */}
            <section id="scroll">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img1} alt="..." />
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4">내 음원의 히트 확률 예측</h2>
                                <p>히트 확률을 예측하는 서비스를 이용해 내가 작곡한 음원의 흥행 여부를 알아보아요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Content section 2--> */}
            <section>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img2} alt="..." />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <h2 className="display-4">내 음원의 히트 확률 랭킹</h2>
                                <p>사이트 사용자들이 등록한 음원들끼리 확률을 비교해봐요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Content section 3--> */}
            <section>
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" src={img3} alt="..." />
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-5">
                                <h2 className="display-4">사용자간의 원활한 소통</h2>
                                <p>사이트의 여러 사용자들과 서로 의견을 나눠봐요</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Footer--> */}
            <footer className="py-5 bg-black">
                <div className="container px-5">
                    <p className="m-0 text-center text-white small">Copyright &copy; Your Website 2023</p>
                </div>
            </footer>
        </>
    )
}

export default Index;
