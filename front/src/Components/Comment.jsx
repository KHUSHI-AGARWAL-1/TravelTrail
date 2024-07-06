import React, { useState } from 'react'
import './CSS/Comment.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { BASE_URL } from '../mydetails'
import cross from '../Images/close.png';
import Oval from "react-js-loader";
import userPic from '../Images/userpic.jpg';

const Comment = ({ handleClose, userId, postId, allComments, getComments }) => {
    const [comment, setComment] = useState('');
    const uploadComment = async () => {
        const payload = {
            comment: `${comment}`,
            postId: `${postId}`,
            userId: `${userId}`
        };
        if (payload.comment === '') {
            toast.warning('Cannot add empty comment')
            return
        }

        try {
            const response = await axios.post(`${BASE_URL}/write-comment`, payload);
            toast.success('Comment added.')
            setComment('');
            getComments();

        }
        catch (e) {
            console.log(e)
            toast.error('Network Error.')
        }
    }

    return (
        <>
            <div className="comments-area">
                <div className="d-flex justify-content-between">
                    <h3 style={{ color: '#AFAFAF' }}>Add Your Comment</h3>
                    <div onClick={handleClose}>
                        <img style={{ width: '25px', height: '25px', background: '#AFAFAF', padding: '5px', borderRadius: '5px' }}
                            src={cross} alt="" />
                    </div>
                </div>
                <div className="addComment m-2">
                    <img className='dp' src={userPic} alt="" />
                    <div className="form-floating w-100 mx-3 d-flex flex-column">
                        <textarea className="form-control"
                            placeholder="Leave a comment here"
                            rows="3"
                            id="floatingTextarea"
                            style={{ resize: 'none', backgroundColor: '#262626', color: 'white' }}
                            value={comment}
                            onChange={(e) => { setComment(e.target.value) }}
                            required>
                        </textarea>
                        <button className="addCmt butn text-decoration-none text-center " style={{ fontSize: 'large', width: '150px' }} onClick={uploadComment}>Add Now</button>
                    </div>
                </div>

                <div className="comments">
                    <h6 style={{ color: 'white' }}>All Comments</h6>
                    {allComments ? (<div className="show-comment">
                        {allComments.length !== 0 ? allComments.map((cmt, idx) => {
                            return <div className="cmt" key={idx}>
                                <img src={userPic} style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '10px' }} alt="" />
                                <div className="cmt-info w-100 mx-3">
                                    <div className="line d-flex justify-content-between">
                                        <p style={{ color: 'gray' }}>{cmt.userId.user_name}</p>
                                        <p style={{ color: 'gray' }}>{new Date(cmt.date_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p style={{ color: 'white' }}>{cmt.comment}</p>

                                    </div>
                                </div>
                            </div>
                        }) : <p className='mt-4' style={{ color: 'gray', textAlign: 'center' }}>No Comments</p>}
                    </div>) :
                        (<div className='show-comment' style={{ marginTop: '100px', display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
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
        </>
    )
}

export default Comment;

































// import React from 'react'
// import dp from '../Images/logobg.jpg'
// import './CSS/Comment.css'
// import { NavLink } from 'react-router-dom'
// import cross from '../Images/close.png';


// const Comment = ({handleClose}) => {
//     const comments = [
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         }, {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         }, {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//     ]
//     return (
//         <>
//             <div className="comments-area">
//                 <div className="d-flex justify-content-between">
//                     <h3 style={{ color: 'darkgreen' }}>Add Your Comment</h3>
//                     <div onClick={handleClose}>
//                         <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px' }} src={cross} alt="" />
//                     </div>
//                 </div>
//                 <div className="addComment m-2">
//                     <img className='dp' src={dp} alt="" />
//                     <div className="form-floating w-100 mx-3 d-flex flex-column">
//                         <textarea className="form-control" placeholder="Leave a comment here" rows="3" id="floatingTextarea"
//                             style={{ resize: 'none' }}></textarea>
//                         {/* <label for="floatingTextarea">Comments</label> */}
//                         <NavLink className="addCmt butn text-decoration-none text-center " style={{ fontSize: 'large', width: '150px' }} to="/">Add Now</NavLink>
//                     </div>
//                 </div>
//                 <div className="comments">
//                     <h6>All Comments</h6>
//                     <div className="show-comment">
//                         {comments.map((cmt,idx) => {
//                             return <div className="cmt" key={idx}>
//                                 <img src={cmt.userpic} style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '10px' }} alt="" />
//                                 <div className="cmt-info w-100 mx-3">
//                                     <div className="line d-flex justify-content-between">
//                                         <p style={{ color: 'gray' }}>{cmt.username}</p>
//                                         <p>{cmt.date}</p>
//                                     </div>
//                                     <p>{cmt.comment}</p>
//                                 </div>
//                             </div>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Comment;
