import React from 'react';
import '../css/message.css';
import { useState, useContext, useEffect } from 'react';
import {context} from '../Context/context';
import {collection, getDoc, getFirestore, doc, setDoc} from 'firebase/firestore';

export default function Message() {
const [message, setMessage] = useState('');
const [to, setTo] = useState('');
const [isemailvalidateError, setIsEmailvalidateError] = useState('');
const [isEmpty, setIsEmpty] = useState('');

const {authValue} = useContext(context);

const db = getFirestore();
// const profileRef = collection(db, 'profile');
const profileRef = doc(db, 'profile', to);
const DirectMessageCoillection = doc(db, 'directMessage', authValue.email);


const handleSubmitMessage = (e)=>{

  e.preventDefault();
  if (message === '' && to==='') {
    setIsEmpty('The field cannot be empty');
    console.log('empty');
  }else{
    let message;
      getDoc(profileRef)
      .then((result)=>{
      if (result.data()) {
        setDoc(DirectMessageCoillection, { 
            sentBy: authValue.email,
            to: to,
            content:message
          })
            .then(addMessage=>{
              console.log('message sent successfully');
            })
            .catch(e=>console.log(e.message))
        
      }
      })
      .catch(e=> console.log(e.message))
  }

}



  return (
     <div className='container'>
       <form onSubmit={handleSubmitMessage}>
          <h5 className='mt-2'>Messages</h5>
          <section className='search_wrapper row mb-2'>
            <input type='text' placeholder='Direct message' className='search p-2 m-2' onChange={(e)=>setMessage(e.target.value)}/>
            <label htmlFor='reciever'>To</label>
            <input type='email' placeholder='message reciever name(by email)' className='search p-2 m-2' id='reciever' onChange={(e)=>setTo(e.target.value)}/>
            <button type='submit' className='btn-primary p-2 m-2'>Message</button>
          </section>
        </form>
        <hr/>
    </div>
  );
}
