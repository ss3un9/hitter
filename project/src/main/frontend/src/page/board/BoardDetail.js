import React from "react";
// import { useEffect } from "react";


const BoardDetail = () => {
    return (
        <>
        <table>
            <tr>
                <th>순번</th>
                {/* <td text="${board.id}"></td> */}
            </tr>
            <tr>
                <th>제목</th>
                {/* <td text="${board.boardTitle}"></td> */}
            </tr>
            <tr>
                <th>작성자</th>
                {/* <td text="${board.boardWriter}"></td> */}
            </tr>
            <tr>
                <th>date</th>
                {/* <td text="*{#temporals.format(board.boardCreatedTime, 'yyyy-MM-dd HH:mm:ss')}"></td> */}
            </tr>
            <tr>
                <th>조회수</th>
                {/* <td text="${board.boardHits}"></td> */}
            </tr>
            <tr>
                <th>내용</th>
                {/* <td text="${board.boardContents}"></td> */}
            </tr>

        </table>
        <button onclick="listReq()">목록</button>

        <button onclick='updateReq()'>글수정</button>
        <button onclick="deleteReq()">삭제</button>
        </>
    )
}


export default BoardDetail;