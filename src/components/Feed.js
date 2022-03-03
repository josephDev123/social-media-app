import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { Fragment } from 'react/cjs/react.production.min';
import './css/feed.css';

export default function Feed({loading, loaded_feed, downloadUrl}) {

    const handleuploadFileName = (name)=>{
      // Create a reference to the file we want to download
      const storage = getStorage();
      const starsRef = ref(storage, `feed_img/${name}`);
      var fullUrl;
      // Get the download URL
       getDownloadURL(starsRef)
        .then((url) => {
          // Insert url into an <img> tag to "download"
        // console.log(url);
         fullUrl= url
         return fullUrl

        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
    
            // ...
    
            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });

        // console.log(fullUrl);
    }

    



  const feeds = loaded_feed.map((feed)=>{
    
      return (
        <div className='d-flex feed_wrapper' key={feed.uid}>
          <div className='me-3'>
            <img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='150px' height='150px' />
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
              {/* <div className='feed_media'>
                <img src={handleuploadFileName(feed.tweet_img)} alt={feed.tweet_img} />
              </div> */}
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
     {downloadUrl.map((link)=>
      <div className='feed_media'>
         <img src={link} alt='' />
       </div>
      )}
   </div> 
     )
   

}
