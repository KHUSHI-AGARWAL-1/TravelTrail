import React, { useEffect, useState } from 'react'
import './CSS/Profile.css';
import Navbar from './Navbar'
import Modal from './Modal'
import userPic from '../Images/userpic.jpg'
import axios from 'axios'
import { BASE_URL } from '../mydetails'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Oval from "react-js-loader";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [loginData, setLoginData] = useState(undefined);
    const [load, setLoad] = useState(false);
    const [myPosts, setMyPosts] = useState(undefined);


    const navigate = useNavigate();
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        let uid = data.response._id;
        // console.log(data)
        getAllPosts(uid)
        setLoginData(data.response);
    }, []);

    const getAllPosts = async (uid) => {
        try {
            const response = await axios.get(`${BASE_URL}/userpost/${uid}`);
            console.log("res", response.data.response)
            setMyPosts(response.data.response)
        }
        catch (e) {
            console.log(e);
            alert('Please check your Network connection')
        }
    }

    const [showModal, setShowModal] = useState({});
    const handleModal = (postId) => {
        setShowModal(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-head">
                        <img src={userPic} style={{ width: '100px', height: '100px', borderRadius: '150px', marginRight: '15px' }} alt="" />
                        <div className="profile-info">
                            <h4 style={{ color: 'white' }}>{loginData ? loginData.name : ''}</h4>
                            <h5 style={{ color: 'gray' }}>{loginData ? loginData.user_name : ''}</h5>
                            <p style={{ color: 'gray' }}>{loginData ? loginData.email : ''}</p>
                        </div>

                    </div>
                    <div className="profile-mid">
                        <button className="logout butn text-decoration-none text-white" onClick={() => { localStorage.clear(); toast.success('Logout Successfully'); navigate('/'); }}>Logout</button>
                    </div>
                    <div className="profile-footer">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p style={{ fontSize: 'x-large', color: 'white' }}>My Posts</p>
                            <p style={{ fontSize: 'large', color: 'white' }}>{myPosts ? myPosts.length + ' Posts' : 0 + ' Post'}</p>
                        </div>
                        <div className="myposts">
                            {myPosts ? myPosts.map((data, index) => {
                                return <div key={index}>
                                    <div className='pst' onClick={() => handleModal(data._id)}>
                                        <img className='img' src={`${BASE_URL}/show-photo/${data._id}`} alt="" />
                                    </div>

                                    <Modal
                                        date={new Date(data.date_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        show={showModal[data._id] || false}
                                        handleClose={() => handleModal(data._id)}
                                        userPic={userPic}
                                        username={data.userId.user_name}
                                        bgImg={`${BASE_URL}/show-photo/${data._id}`}
                                        postDesc={data.desc}
                                        postId={data._id}
                                        userId={loginData._id}
                                        getAllPosts={getAllPosts}
                                    />

                                </div>
                            }) : (<div className='text-center'
                                style={{ marginTop: '0px', display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 15, width: '560px', height: '250px' }}>
                                <div>
                                    <Oval
                                        visible={true}
                                        height="80"
                                        width="80"
                                        color="#4fa94d"
                                        ariaLabel="oval-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
