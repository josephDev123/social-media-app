import React, { useEffect, useState } from 'react';
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { Fragment } from 'react/cjs/react.production.min';
import './css/feed.css';

export default function Feed({loading, loaded_feed}) {
console.log(loaded_feed.id);
  const feeds = loaded_feed.map((feed)=>{
    // console.log(feed.uid);
    
      return (
        <div className='d-flex feed_wrapper mt-2' key={feed.id}>

          <div className='me-3'>
            <img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='100px' height='100px' />
          </div>
          
          <div>
            <div className='d-flex'>
                <span className='username me-2'>{feed.username} </span><span className='username-sm'>
                {feed.time.toDate().toDateString()}
                </span>
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
