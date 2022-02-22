import React from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './css/feed.css';

export default function Feed({loading, loaded_feed}) {

  const feeds = loaded_feed.map((feed)=>{
      return (
        <div className='d-flex feed_wrapper' key={feed.uid}>
          <div className='me-3'>
            <img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='150px' height='150px' />
          </div>
          
          <div>
            <div className='d-flex'>
                <span className='username me-2'>{feed.username} </span><span className='username-sm'>@josephUzuegbu</span>
            </div>
            
              <p className='feed'>{feed.tweet.feed}</p>
              <p className='feed'>{feed.tweet.url}</p>
    
              {/* media space */}
              <div className='feed_media'>
    
              </div>
          </div>
      </div>
      )
    })
   

//   else{
//     const feeds=  (<div className="d-flex justify-content-center">
//             <span className="visually-hidden">No tweet...</span>
//      </div>   )
  
// }




  if(loading){
    return(
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
 
   return <div>{feeds} </div> 
  
  

}
