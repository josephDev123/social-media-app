import React, { useEffect, useState, useContext } from 'react';
import { context } from './Context/context';
import './css/feed.css';
import { Link } from 'react-router-dom';
export default function Feed({loading, loaded_feed, profile_url}) {
// const {profileImgLink} = useContext(context);

  const feeds = loaded_feed.map((feed)=>{
   
      return (
        <div className='d-flex feed_wrapper mt-2' key={feed.id}>

          <div className='me-3'>
            <img src={profile_url?profile_url:'asset/avatar/avatar.jpg'} alt='profile_image' className='img-fluid rounded-circle img-thumbnail' width='100px' height='100px' />
          </div>
          
          <div>
            <div className='d-flex'>
                <Link to={`/${feed.emailAsid}`}><span className='username me-2'>{feed.username} </span></Link>
                <span className='username-sm'>{feed.time?.toDate().toDateString()}</span>
            </div>
            
              <p className='feed'>{feed.tweet.feed}</p>
              <a href={feed.tweet.url} className='feed_url' target='_blank'>{feed.tweet.url}</a>
   
              {/* media space */}
              <div className='feed_media mt-3'>
               {feed.tweet_img &&  <img src={feed.tweet_img} alt={feed.tweet_img} width='180px' height='100px'/>}
              </div>
          </div>
      </div>
      )
    })



  if(loading){
    return(
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
 
   return (
   <div>  
     {feeds}  
   </div> 
     )
   

}
