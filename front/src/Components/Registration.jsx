import React, { useState } from 'react'
import './CSS/Registration.css'
import Oval from "react-js-loader";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../mydetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formState, setFormState] = useState('login');
  const [data, setData] = useState({ name: "", username: "", email: "", password: "" });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onClickHandler = (state) => {
    setFormState(state);
    setData({ name: "", username: "", email: "", password: "" });
  }

  const showPasswordHandler = (event) => {
    let checked = event?.target?.checked;
    setIsPasswordShown(checked);
  }

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: `${data.name}`,
      email: `${data.email}`,
      password: `${data.password}`,
      user_name: `${data.username}`
    };

    setLoad(true);
    try {
      const response = await axios.post(`${BASE_URL}/register`, payload);
      console.log(response);
      setLoad(false);
      toast.success('Account has been created successfully.')
      onClickHandler('login')
    }
    
    catch (error) {
      setLoad(false);
      console.log(error);
      if (error.response) {
        if (error.response.status === 422) {
          toast.error('Account already exist with this email.')
        }
        else if (error.response.status === 500) {
         
          toast.error('Internal Server error.')
        }
        else {
        
          toast.error('Network Error.')

        }
      }
      else {
        
        toast.error('Something went wrong.')

      }

    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      email: `${data.email}`,
      password: `${data.password}`
    };
    setLoad(true);
    try {
      const response = await axios.post(`${BASE_URL}/signin`, payload);
      console.log(response);
      setLoad(false);
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('cate', 'all');

      
      toast.success('Login successfully.')

      navigate('/home');
    }
    catch (error) {
      setLoad(false);
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          
          toast.error('Invalid login Credentials.');
        }
        else if (error.response.status === 500) {
          toast.error('Network Error');
        }
        else {
          toast.error('Network Error.');
        }
      } else {
        toast.error('Something went wrong.');
      }
    }
  };


  return (
    <>
      <div className='main'>
        <div className='empty'>
          <h1 className='name' >TravelTrail</h1>
          <h3>Where Adventure awaits</h3>
        </div>
        <div className='side'>


          {formState === "login" ? (
            <div className='box '>
              <div>
                <h2>Welcome Back</h2>
                <p>Please login to continue</p>
              </div>
              <form method='POST' className='.form ' onSubmit={(e) => { loginSubmitHandler(e) }}>
                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Email'
                    type="email"
                    id='email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Password'
                    type={isPasswordShown ? "text" : "password"}
                    id='password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    autoComplete='off'
                    required />
                </div>
                <div className='showNhidepass'>
                  <input
                    className='showPass inp'
                    type="checkbox"
                    autoComplete='off'
                    checked={isPasswordShown}
                    onChange={showPasswordHandler} />
                  {isPasswordShown ? <p>Hide Password</p> : <p>Show Password</p>}
                </div>
                <button className='butn' >Login</button>
                <p>Don't have an account?  <span onClick={() => onClickHandler('signup')}> Register</span></p>
               
              </form>
            </div>
          ) : (

            //Signup

            <div>
              <div>
                <h2>Welcome</h2>
                <p>Please enter your details</p>
              </div>
              <form method='POST' onSubmit={(e) => { signupSubmitHandler(e) }} className='.form '>
                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Name'
                    type="text"
                    id='name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Username'
                    type="text"
                    id='username'
                    name='username'
                    value={data.username}
                    onChange={handleChange}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Email'
                    type="email"
                    id='email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                   
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
              
                  <input
                    className='inp'
                    placeholder='Password'
                    type={isPasswordShown ? "text" : "password"}
                    id='password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>
                <div className='showNhidepass'>
                  <input
                    className='showPass inp'
                    type="checkbox"
                    autoComplete='off'
                    checked={isPasswordShown}
                    onChange={showPasswordHandler} />
                  {isPasswordShown ? <p>Hide Password</p> : <p>Show Password</p>}
                </div>

                <button className='butn' >Register</button>
                <p>Already have an account?  <span onClick={() => onClickHandler('login')}> Login</span></p>
              </form>
            </div>
          )}
        </div>
        {load ? <div style={{ display: 'flex', background: '#000000bf', position: 'absolute', top: '0', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
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
        </div> : null}
      </div>

    </>
  )
}

export default Registration;
