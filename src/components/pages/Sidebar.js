import React from 'react';
import '../css/sidebar.css';


export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='logo'>
          <i className="fab fa-twitter"></i>
        </div>
        <div className='navigation'>
            <div className="list-group">
              <label className="list-group-item">
              <i class="fas fa-home"></i>
                Home
              </label>
              <label className="list-group-item">
              <i class="fas fa-hashtag"></i>
                Explore
              </label>
              <label className="list-group-item">
              <i class="far fa-bell"></i>
                Notification
              </label>
              <label className="list-group-item">
              <i class="far fa-envelope"></i>
                Message
              </label>
              <label className="list-group-item">
              <i class="far fa-bookmark"></i>
                Bookmarks
              </label>
              <label className="list-group-item ">
              <i class="far fa-list-alt"></i>
                List
              </label>
              <label className="list-group-item">
              <i class="fas fa-user"></i>
                Profile
              </label>
              <label className="list-group-item">
              <i class="fas fa-plus"></i>
                More
              </label>
            </div>
        </div>
        <br/>
        <button className='tweet_button'>Tweet</button>
    </div>
  );
}
