import React from "react";
import photo from "../imgs/profile.png";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {BsPencilSquare} from "react-icons/bs";
import {GiMusicalNotes} from "react-icons/gi";
import {FaChalkboardUser, FaRegFaceSadTear} from "react-icons/fa6";
import "./MypageBar.css"


const MyBar = () => {

    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const id = storedSession.loginId;
    return(
        <div className='wrap'>
            <div className="wrapping-design">
                <img className='profile-photo' alt= 'photo' src={photo}/>
                <div className='nickname'>Nickname</div>
                <div className='menu'>
                    <nav className='menu-bar'>
                        <ul className='all-texts'>
                            <Link to={`/member/update?id=${id}`} className="nav-link">
                                <Button className='hover-button'>
                                    <div className='info-corr'>
                                        <BsPencilSquare className="BsPencilSquare"/>
                                        회원 정보 수정하기
                                    </div>
                                </Button>
                            </Link>
                            <Link to="/member/mySong" className="nav-link">
                                <Button className='hover-button2'>
                                    <div className='info-song'>
                                        <GiMusicalNotes className="GiMusicalNotes"/>
                                        내 노래 조회하기
                                    </div>
                                </Button>
                            </Link>
                            <Link to="/member/myBoard" className="nav-link">
                                <Button className='hover-button3'>
                                    <div className='info-board'>
                                        <FaChalkboardUser className="FaChalkboardUser"/>
                                        내 게시판 조회하기
                                    </div>
                                </Button>
                            </Link>
                            <Link to="/member/delete" className="nav-link">
                                <Button className='hover-button4'>
                                    <div className='byebye'>
                                        <FaRegFaceSadTear className="FaRegFaceSadTear"/>
                                        회원 탈퇴하기
                                    </div>
                                </Button>
                            </Link>

                        </ul>
                    </nav>
                    {/*<div className='tmp-text'> Hello, Nickname! This is your mypage.</div>
                    <div> Enjoy HITTER's everything you want. </div>*/}
                </div>
            </div>

        </div>
    )
}

export default MyBar;