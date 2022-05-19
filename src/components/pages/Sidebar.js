import React from 'react';
import '../css/sidebar.css';
import ProfileSnapShot from '../ProfileSnapShot'; 
import CustomLink from '../router/Custom_link';
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate, Navigate } from 'react-router-dom';
import { context } from '../Context/context';
import { useContext, useRef, useState } from 'react';

export default function Sidebar() {
  //states
  // const [iSmall, setIsMall] = useState(true);
  // const [screenSize, setScreenSize] = useState('largeScreen');
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
const ref = useRef();
const ref2 = useRef();
//context
let {Logout} = useContext(context);

  //logout 
  const handleLogoutClick = (e)=>{
    e.preventDefault();
    Logout();
  }


  //MONITOR VIEWPORT SIZE
  window.addEventListener('resize', ()=>{
    setViewportWidth(window.innerWidth)
  }) 

//handle the display when on small screen
  const handleNavBarToggle = (e)=>{
    e.preventDefault()
    
  }
  


  return (
    <div className='sidebar'>
        <div className='logo'>
          <i className="fab fa-twitter"></i>
        </div>
        <div ref ={ref} className='navigation'>
            <div ref ={ref2} className="list-group">
                    
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
{/* 
        <CustomLink to='' className='custom_link hamburger' onClick ={handleNavBarToggle}>
              <label className="list-group-item">
              <i className="fas fa-light fa-bars"></i>
             
              </label>
        </CustomLink> */}
       
      
        {/* <button className='tweet_button'>Tweet</button> */}
        <ProfileSnapShot/>
    </div>
    
  );
}
