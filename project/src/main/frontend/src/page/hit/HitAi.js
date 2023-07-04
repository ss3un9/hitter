import React, { useEffect, useState } from "react";
import './HitAi.css'
import './HitAi.css'
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineUploadFile } from "react-icons/md";
import { BsMusicNote } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";
import band from "../../imgs/band.jpg"
import Loading from '../../component/HitLoding';



import hitAiDetail from "./HitAiDetail";
function Select() {
    return null;
}

const HitAi = ({ session }) => {


    const storedSession = JSON.parse(localStorage.getItem('session')) || {};

    const [uploadResponse, setUploadResponse] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("none");
    const [songTitle, setSongTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);

            const formData = new FormData(event.target);
            formData.append("genre", selectedGenre);
            formData.append("title", songTitle);

            const response = await fetch("/api/upload", {
                method: "POST",

                body: formData,
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUploadResponse(data);
                setIsLoading(false);

                alert("히트 분석 성공 ");
            } else {
                // 로그인 실패

                console.error('failed',error);

            }
        } catch (error) {
            // 오류 처리
            alert("파일을 등록해주세요");
        }
    };

    useEffect(() => {
        if (uploadResponse && uploadResponse.songDTO) {
            const id = uploadResponse.songDTO.id;
            console.log(uploadResponse);
            // 폼을 제출한 후에 분석 결과를 받은 뒤에 hitdetail로 이동
            navigate(`/hit_ai_detail?id=${id}`);

        }
    }, [uploadResponse, navigate]);

    return (
        <div className='page-whole'>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <form className='hit-form' method="post" onSubmit={handleFormSubmit}>
                <img className='bd' src={band} alt='band' />
                <h2 className='hit-text'>당신의 곡의 히트성 점수는 몇점일까요?<br></br>
                    AI 기반 예측 모델로 히트성을 측정해보세요!
                </h2>
                <div className='g3'>
                    <select className='options' name="genres" id="genres" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value={"none"} className='base' selected={false} disabled={true}>GENRE</option>
                        <option value="pop"><BsMusicNote className='BsMusicNote' />POP</option>
                        <option value="dance"><BsMusicNoteBeamed className='BsMusicNoteBeamed' />DANCE</option>
                        <option value="ballad"><GiMusicalNotes className='GiMusicalNotes' />BALLAD</option>
                    </select>
                </div>
                <br></br>
                <div className='mp3-container'>
                    <label className='choose' htmlFor="music">Choose a music(.mp3) file</label>
                    <br></br><br></br>
                    <input className='file' type="file" id="music" name="file" accept="audio/*" />
                </div>
                <div className='txt-container'>
                    <label className='choose-txt' htmlFor="txt">Choose a lyric(.txt) file</label>
                    <br></br><br></br>
                    <input className='txt' type="file" id="text" name="file1" accept="text/*" />
                </div>
                <input className='title'
                    type="text"
                    id="title"
                    name="songTitle"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="노래 제목을 입력하세요"
                />
                <br></br>


                <input className='ub' type="submit" value={"Upload"} />
                {isLoading && (
                    <div className="loading-container">
                        <Loading />
                        <div className="loading-text">분석중입니다. 잠시만 기다려주세요</div>
                    </div>
                )}


            </form>

            <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    )
}


export default HitAi;