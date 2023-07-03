import mainlogo from '../imgs/logoooo.png';
import {HiTrendingUp} from "react-icons/hi"
import {HiOutlineTrophy} from "react-icons/hi2";
import {PiChatsCircleLight} from "react-icons/pi";
import {BsPersonSquare} from "react-icons/bs";
import {RiEmotionLine} from "react-icons/ri";
import "./LoginMenuBar.css";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import React from "react";

const MenuBar = () => {
    return (
        <div className="menubar">
                <Link to="/">
                    <img className="logo-png" alt= "HITTER" src={mainlogo}/>
                </Link>

                <nav className="menulist">
                    <ul className="menutexts">
                        <Link to="/hit">
                            <Button className="menu-hit">
                                <div className="parent-icon-hit">
                                    <HiTrendingUp className='icon-hit' size="20" />
                                    HIT
                                </div>
                            </Button>
                        </Link>

                        <Link to="/leaderboard">
                            <Button className="menu-lb">
                                <div className="parent-icon-lb">
                                    <HiOutlineTrophy size="20"/>
                                    LEADERBOARD
                                </div>
                            </Button>
                        </Link>

                        <Link to="/board">
                            <Button className="menu-commu">
                                <div className='parent-icon-com'>
                                    <PiChatsCircleLight size="20"/>
                                    COMMUNITY
                                </div>
                            </Button>
                        </Link>

                        <Link to="/member/mypage">
                            <Button className="menu-mypage">
                                <div className='parent-icon-mp'>
                                    <BsPersonSquare size="20"/>
                                    MYPAGE
                                </div>
                            </Button>
                        </Link>

                        <Link to="/logout">
                            <Button className="menu-logout">
                                <div className="parent-icon-logout">
                                    <RiEmotionLine size="20"/>
                                    LOGOUT
                                </div>
                            </Button>
                        </Link>
                    </ul>


                </nav>
        </div>
    )
}
export default MenuBar;