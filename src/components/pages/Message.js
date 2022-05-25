import React from 'react';
import '../css/message.css';
import { useState, useContext, useEffect } from 'react';
import {context} from '../Context/context';
import {collection, getDoc, getFirestore} from 'firebase/firestore';

export default function Message() {
const [message, setMessage] = useState('');
const [messageReceiver, setMessageReceiver] = useState('');
const [isemailvalidateError, setIsEmailvalidateError] = useState('');
const [isEmpty, setIsEmpty] =useState('');

const {authValue} = useContext(context);

const db = getFirestore();
console.log(isEmpty, isemailvalidateError, );

// validate the receiver
const validateEmail = async ()=>{
  try{
    const profileRef = collection(db, 'profile', authValue.email);
    const profile = await getDoc(profileRef);
    const profileResult = console.log(profile.data());
    console.log(profileResult);
    return 
  }catch(e){
    setIsEmailvalidateError(e.message)
  }
}

const handleSubmitMessage = (e)=>{

  e.preventDefault();
  // if (message === '' && messageReceiver==='') {
  //   setIsEmpty('The field cannot be empty');
  // }else{
    validateEmail()
  // }
}



  return (
     <div className='container'>
       <form onSubmit={handleSubmitMessage}>
          <h5 className='mt-2'>Messages</h5>
          <section className='search_wrapper row mb-2'>
            <input type='text' placeholder='Direct message' className='search p-2 m-2' onChange={(e)=>setMessage(e.target.value)}/>
            <label htmlFor='reciever'>To</label>
            <input type='email' placeholder='message reciever name(by email)' className='search p-2 m-2' id='reciever' onChange={(e)=>setMessageReceiver(e.target.value)}/>
            <button type='submit' className='btn-primary p-2 m-2'>Message</button>
          </section>
        </form>
        <hr/>
    </div>
  );
}
