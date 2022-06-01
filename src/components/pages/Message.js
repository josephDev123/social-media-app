import React from 'react';
import '../css/message.css';
import { useState, useContext, useEffect } from 'react';
import {context} from '../Context/context';
import {collection, getDoc, getFirestore, doc, setDoc, addDoc} from 'firebase/firestore';

export default function Message() {
const [message, setMessage] = useState('');
const [to, setTo] = useState('');
const [isSuccess, setSuccess]= useState('');
const [status, setStatus] = useState('')

const {authValue} = useContext(context);

const db = getFirestore();

const DirectMessageCoillection = collection(db, 'directMessage');


const handleSubmitMessage = (e)=>{

  e.preventDefault();
  if (message === '' && to==='') {
    setStatus('The field cannot be empty');
  }else{
    const profileRef = doc(db, 'profile', to);
      getDoc(profileRef)
      .then((result)=>{
      if (result.data()) {
        addDoc(DirectMessageCoillection, { 
            sentBy: authValue.email,
            to: to,
            content:message
          })
            .then(addMessage=>{
              setSuccess('message sent Successfully');
              setStatus('');
            })
            .catch(e=>setStatus(e.message))
        
      }else{
        setStatus('the email does not exist');
      }
      })
      .catch(e=> setStatus(e.message))
  }

}



  return (
     <div className='container'>
       <form onSubmit={handleSubmitMessage}>
         {isSuccess ? <div className="alert alert-success" role="alert"> {isSuccess}</div>:''}
         {status ? <div className="alert alert-danger" role="alert"> {status}</div>:''}

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
