import mainlogo from '../imgs/logoooo.png';
import {HiTrendingUp} from "react-icons/hi"
import {HiOutlineTrophy} from "react-icons/hi2";
import {PiChatsCircleLight} from "react-icons/pi";
import {BsPersonFillAdd} from "react-icons/bs";
import {RiEmotionLine} from "react-icons/ri";
import "./MenuBar.css";
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import React from "react";
const MenuBar = () => {
    return (
        <div className="menubar-login">
                <Link to="/">
                    <Button className="logo">
                        <img className="logo-png" alt= "HITTER" src={mainlogo}/>
                    </Button>
                </Link>

                <nav className="menulist">
                    <ul className="menutexts">
                        <Link to="/login">
                            <Button className="menu-hit">
                                <div className="parent-icon-hit">
                                    <HiTrendingUp className='icon-hit' size="20" />
                                    HIT
                                </div>
                            </Button>
                        </Link>

                        <Link to="/song/board">
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

                        <Link to="/signup">
                            <Button className="menu-signup">
                                <div className='parent-icon-su'>
                                    <BsPersonFillAdd size="20"/>
                                    SIGN UP
                                </div>
                            </Button>
                        </Link>

                        <Link to={"/login"}>
                            <Button className="menu-login">
                                <div className="parent-icon-login">
                                    <RiEmotionLine size="20"/>
                                    LOGIN
                                </div>
                            </Button>
                        </Link>
                    </ul>


                </nav>
        </div>
    )
}
export default MenuBar;