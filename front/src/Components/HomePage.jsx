import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Oval from "react-js-loader";
import Card from './Card';
import './CSS/HomePage.css'
import axios from 'axios';
import { BASE_URL } from '../mydetails';
import 'react-toastify/dist/ReactToastify.css';
import userPic from '../Images/userpic.jpg'

const HomePage = () => {
  const [loginData, setLoginData] = useState(undefined);
  const [myPosts, setMyPosts] = useState(undefined);

  useEffect(() => {
    getAllPosts();
    let data = JSON.parse(localStorage.getItem('userData'));
    setLoginData(data.response);
    // console.log(JSON.parse(localStorage.getItem('userData')))
  }, []);


  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/create-post`);
      console.log("ye rha:", response)
      setMyPosts(response.data.response)
    }
    catch (e) {
      console.log(e);
      alert('Please check your Network connection')
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <div >
          <div className="posts">
            {(myPosts && loginData) ? myPosts.map((data, index) => {
              return <Card key={index}
                date={new Date(data.date_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                userPic={userPic}
                username={data.userId.user_name}
                bgImg={`${BASE_URL}/show-photo/${data._id}`}
                postDesc={data.desc}
                postId={data._id}
                likes={data.likes}
                userId={loginData._id} />
            }) : (<div style={{ display: 'flex', background: 'transparent', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
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
    </>

  )
}

export default HomePage;


































// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar';
// // import Posts from './Posts';
// import Loader from "react-js-loader";
// import Card from './Card';
// import './CSS/HomePage.css'
// import axios from 'axios';
// import { BASE_URL } from '../mydetails';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const HomePage = () => {
//   const [loginData, setLoginData] = useState(undefined);
//   const [myPosts, setMyPosts] = useState(undefined);

//   useEffect(() => {
//     getAllPosts();
//     let data = JSON.parse(localStorage.getItem('userData'));
//     setLoginData(data.response);
//     // console.log(JSON.parse(localStorage.getItem('userData')))
//   }, []);

//     console.log(myPosts)


//   const getAllPosts = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/create-post`);
//       console.log(response.data.response[0]);
//       setMyPosts(response.data.response)
//     }
//     catch (e) {
//       console.log(e);
//       alert('Unable to fetch Posts.')
//     }
//   }

//   // const postData = [
//   //   {
//   //     userPic: '../Images/bg.jpg',
//   //     username: 'Shyama Agrawal',
//   //     bgImg: '../Images/bg.jpg',
//   //     postDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque nostrum totam ex reprehenderit. Necessitatibus fugiat quis quisquam eos, sapiente minus. Amet est facere sapiente, cumque obcaecati hic inventore architecto magnam.',
//   //     likes: '400'
//   //   },
//   //   {
//   //     userPic: '../Images/bg.jpg',
//   //     username: 'Shyama Agrawal',
//   //     bgImg: '../Images/bg.jpg',
//   //     postDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque nostrum totam ex reprehenderit. Necessitatibus fugiat quis quisquam eos, sapiente minus. Amet est facere sapiente, cumque obcaecati hic inventore architecto magnam.',
//   //     likes: '400'
//   //   },
//   //   {
//   //     userPic: '../Images/logobg.jpg',
//   //     username: 'Jayant sharma',
//   //     bgImg: '../Images/bgJ.jpg',
//   //     postDesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, esse vero ipsam quaerat numquam optio animi quos dicta magnam, labore necessitatibus tempore accusamus, magni nemo vitae soluta earum reprehenderit eius.',
//   //     likes: '420'
//   //   },
//   // ]

//   return (
//     <>
//       <Navbar />
//       {loginData&&myPosts? (<div>

//         <div >
//           <div className="posts">
//             {myPosts.map((data,index) => {
//               return <Card key={index} date={data.date_time} userPic={data.userPic} username={data.userId.user_name} bgImg={`${BASE_URL}/show-photo/${data._id}`} postDesc={data.desc} likes={data.likes} />
//             })}
//           </div>
//         </div>
//       </div>) : (<div style={{ display: 'flex', background: '#000000bf', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
//         <div>
//           <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={100} />
//         </div>
//       </div>)

//       }


//     </>

//   )
// }

// export default HomePage;
