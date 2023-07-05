import React, {useEffect} from 'react';
import './LyricsModal.css';

const LyricsModal = ({show, handleClose, lyrics}) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [show, handleClose]);

    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal" onClick={handleModalClick}>
            <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
                <pre>{lyrics}</pre>
            </div>
        </div>
    );
};

export default LyricsModal;
