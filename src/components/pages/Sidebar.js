import React from 'react';
import '../css/sidebar.css';
import ProfileSnapShot from '../ProfileSnapShot'; 
import CustomLink from '../router/Custom_link';
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
import { context } from '../Context/context';
import { useContext } from 'react';

export default function Sidebar() {
// const navigate =useNavigate();
//context
let {Logout} = useContext(context);

  //logout 
  const handleLogoutClick = (e)=>{
    e.preventDefault();
    // const auth = getAuth();
    // signOut(auth).then(() => {
    //   console.log("Sign-out successful"); 
    //   navigate('/login')
    // }).catch((error) => {
    //   console.log("An error happened."); 
    // });
    Logout();
  }
  


  return (
  
    <div className='sidebar'>
        <div className='logo'>
          <i className="fab fa-twitter"></i>
        </div>
        <div className='navigation'>
            <div className="list-group">
              
          <CustomLink to='/home' className='custom_link'>
              <label className="list-group-item">
                <i className="fas fa-home"></i>
                Home
              </label>
          </CustomLink>

          <CustomLink to='/explore' className='custom_link explore_link'>
              <label className="list-group-item">
              <i className="fas fa-hashtag"></i>
                Explore
              </label>
          </CustomLink>

          <CustomLink to='/notification' className='custom_link notification_link'>
              <label className="list-group-item">
              <i className="far fa-bell"></i>
                Notification
              </label>
          </CustomLink>
              
          <CustomLink to='/message' className='custom_link message_link'>
              <label className="list-group-item">
              <i className="far fa-envelope"></i>
                Message
              </label>
            </CustomLink>

            <CustomLink to='/bookmark' className='custom_link'>
              <label className="list-group-item">
              <i className="far fa-bookmark"></i>
                Bookmarks
              </label>
            </CustomLink>

            <CustomLink to='/list' className='custom_link list_link'>
              <label className="list-group-item ">
              <i className="far fa-list-alt"></i>
                List
              </label>
            </CustomLink>
              
            <CustomLink to='/profile' className='custom_link'>
              <label className="list-group-item">
              <i className="fas fa-user"></i>
                Profile
              </label>
            </CustomLink>

            <CustomLink to='' className='custom_link' onClick ={handleLogoutClick}>
              <label className="list-group-item">
              <i className="fas fa-sign-out-alt"></i>
                Logout
              </label>
            </CustomLink>
            </div>
        </div>
        <br/>
        <button className='tweet_button'>Tweet</button>
        <ProfileSnapShot/>
    </div>
  );
}
