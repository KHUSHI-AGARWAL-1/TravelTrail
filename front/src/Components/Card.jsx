import React, { useState } from 'react'
import './CSS/Card.css'
import heart from '../Images/heart.png';
import comment from '../Images/comment.png'
import redHeart from '../Images/heart (1).png';
import Comment from './Comment';
import { BASE_URL } from '../mydetails';
import axios from 'axios';

const Card = ({ userPic, username, bgImg, postDesc, likes, date, userId, postId, fromProfile, handleClose, getAllPosts }) => {
    const [isliked, setIsLiked] = useState(false);
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [allComments, setAllComments] = useState(undefined);
  

    const getComments = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/allcomments/${postId}`);
            console.log(response.data.response);
            setAllComments(response.data.response)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={`cards ${fromProfile ? 'from-profile' : ''}`}>
                <div className={`card ${clicked ? 'clicked-style' : ''}`} onClick={() => setClicked(!clicked)}>
                    <div className="card-head">
                        <div className='user-head'>
                            <div className='user-pic'>
                                <img src={userPic} alt="Error" />
                            </div>
                            <div className="user-info">
                                <h5 style={{ color: 'white' }}>{username}</h5>
                                <p style={{ color: 'gray' }}>{date}</p>
                            </div>
                        </div>
                       
                    </div>
                    <div className='card-img'>
                        <img src={bgImg} alt="Error" />

                    </div>
                   
                    <div className="card-desc">
                    <h5>  Journey plan:</h5>
                        {postDesc}
                    </div> 
                    <div className='cardFooter'>
                        <div className="heart" >
                            <div>
                                {isliked ? <div onClick={() => setIsLiked(false)}>
                                    <img src={redHeart} alt="Error" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                </div> :
                                    <div onClick={() => setIsLiked(true)}>
                                        <img src={heart} alt="Error" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                    </div>}
                            </div>
                            <p>{likes}</p>
                        </div>
                        <div className='side-cmts' onClick={() => { setIsDisplayed(false); setIsDisplayed(!isDisplayed); getComments() }}>
                            <img src={comment} alt="Error" style={{ width: '30px', height: '30px' }} />
                        </div>
                    </div>
                </div>
                <div className={`comment-component ${isDisplayed ? 'comment-show' : ''}`}>
                    {
                        isDisplayed && <Comment
                            getComments={getComments}
                            handleClose={() => {
                                setIsDisplayed(!isDisplayed);
                                setClicked(!clicked)
                            }}
                            postId={postId}
                            userId={userId}
                            allComments={allComments} />
                    }
                </div>
            </div>
        </>
    )
}

export default Card;
