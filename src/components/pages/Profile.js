import React from 'react';
import '../css/profile.css';
import { useContext, useState } from 'react';
import { context } from '../Context/context';
import ProfileModal from './ProfileModal';

export default function Profile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const contextStorage = useContext(context);
  console.log(contextStorage);

  const {state} = contextStorage

  // const show = ()=>{
  //   setIsOpen(!modalIsOpen)
  // }


  return (
      <div style={{ margin: '0 auto', width: '100%' }}>
        <div className='profile_header'>
         {/* //profile image */}
          <div className='profile_img_container'>
              <img className='img-fluid rounded-circle img-thumbnail' src='asset/avatar/avatar.jpg' alt='' width='100px' height='100px'/>    
          </div>
        </div>

        <div className='d-flex justify-content-end mt-4'>
          <button className='edit_btn'>Edit Profile</button>
        </div>

      
        <div className='profile_username_container'>
          <h6 className='fw-bold mt-4'>Joseph uzuegbu</h6>
          <p className='lh-1'>{state[0].username}</p>
        </div>
        
          <div className='profile_bio_container'>
                 <p>
              Full-stack Web Developer.

              Skill:HTML,CSS,JavaScript,React, firebase, PHP, Laravel, Livewire.etc

            </p>     
          </div>

          
        <div className='profile_email_container'>
                 <p>{state[0].userEmail} </p>     
          </div>

          <div className='profile_website_container'>
               <link to='http://github.com/josephDev123' target='_blank'></link>                 
          </div>

        <div className='profile_location_container'>
                <p>Abeokuta, Nigeria</p>                        
        </div>

        <div className='profile_following_container d-flex justify-content-between'>
            <p className='profile_following'>Following</p> <p className='profile_followers'>Followers</p>
        </div>

      {/* <ProfileModal onShow = {show} modalStatus = {modalIsOpen}/> */}
      </div>
    );
}

