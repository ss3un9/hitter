import React, { useEffect } from 'react';
import './PlayerModal.css';
import SongPlayer from '../page/hit/play';

const PlayerModal = ({ show, handleClose, songId }) => {
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
  }, [show, handleClose, songId]);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="player-modal" onClick={handleModalClick}>
      <div className="player-modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <div>
          <SongPlayer songId={songId} />
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
