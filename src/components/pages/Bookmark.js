import React from 'react';
import '../css/bookmark.css'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {getFirestore, getDoc, onSnapshot, query, collection, where, getDocs} from 'firebase/firestore';
import { context } from '../Context/context';

export default function Bookmark() {
  // state
  const [bookmarked, setBookmarked] = useState([]);
  const [status, setStatus] =useState('loading');
  const [errorType, setErrorType] =useState('');
  //context
  let {authValue} = useContext(context);
const db = getFirestore();

useEffect(()=>{
  let bookmarked  = [];
  let iscancelled = false;
  const bookmarkCollectionRef = collection(db, 'bookmark');
  const q = query(bookmarkCollectionRef, where('bookmark_by', '==', authValue.email))
  getDocs(q).then(snapshots=>{
    snapshots.forEach(snapshot=>{
      if(iscancelled===false){
        setStatus('loaded')
      bookmarked.push({...snapshot.data(), id:snapshot.id })
      }
    })
  }).catch(e=>{
    setErrorType(e.message);
    setStatus('error');
  })
  setBookmarked(bookmarked);

  return ()=>{
    iscancelled = true;
  }
}, []);

let bookmarklist =  bookmarked.map(item=>{
    return (
              
                <div key={item.id}>
                  <div className='me-3'>
                    <img src={'asset/avatar/avatar.jpg'} alt='profile_image' className='img-fluid rounded-circle img-thumbnail' width='100px' height='100px' />
                  </div>
                  
                  
                  <div className='d-flex'>
                  {/* `/profile/${feed.emailAsid}` {feed.username} */} 
                      <Link to=''><span className='username me-2'> </span></Link>
                      <span className='date-sm'></span>
                  </div>
                  
                    <p className='feed'>{item.bookmark.tweet.feed}</p>
                    <Link to={item.bookmark.tweet.url} className='feed_url' target='_blank'>{item.bookmark.tweet.url} </Link>
            
                    {/* media space */}
                    <div className='feed_media mt-3'>
                      <img src='' alt='' width='180px' height='100px'/>
                    </div>
                </div>   
           
         )
})

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
          <div className="alert alert-danger" role="alert">
           {errorType}
        </div>
        )

    case 'loaded':
        return(
           <div className='d-flex flex-column bookmark_wrapper mt-2'>
                {bookmarklist }
           </div>
        )

        default:
          return ''

    }
}
