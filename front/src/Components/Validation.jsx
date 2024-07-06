import React, { useEffect } from 'react'
import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';

const Validation = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userData'));
        // console.log(data.token)
        if(data){
            console.log(data.token)
            navigate('/home');
        }
        else{
            navigate('/register');
        }
    },[]);
    return (
        <div style={{ display: 'flex', background: 'black', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
            <div>
                <Loader type="circle" bgColor={'#ffc107'} color={'white'} size={100} />
            </div>
        </div>
    )
}

export default Validation