import React, {useEffect, useState} from 'react';
import './play.css';
import Loading from '../../component/Loading';

const SongPlayer = ({songId}) => {
    const [audioUrl, setAudioUrl] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/song/play/${songId}`)
            .then((res) => res.blob())
            .then((blob) => URL.createObjectURL(blob))
            .then((url) => {
                setAudioUrl(url);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [songId]);


    return (
        <div className="audio-container">
            {isLoading ? (
                <Loading/>
            ) : (
                audioUrl && (
                    <audio className="audio-player" controls>
                        <source src={audioUrl} type="audio/mp3"/>
                        Your browser does not support the audio element.
                    </audio>
                )
            )}
        </div>
    );
};

export default SongPlayer;
