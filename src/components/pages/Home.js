import React from 'react';
import '../css/home_page.css';
import Feed from '../Feed';
import { useContext, useState } from 'react';
import { context } from '../Context/context';
import { app } from '../firebase/firebaseApp';
import {getFirestore, setDoc, addDoc, serverTimestamp, doc, collection, onSnapshot} from 'firebase/firestore';


export function Home() {

  const uid =  useContext(context);
 console.log(uid);
  const uidEmail = uid.authValue.email;

  const [tweet,setTweet] = useState('');
  const [tweetUrl,setTweetUrl] = useState('');

  function handleTweetSubmit(e){
    e.preventDefault();
      const db = getFirestore();
   // document reference in firebase
      const docRef = collection(db, 'feeds');
      //add data to it
      addDoc(docRef, {
        id:uidEmail,
        tweet:{feed:tweet, url:tweetUrl},
        time: serverTimestamp(),
      }).then(snapshot=>console.log(snapshot.id)).catch(e=>console.log(e.code))
      setTweet(' ');
      setTweetUrl('');
  }
  
  return (
    <div className='home_container'>
        <h6 className='pb-4'>Home</h6>

    <form onSubmit={handleTweetSubmit}>
          <div className="input-group form-group-sm">
              <span className="input-group-text"><img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='30px' height='30px'></img></span>
              <textarea className="form-control tweet_box" width='20px' height='20px' placeholder="What is Happening?" value={tweet} onChange={(e)=>setTweet(e.target.value)}></textarea>
          </div>
    
        
          <br/>
          {/* <label htmlFor="basic-url" className="form-label">Your vanity URL</label> */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">https://example.com/</span>
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={(e)=>setTweetUrl(e.target.value)} value={tweetUrl}/>
          </div>
      <hr/>
          <div className='d-flex justify-content-between mt-4'>
            <div className="image-upload">
              <label htmlFor="file-input">
                <i className="fas fa-file-upload img"></i>
              </label>

              <input id="file-input" type="file" />
            </div>
              <div className='tweet_btn_wrapper'>
                <button type='submit' className='tweet_btn'>Tweet</button>
              </div>
          </div>
      </form>
      <hr/>
        {/* feed component */}
        <Feed/>

    </div>
  );
}
