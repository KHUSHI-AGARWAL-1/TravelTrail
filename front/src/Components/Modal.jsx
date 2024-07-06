import React from 'react'
import { useLocation } from 'react-router-dom';

import './CSS/Modal.css'
import Card from './Card'
import cross from '../Images/close.png';



const Modal = ({ handleClose, show, userPic, username, bgImg, postDesc, likes, date, postId, userId, getAllPosts }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const location = useLocation();


    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div onClick={handleClose}>
                    <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px', float: 'right' }} src={cross} alt="" />
                </div>
                <Card 
                    userPic={userPic}
                    username={username} bgImg={bgImg} postDesc={postDesc} likes={likes} date={date}
                    postId={postId}
                    userId={userId}
                    handleClose={handleClose}
                    fromProfile={location.pathname === '/profile' ? true : false}
                    getAllPosts={getAllPosts}/>
            </section>
        </div>
    );
};

export default Modal;
