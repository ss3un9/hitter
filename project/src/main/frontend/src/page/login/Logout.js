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
                console.error('로그아웃 중 에러 발생:', error);
                // 에러 처리 로직 작성
            }
        };

        handleLogout();
    }, [navigate]);

};

export default Logout;
