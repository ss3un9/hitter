import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikeButton = ({ memberId, songId, isLiked, likeId}) => {
    const [liked, setLiked] = useState(isLiked);

    const [buttonLikeId, setButtonLikeId] = useState(likeId);
    const handleLikeClick = () => {
        setLiked(!liked);
        const likeEndpoint = `/song/like/${memberId}/${songId}`;
        const unlikeEndpoint = `/song/unlike/${buttonLikeId}/${songId}`;
        const apiUrl = liked ? unlikeEndpoint : likeEndpoint;

        if (liked) {
            axios
                .delete(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('성공');
                    setLiked(false);
                    setButtonLikeId(null);

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            axios
                .post(apiUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log(response);
                    setLiked(true);
                    setButtonLikeId(response.data.likeDTO.id);

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };



    useEffect(() => {

    }, []); // Call fetchSongLike only once after mounting

    return (
        <button onClick={handleLikeClick}>
            {liked ? 'Unlike' : 'Like'}
        </button>
    );
};

export default LikeButton;