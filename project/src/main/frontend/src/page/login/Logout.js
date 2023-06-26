import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await fetch('/member/logout', {
                    method: 'POST',
                    credentials: 'include', // 쿠키 전송을 위해 필요한 옵션
                });
                localStorage.removeItem('session');
                console.log(localStorage);
                navigate('/');
            } catch (error) {
                console.error('로그아웃 중 에러 발생:', error);
                // 에러 처리 로직 작성
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
};

export default Logout;
