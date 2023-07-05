import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await fetch('/member/logout', {
                    method: 'POST',
                });
                localStorage.removeItem('session');
                console.log(localStorage);
                navigate('/');
                window.location.reload();
            } catch (error) {
                alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요")
            }
        };

        handleLogout().catch(error => {
            alert("로그아웃 실패. 다시 시도해주세요")
        });
    }, [navigate]);
};

export default Logout;
