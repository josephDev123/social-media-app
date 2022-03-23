import React from 'react';
import '../css/profile.css';
import { useParams } from 'react-router-dom';

export default function UsersProfile() {
    let param = useParams();
  return (
        <div>
            <div className='profile_header'>
            {/* //profile image */}
            <div className='profile_img_container'>
                <img className='img-fluid rounded-circle img-thumbnail profile_img' src={'asset/avatar/avatar.jpg'} alt='' width='100px' height='100px'/>   
            </div>
            </div>

            <div className='d-flex justify-content-end mt-4'>
                    {/* Button trigger modal  */}
            <button className='edit_btn' type='button'>Following</button>
            </div>

        
            <div className='profile_username_container'>
            <h6 className='fw-bold mt-4'>name</h6>
            <p className='lh-1'>username</p>
            </div>
            
            <div className='profile_bio_container'>
                    <p>bio</p>     
            </div>

            
            <div className='profile_email_container'>
                    <p>email </p>     
            </div>

            <div className='profile_website_container'>
                <a href='' target='_blank'>Website</a>                 
            </div>

            <div className='profile_location_container'>
                    <p>location</p>                        
            </div>

            <div className='profile_following_container d-flex justify-content-between'>
                <p className='profile_following'>Following</p> <p className='profile_followers'>Followers</p>
            </div>
      </div>
   
  )
}
