import React from 'react';
import '../css/bookmark.css'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {getFirestore, query, collection, where, getDocs} from 'firebase/firestore';
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
// console.log(bookmarks);

const bookmarkCollectionRef = collection(db, 'bookmark');
const q = query(bookmarkCollectionRef, where('bookmark_by', '==', authValue.email))


useEffect(()=>{
  getDocs(q).then(bookmarksItem=>{
    let bookmarked  = [];
    bookmarksItem.forEach(bookmarkItem => {
      if(bookmarkItem.data() !== null || bookmarkItem.data() !== undefined){
        bookmarked.push(bookmarkItem.data());
        setStatus('loaded')
       
        }else{
         setStatus('empty')
        }
     
    });
    setBookmarked(bookmarked)
  }).catch(e=>{
    console.log(e.message)
    setStatus('error')
    setErrorType(e.message);
  })

  

}, [])


    if(status === 'loading'){
      return (
                <div className="d-flex align-items-center">
                  <strong>Loading...</strong>
                  <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
              </div>
              )
    }

    if(status === 'empty'){
      return (
            <div className='d-flex flex-column bookmark_wrapper mt-2 border p-2'>
              No Bookmark
            </div>
             )
    }

    
    if(status === 'error'){
      return (
              <div className="alert alert-danger" role="alert border p-2">
                   {errorType }
              </div>
                )
    }

  
      return (
        <div className='d-flex flex-column bookmark_wrapper mt-2 border p-2'>
             {bookmarks.map(item=>(
                         <div key={item.id} className='mb-2 p-2'>
                           <div className='me-3'>
                             <img src={item.bookmarks.person_who_tweeted_img?item.bookmarks.person_who_tweeted_img:'asset/avatar/avatar.jpg'} alt='profile_image' className='img-fluid rounded-circle img-thumbnail' width='50px' height='100px' />
                           </div>
                           
                           
                           <div className='d-flex mt-2'>
                           {/* `/profile/${feed.emailAsid}` {feed.username} */} 
                               <Link to={`/profile/${item.bookmarks.emailAsid}`}><span className='username me-2'> {item.bookmarks.username}</span></Link>
                               <span className='date-sm fs-6'>{item.bookmarks.time?.toDate().toDateString()}</span>
                           </div>
                           
                             <p className='feed'>{item.bookmarks.tweet.content}</p>
                             <Link to={item.bookmarks.tweet.url} className='feed_url' target='_blank'>{item.bookmarks.tweet.url} </Link>
                     
                             {/* media space */}
                             <div className='feed_media mt-3'>
                             {item.bookmarks.tweet_img? <img src={item.bookmarks.tweet_img} alt='' width='180px' height='100px'/>:''}
                             </div>
         
                             <div className='like_warpper mt-3'>
                               <i className="far fa-heart me-2 text-danger" >{' '} {item.bookmarks.like}</i> 
                             </div>
                             <hr/>
                        </div>   
             ))
                   }
         </div>
      )
 

}
