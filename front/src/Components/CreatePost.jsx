import React, { useEffect, useState } from 'react'
import './CSS/CreatePost.css'
import Navbar from './Navbar'
import cross from '../Images/close.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Oval from "react-js-loader";
import { BASE_URL } from '../mydetails';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [desc, setDesc] = useState('');
    const [loginData, setLoginData] = useState(undefined);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        setLoginData(data.response);
    }, []);
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleUpoad = async (e) => {
        try {
            setLoad(true);
            const formdata = new FormData()
            formdata.append('file', file)
            formdata.append('userId', loginData._id)
            formdata.append('desc', desc)
            console.log(file)
            // console.log(formdata)
            if (file.size > 1048576) {
                alert('Image should be lesser than 1 mb.');
                return;
            }
            const res = await axios.post(`${BASE_URL}/create-post`, formdata);
            console.log(res)
            setLoad(false);
            toast.success('Post Uploaded Succesfully');
            navigate('/home');


        }
        catch (e) {
            setLoad(false);
            toast.error('Error Uploading Post');
            console.log(e)
        }

    }

    return (
        <>
            <Navbar />
            <div className="create-post m-0 p-5 ">
                <div className="create-form">
                    <div className="d-flex justify-content-between ">
                        <h2 style={{ color: 'white' }}>Create Your Post</h2>
                        <NavLink to="/home"><img style={{ width: '25px', height: '25px', background: '#AFAFAF', padding: '5px', borderRadius: '5px' }} src={cross} alt="" /></NavLink>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label" style={{ color: 'white' }}>Add File</label>
                        <input style={{ backgroundColor: 'black' }} className="form-control p-0" type="file" id="formFile" onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="preview " style={{ backgroundColor: 'transparent' }}>
                        {file ? <img src={previewUrl} alt="" /> : <h4 style={{ color: '#AFAFAF' }}>Image Preview</h4>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label " style={{ color: 'white' }}>Share your plan</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" maxLength={150} rows="3" style={{ resize: 'none', backgroundColor: 'transparent', color: 'white' }} value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="butn btn btn-primary mx-auto" onClick={handleUpoad}>Post</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
            {load ? <div style={{ position: 'absolute', top: 0, display: 'flex', background: 'transparent', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
                <div style={{ marginTop: '100px' }}>
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
            </div> : null}
        </>
    )
}

export default CreatePost;