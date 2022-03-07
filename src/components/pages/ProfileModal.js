import React from 'react'
import { useState, useContext, useEffect } from 'react';
import {setDoc, getFirestore, doc, collection, onSnapshot} from 'firebase/firestore';
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
const [profile_data, setProfile_data] = useState('');

function handleEditProfile(e){
  e.preventDefault();
  //reference Database
 
  const collectionRef = collection(db, 'profile');
  const docRef = doc(collectionRef, authValue.email )
  setDoc(docRef, {
    'name':name,
    'bio':bio,
    'location':location,
    'website':website,
    'birth_day':birth

  }).then(snapShot=>{
    setName('');

    setBio('');
    setLocation('');
    setWebsite('');
    setBirth('')
    setProfile_data(snapShot.data());
  })
  .catch(e=>console.log(e.code));
}


//fetch data from profile component based on the current user email
useEffect(()=>{
  onSnapshot(doc(collection(db,"profile"), currentAuthPerson), (snapShot =>{
  setProfile_data(snapShot.data());
  }))


}, []);

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
                <img src='asset/avatar/avatar.jpg' alt='' width='100px' height=''/> 
              </div>
             
              <form onSubmit={handleEditProfile}>
                <div className="mb-3">
                  <input type="text" className="form-control" id="recipient-name" placeholder='name'
                   onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" id="message-text" placeholder='Bio'
                   onChange={(e)=>setBio(e.target.value)}
                   value={bio}
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
