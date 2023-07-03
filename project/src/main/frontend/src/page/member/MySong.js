import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./MySong.css"
import MypageBar from "../../component/MypageBar";
const MySong = ()  => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};
    const navigate = useNavigate();
    const id = storedSession.loginId;

    const [mySongList, setMySongList] = useState([]);


    const fetchData = async () => {
        try {


            const response = await axios.get(`/member/getMySong/${id}`);
            console.log(response)
            const {data} = response;
            console.log(data);
            setMySongList(data);



        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);

        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            (
            <div className='tbl-bar'>
                <div className= 'bar'>
                    <MypageBar/>
                    <div className='table'>
                        <table className='song-table'>
                            <thead className='table-head'>
                                <tr className='table-tr'>
                                    <th className='th'>ID</th>
                                    <th className='th'>Song Title</th>
                                    <th className='th'>Genre</th>
                                    <th className='th'>CreatedTime</th>
                                    {/* Add more table headers for other properties */}
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                            {mySongList.map((song) => (
                                <tr key={song.id}>
                                    <td className='td'>{song.id}</td>
                                    <td className='td'>{song.songTitle}</td>
                                    <td className='td'>{song.genre}</td>
                                    <td className='td'>{song.songCreatedTime.replace("T", " ")}</td>
                                    {/* Render additional table cells for other properties */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default MySong;