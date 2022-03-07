import React from 'react';
import '../css/profile.css';
import { useContext, useState, useEffect } from 'react';
import { context } from '../Context/context';
import ProfileModal from './ProfileModal';
import {setDoc, getFirestore, doc, collection, onSnapshot} from 'firebase/firestore';


export default function Profile() {
  const {authValue}  = useContext(context);
  //state
  const [profile, setProfile] =useState('');
  const db = getFirestore();
  // extracting username from user email
  const email = authValue.email;
  const stringIndex = email.indexOf('@');
  const username = email.substring(0, stringIndex);

  
useEffect(()=>{
  onSnapshot(doc(collection(db,"profile"), authValue.email), (snapShot =>{
    setProfile(snapShot.data());
  }))


}, []);

  return (
      <div style={{ margin: '0 auto', width: '100%' }}>
        <div className='profile_header'>
         {/* //profile image */}
          <div className='profile_img_container'>
              <img className='img-fluid rounded-circle img-thumbnail' src='asset/avatar/avatar.jpg' alt='' width='100px' height='100px'/>    
          </div>
        </div>

        <div className='d-flex justify-content-end mt-4'>
                   {/* Button trigger modal  */}
          <button className='edit_btn'  data-bs-toggle="modal" data-bs-target="#profileModal">Edit Profile</button>
        </div>

      
        <div className='profile_username_container'>
          <h6 className='fw-bold mt-4'>{profile.name}</h6>
          <p className='lh-1'>{username}</p>
        </div>
        
          <div className='profile_bio_container'>
                 <p>{profile.bio}</p>     
          </div>

          
        <div className='profile_email_container'>
                 <p>{email} </p>     
          </div>

          <div className='profile_website_container'>
               <link to={profile.website} target='_blank'></link>                 
          </div>

        <div className='profile_location_container'>
                <p>{profile.location}</p>                        
        </div>

        <div className='profile_following_container d-flex justify-content-between'>
            <p className='profile_following'>Following</p> <p className='profile_followers'>Followers</p>
        </div>

     <   ProfileModal  currentAuthPerson = {authValue.email}/>
      </div>
    );
}

