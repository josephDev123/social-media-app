import React from 'react';
import '../css/sidebar.css';
import ProfileSnapShot from '../ProfileSnapShot'; 
import CustomLink from '../router/Custom_link';


export default function Sidebar() {
  return (
  
    <div className='sidebar'>
        <div className='logo'>
          <i className="fab fa-twitter"></i>
        </div>
        <div className='navigation'>
            <div className="list-group">
              
          <CustomLink to='/home' className='custom_link'>
              <label className="list-group-item">
                <i class="fas fa-home"></i>
                Home
              </label>
          </CustomLink>

          <CustomLink to='/explore' className='custom_link'>
              <label className="list-group-item">
              <i class="fas fa-hashtag"></i>
                Explore
              </label>
          </CustomLink>

          <CustomLink to='/notification' className='custom_link'>
          <label className="list-group-item">
              <i class="far fa-bell"></i>
                Notification
              </label>
          </CustomLink>
              
          <CustomLink to='/message' className='custom_link'>
              <label className="list-group-item">
              <i class="far fa-envelope"></i>
                Message
              </label>
            </CustomLink>

            <CustomLink to='/bookmark' className='custom_link'>
              <label className="list-group-item">
              <i class="far fa-bookmark"></i>
                Bookmarks
              </label>
            </CustomLink>

            <CustomLink to='/list' className='custom_link'>
              <label className="list-group-item ">
              <i class="far fa-list-alt"></i>
                List
              </label>
            </CustomLink>
              
            <CustomLink to='/profile' className='custom_link'>
              <label className="list-group-item">
              <i class="fas fa-user"></i>
                Profile
              </label>
            </CustomLink>

            <CustomLink to='/more' className='custom_link'>
              <label className="list-group-item">
              <i class="fas fa-plus"></i>
                More
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
