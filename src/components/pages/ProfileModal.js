import React from 'react'
import '../css/profile.css';
import { useState, useContext, useEffect } from 'react';
import {setDoc, getFirestore, doc, collection, onSnapshot} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {context} from '../Context/context';
import app from '../firebase/firebaseApp';


export default function ProfileModal({currentAuthPerson}) {
  // use context to get email
  const {authValue} = useContext(context);
  const db = getFirestore();

const [name, setName] = useState('');
const [bio, setBio] = useState('');
const [location, setLocation] = useState('');
const [website, setWebsite] = useState('');
const [birth, setBirth] = useState('');
const [profile_img, setProfile_img] = useState('');
const [uploadImg_progress, setUploadImg_progress] = useState(0);
const [uploadImg_url, setUploadImg_url] = useState('');


//update the user profile
function handleEditProfile(e){
  e.preventDefault();
  //reference Database
  const collectionRef = collection(db, 'profile');
// file storage
  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, `profile_img/ ${profile_img.name}`);
  const uploadTask = uploadBytesResumable(storageRef, profile_img, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadImg_progress( `${progress}% `);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          default:
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
          default:
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProfile_img('');
        setUploadImg_url(downloadURL);

      // edit profile with data
      const docRef = doc(collectionRef, authValue.email )
      setDoc(docRef, {
        'name':name,
        'bio':bio,
        'location':location,
        'website':website,
        'birth_day':birth,
        'profile_url':downloadURL,
    
      }).then(snapShot=>{
        setName('');
        setBio('');
        setLocation('');
        setWebsite('');
        setBirth('')
        setProfile_img('');
      })
      .catch(e=>console.log(e.code));

      });
    }
  );

}


//fetch data from profile component based on the current user(email)
useEffect(()=>{
  onSnapshot(doc(collection(db,"profile"), currentAuthPerson), (snapShot =>{

    // if(snapShot.data()){
      const {name, location, website, bio, birth_day, profile_url} = snapShot.data();
      setName(name);
      setBio(bio);
      setLocation(location);
      setWebsite(website);
      setBirth(birth_day);
      setUploadImg_url(profile_url);
    // }
 
  }))

  // return ()=>{
  //   setUploadImg_url('');
  // }

}, []);



//get the image
function handleProfileChange(e){
  const image = e.target.files[0];
  setProfile_img(image);
}


  return (
    <div>

       {/* Modal */}
      <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit profile</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='edit_img_container'>
                <img className='img-fluid rounded-circle img-thumbnail profile_img' src={uploadImg_url?uploadImg_url:'asset/avatar/avatar.jpg' } alt='profile_image'  width='100px' height='100px'/> 
                <br/><br/>
              </div>
              <br/>
              <form onSubmit={handleEditProfile}>
                <div className="mb-3">
                  <input type='file' className='form-control' onChange={handleProfileChange}/>
                </div>

                  {uploadImg_progress > 1 && (<div className="progress mb-2">
                  <div className="progress-bar" role="progressbar" style={{ width: `${uploadImg_progress}`,  }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{uploadImg_progress}</div>
                </div>)}
                
              
                <div className="mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='name'
                   onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" id="message-text" placeholder='Bio'
                   onChange={(e)=>setBio(e.target.value)} value={bio}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='Location'
                   onChange={(e)=>setLocation(e.target.value)} value={location}/>
                </div>

                <div className="mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='Website'
                   onChange={(e)=>setWebsite(e.target.value)} value={website}/>
                </div>

                <div className="mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='Birth day'
                  onChange={(e)=>setBirth(e.target.value)} value={birth}/>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">Update profile</button>
                </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
</div>
  )
}
