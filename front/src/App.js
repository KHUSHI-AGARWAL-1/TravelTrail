import React from 'react';
import './App.css';
import Registration from './Components/Registration';
import { Route,Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import CreatePost from './Components/CreatePost';
import Profile from './Components/Profile';
import Comment from './Components/Comment.jsx'
import { ToastContainer } from 'react-toastify';
import Validation from './Components/Validation.jsx';

function App() {
  return (
    <div className="App">
      {/* <Registration/> */}
      <Routes>
        <Route exact path='/' Component={Validation} />
        <Route exact path='/home' Component={HomePage} />
        <Route exact path='/create' Component={CreatePost} />
        <Route exact path='/profile' Component={Profile} />
        <Route exact path='/comment' Component={Comment}/>
        <Route exact path='/register' Component={Registration} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
