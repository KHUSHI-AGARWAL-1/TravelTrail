import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './CSS/Navbar.css'


const Navbar = () => {
    const [loginData, setLoginData] = useState(undefined);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        setLoginData(data.response);
    }, []);

   
    const location = useLocation();
    let nav = document.querySelector(".navbar");
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 50)
            nav.classList.add("navbar-scrolled");
        else
            nav.classList.remove("navbar-scrolled");
    }
    return (
        <>
            <nav className="navi navbar navbar-expand-lg navbar-light ">
                <h1 className='title'>
                    <NavLink to='/home' className="abc">TravelTrail</NavLink>
                </h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className=" nav-link" to="/create">
                                <div className='create p-0'>
                                    <div className='plus-icon'>
                                       
                                    </div>
                                    <p style={{ fontSize: 'large', margin: 'auto', color: location.pathname === '/create' ? '#ffc107' : 'white' }}>create +</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                <div className="profile p-0">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <p className='name-icon my-auto'>{loginData ? loginData.name.charAt(0) : ''}</p>
                                    </div>
                                    <p className='my-0' style={{ color: '#AFAFAF' }}>{loginData ? loginData.name.split(' ')[0] : ''}</p>
                                </div>
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
