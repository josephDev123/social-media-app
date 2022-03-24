import React from 'react';
import '../css/profile.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { context } from '../Context/context';
import {getFirestore, getDoc, doc} from 'firebase/firestore';


export default function UsersProfile() {
    // states
    const [status, setStatus] = useState('loading');
    const [profile, setProfile] =useState('');

    const db = getFirestore()
    // let {authValue} = useContext(context);
    let {id} = useParams();
    let index = id.indexOf('@');
    let username = id.substr(0, index);

    
    useEffect(()=>{
        // fetch profile details base by id(gotten from the route query (useParam))  
    // 1. reference the location of the profile details
        const uniqueprofileDetailsRef =  doc(db, 'profile', id);
        getDoc(uniqueprofileDetailsRef)
        .then(result=>{
            setProfile(result.data());
            setStatus('loaded');
        })
       .catch(e=>{
        setProfile('');
        setStatus('error');
       })
    }, [id, db]);


    
        switch(status){
            case 'loading':
                return (
                    <div className="spinner-grow text-primary d-flex justify-content-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> 
                )
            case 'error':
                return(
                    <div>
                        <h6 className='alert alert-danger'>Profile details fails to load. Check your Network</h6>
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
                            <p className='lh-1'>Username: {username}</p>
                        </div>

                        
                        <div className='profile_email_container'>
                             <p>Email: {id} </p>     
                        </div>
                    </div> 
                )
            default:
                return(
                    <div>
                        <div className='profile_header'>
                        {/* //profile image */}
                        <div className='profile_img_container'>
                            <img className='img-fluid rounded-circle img-thumbnail profile_img' src={profile.profile_url? profile.profile_url:'asset/avatar/avatar.jpg'} alt='' width='100px' height='100px'/>   
                        </div>
                        </div>

                        <div className='d-flex justify-content-end mt-4'>
                                {/* Button trigger modal  */}
                        <button className='edit_btn' type='button'>Following</button>
                        </div>

                    
                        <div className='profile_username_container'>
                        <h6 className='fw-bold mt-4'>Name: {profile.name}</h6>
                        <p className='lh-1'>Username: {username}</p>
                        </div>
                        
                        <div className='profile_bio_container'>
                                <p>Bio: {profile.bio}</p>     
                        </div>

                        
                        <div className='profile_email_container'>
                                <p>Email: {id} </p>     
                        </div>

                        <div className='profile_website_container'>
                            <a href='#' target='_blank'>Website</a>                 
                        </div>

                        <div className='profile_location_container'>
                                <p>location: {profile.location}</p>                        
                        </div>

                        <div className='profile_following_container d-flex justify-content-between'>
                            <p className='profile_following'>Following</p> <p className='profile_followers'>Followers</p>
                        </div>
                    </div>
                )
         }
       



//     if(status === 'loading'){
//         return (
//             <div className="spinner-grow text-primary d-flex justify-content-center" role="status">
//                 <span className="visually-hidden">Loading...</span>
//           </div> 
//         )
//     }
    
//   return (
//         <div>
//             <div className='profile_header'>
//             {/* //profile image */}
//             <div className='profile_img_container'>
//                 <img className='img-fluid rounded-circle img-thumbnail profile_img' src={'asset/avatar/avatar.jpg'} alt='' width='100px' height='100px'/>   
//             </div>
//             </div>

//             <div className='d-flex justify-content-end mt-4'>
//                     {/* Button trigger modal  */}
//             <button className='edit_btn' type='button'>Following</button>
//             </div>

        
//             <div className='profile_username_container'>
//             <h6 className='fw-bold mt-4'>name</h6>
//             <p className='lh-1'>Username: {username}</p>
//             </div>
            
//             <div className='profile_bio_container'>
//                     <p>bio</p>     
//             </div>

            
//             <div className='profile_email_container'>
//                     <p>Email: {id} </p>     
//             </div>

//             <div className='profile_website_container'>
//                 <a href='#' target='_blank'>Website</a>                 
//             </div>

//             <div className='profile_location_container'>
//                     <p>location</p>                        
//             </div>

//             <div className='profile_following_container d-flex justify-content-between'>
//                 <p className='profile_following'>Following</p> <p className='profile_followers'>Followers</p>
//             </div>
//       </div>
   
//   )
}
