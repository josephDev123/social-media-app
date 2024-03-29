import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import '../css/home_page.css';
import Feed from '../Feed';
import { useContext, useState, useEffect } from 'react';
import { context } from '../Context/context';
// import { app } from '../firebase/firebaseApp';
import {getFirestore, addDoc, collection, onSnapshot, getDoc, doc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export function Home() {
    // firebase storage
  const storage  = getStorage();
  //firebase database
  const db = getFirestore();
  // console.log(new Date().toDateString());

  const {authValue} =  useContext(context);


  const [tweet, setTweet] = useState('');
  const [tweetUrl,setTweetUrl] = useState('');
  const [extracTweet,getTweet] = useState([]);
  const [loadingTweet,setLoadingTweet] = useState(true);
  const [imgPreview,setImgPreview] = useState('');
  const [uploadFile, setUploadFile] = useState('');
  const [imgProgress, setImgProgress] = useState(0);
  // this state handles the profile Image link from the profile collection in firebase
  const [profile_img, setProfile_img] = useState('');


  const uidEmail = authValue.email;
  const index = uidEmail?.indexOf('@');
  const username = uidEmail?.substr(0, index);


 
  //adding tweet function
  function handleTweetSubmit(e){
    e.preventDefault();

   // document reference in firebase
      const docRef = collection(db, 'feeds');

      if(!uploadFile){
        //add data to it
        addDoc(docRef, {
          username:username,
          emailAsid:uidEmail,
          tweet:{content:tweet, url:tweetUrl},
          tweet_img: '',
          time: new Date(),
          person_who_tweeted_img:profile_img,
          like:0
          // personWhoPostedItImg:profileImgLink
        }).then(snapshot=>
          console.log(snapshot.id)
          ).catch(e=>console.log(e.code))
          setTweet(' ');
          setTweetUrl('');
          setImgPreview('');
          setUploadFile('');
      }else{
        

      // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage,  `feed_img/${uploadFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setImgProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;

            default:
              return;
        }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':

           console.log("User doesn't have permission to access the object")
            break;
          case 'storage/canceled':
            console.log( "User canceled the upload")
            break;

          // ...

          case 'storage/unknown':
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
            
            default:
              return;
        }
      }, 
      () => {

        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgProgress(0);
          console.log('File available at', downloadURL);
            
          //add data to it
            addDoc(docRef, {
              // uid:uuidv4(),
              username:username,
              emailAsid:uidEmail,
              tweet:{content:tweet, url:tweetUrl},
              tweet_img: downloadURL,
              time: new Date(),
              person_who_tweeted_img:profile_img,
              like:0
              // personWhoPostedItImg:profileImgLink
            }).then(snapshot=>
              console.log(snapshot.id)
              ).catch(e=>console.log(e.code))
              setTweet(' ');
              setTweetUrl('');
              setImgPreview('');
              setUploadFile('');

          });
        }
      );
    };
 
  }

  //get feed collection from firebase firestore
useEffect(()=>{
  let isCancelled =false;
  const feedCollectionRef = collection(db, 'feeds');
  onSnapshot(feedCollectionRef, (snapshot)=>{
    
    const feeds = [];
  
    if(snapshot && !isCancelled){
          snapshot.forEach(feed => {
          setLoadingTweet(false);
          feeds.push({...feed.data(), id:feed.id});
        })
      }else{
        setLoadingTweet(false);
        feeds.push(' ');
    };
    
    getTweet(feeds);
  }, (error)=>{
    console.log(error.code);
  })

  return ()=>{
    isCancelled=true;
  }

}, [db]);


// grap the profile image of the current user
useEffect(()=>{
  // reference the firestore location for profile to grap the profile image
const profileRef = doc(db, "profile", authValue.email);
getDoc(profileRef).then(result=>{
  result?setProfile_img(result.data().profile_url):setProfile_img('asset/avatar/avatar.jpg');
}).catch(e=>{
  setProfile_img(e.message);
})

}, [authValue.email, db]);




// set the image and also set it preview
function handleFileChange(e){
  setUploadFile(e.target.files[0]);
  const localImgUrl = URL.createObjectURL(e.target.files[0]);
  setImgPreview(localImgUrl);
  e.onLoad = ()=>{
    URL.revokeObjectURL(e.src);
  }
}




  return (
    <div className='home_container mt-4'>
        {/* <h6 className='pb-4'>Home</h6> */}

    <form onSubmit={handleTweetSubmit}>
          <div className="input-group form-group-sm">
              <span className="input-group-text"><img src={profile_img?profile_img: 'asset/avatar/avatar.jpg'} alt='profile_image' className='img-fluid rounded-circle img-thumbnail' width='50px' height='50px'></img></span>
              <textarea className="form-control tweet_box" width='20px' height='20px' placeholder="What is Happening?" value={tweet} onChange={(e)=>setTweet(e.target.value)}></textarea>
          </div>
            
            {imgProgress > 1 && <div><label htmlFor="file">Upoading progress:</label><progress value={imgProgress} max="100">{imgProgress}</progress></div>}
       
          <br/>

          {/* selected image preview */}
           {imgPreview && <div className='upload_img_preview'>
            <img src={imgPreview} alt='upload_image' width='250px' height='100px' />
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
        <Feed loading={loadingTweet} loaded_feed={extracTweet} profile_url={profile_img} />

    </div>
  );
}
