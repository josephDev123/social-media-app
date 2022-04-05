import React from 'react';
import '../css/bookmark.css'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {getFirestore, onSnapshot, query, collection, where} from 'firebase/firestore';
import { context } from '../Context/context';

export default function Bookmark() {
  // state
  const [bookmarks, setBookmarked] = useState([]);
  const [status, setStatus] =useState('loading');
  const [errorType, setErrorType] =useState('');
  //context
  let {authValue} = useContext(context);
  //firebase db
const db = getFirestore();

useEffect(()=>{

  let bookmarked  = [];
  let iscancelled = false;
  const bookmarkCollectionRef = collection(db, 'bookmark');
  const q = query(bookmarkCollectionRef, where('bookmark_by', '==', authValue.email))

  onSnapshot(q, (snapshots)=>{
    snapshots.forEach(snapshot=>{
      if(iscancelled===false){
      bookmarked.push({...snapshot.data(), id:snapshot.id }) 
      setStatus('loaded')
      }
    })
  }, e=>{
    setErrorType(e.message);
    setStatus('error');
  })
  setBookmarked(bookmarked);

  return ()=>{
    iscancelled = true;
  }
}, []);



let bookmarklist = bookmarks.map(item=>(
              
                <React.Fragment key={item.id}>
                  <div className='me-3'>
                    <img src={'asset/avatar/avatar.jpg'} alt='profile_image' className='img-fluid rounded-circle img-thumbnail' width='100px' height='100px' />
                  </div>
                  
                  
                  <div className='d-flex mt-2'>
                  {/* `/profile/${feed.emailAsid}` {feed.username} */} 
                      <Link to={`/profile/${item.bookmark.emailAsid}`}><span className='username me-2'> {item.bookmark.username}</span></Link>
                      <span className='date-sm fs-6'>{item.bookmark.time?.toDate().toDateString()}</span>
                  </div>
                  
                    <p className='feed'>{item.bookmark.tweet.feed}</p>
                    <Link to={item.bookmark.tweet.url} className='feed_url' target='_blank'>{item.bookmark.tweet.url} </Link>
            
                    {/* media space */}
                    <div className='feed_media mt-3'>
                      <img src={item.bookmark.tweet_img} alt='' width='180px' height='100px'/>
                    </div>

                    <div className='like_warpper mt-3'>
                      <i className="far fa-heart me-2 text-danger">{' '} {item.bookmark.like}</i> 
                    </div>
                </React.Fragment>   
           
         ))

  switch(status){
    case 'loading':
      return (
        <div className="d-flex align-items-center">
           <strong>Loading...</strong>
          <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>
      )

    case 'error':
        return (
          <div className="alert alert-danger" role="alert border p-2">
           {errorType}
        </div>
        )

    case 'loaded':
        return (
           <div className='d-flex flex-column bookmark_wrapper mt-2 border p-2'>
                {bookmarklist }
           </div>
        )

        default:
          return (
            <div className='d-flex flex-column bookmark_wrapper mt-2 border p-2'>
                 No Bookmark
            </div>
         )

    }
}
