import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const BoardDelete = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let id;
    const searchParams = new URLSearchParams(location.search);
    id = parseInt(searchParams.get('id'));

    const handleDelete = async () => {
        try {
            await axios.get(`/board/delete/${id}`);
            alert("게시글이 삭제되었습니다 ");
            navigate('/board/paging?page=1');
        } catch (error) {
            alert("게시글이 삭제되지 않았습니다. 다시 시도해주세요. ");
        }
    };

    handleDelete().catch((error) => {
        console.error('Error during fetch:', error);
    });
};

export default BoardDelete;
