import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../css/home_page.css';
import Feed from '../Feed';
import { useContext, useState, useEffect } from 'react';
import { context } from '../Context/context';
import { app } from '../firebase/firebaseApp';
import {getFirestore, addDoc, serverTimestamp, collection, onSnapshot} from 'firebase/firestore';
import {getStorage, ref} from "firebase/storage";


export function Home() {
    // firebase storage
    const storage  = getStorage(app);

  //firebase database
  const db = getFirestore();
  
  const uid =  useContext(context);

  const uidEmail = uid.authValue.email;

// states
  const [tweet,setTweet] = useState('');
  const [tweetUrl,setTweetUrl] = useState('');
  const [extracTweet,getTweet] = useState([]);
  const [loadingTweet,setLoadingTweet] = useState(true);
  const [media,setMedia] = useState('');
  const [imgPreview,setImgPreview] = useState('');
  const [storageFile, setStorageFile] = useState('');

  //adding tweet function
  function handleTweetSubmit(e){
    e.preventDefault();
  // Points to the root reference
const storageRef = ref(storage);
ref(storageRef, `feed_img/${storageFile}`);


   // document reference in firebase
      const docRef = collection(db, 'feeds');
      //add data to it
      addDoc(docRef, {
        uid:uuidv4(),
        username:uid.state[0].username,
        id:uidEmail,
        tweet:{feed:tweet, url:tweetUrl},
        tweet_img: storageFile,
        time: new Date(),
      }).then(snapshot=>
        console.log(snapshot.id)
        ).catch(e=>console.log(e.code))
      setTweet(' ');
      setTweetUrl('');
      setImgPreview('')
  }

  //get feed collection from firebase
useEffect(()=>{
  const feedCollectionRef = collection(db, 'feeds');
  onSnapshot(feedCollectionRef, (snapshot)=>{
    const feeds = [];
    if(snapshot){
        snapshot.forEach(feed => {
          setLoadingTweet(false);
          feeds.push(feed.data());
        })
      }else{
      setLoadingTweet(false);
      feeds.push(' ');
    };
    
    getTweet(feeds);
  }, (error)=>{
    console.log(error.code);
  })

}, [])

function handleFileChange(e){
  setStorageFile(e.target.files[0].name);
 console.log(e.target.files[0].name);
 //get the file in order to store it in firebase storage
//  storeImageToStorage(e.target.files[0]);
  const localImgUrl = URL.createObjectURL(e.target.files[0]);
  setImgPreview(localImgUrl);
  e.onLoad = ()=>{
    URL.revokeObjectURL(e.src);
  }
}


// function setStorage(){
//   // Points to 'images'
// const imagesRef = ref(storageRef, `feed_img/${storageFile}`);
// return imagesRef;

// }





  return (
    <div className='home_container'>
        <h6 className='pb-4'>Home</h6>

    <form onSubmit={handleTweetSubmit}>
          <div className="input-group form-group-sm">
              <span className="input-group-text"><img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='30px' height='30px'></img></span>
              <textarea className="form-control tweet_box" width='20px' height='20px' placeholder="What is Happening?" value={tweet} onChange={(e)=>setTweet(e.target.value)}></textarea>
          </div>

          <br/>
           {imgPreview && <div className='upload_img_preview'>
            <img src={imgPreview} alt='upload image' width="auto"/>
          </div>
        }
          
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

              <input id="file-input" type="file" onChange={handleFileChange}/>
            </div>
              <div className='tweet_btn_wrapper'>
                <button type='submit' className='tweet_btn'>Tweet</button>
              </div>
          </div>
      </form>
      <hr/>
        {/* feed component */}
        <Feed loading={loadingTweet} loaded_feed={extracTweet} />

    </div>
  );
}
