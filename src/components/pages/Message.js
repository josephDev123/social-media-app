import React from 'react';
import '../css/message.css';
import { useState, useContext, useEffect } from 'react';
import {context} from '../Context/context';
import {collection, getDoc, getFirestore, doc, addDoc, query, onSnapshot, where} from 'firebase/firestore';

export default function Message() {
  //state management
const [message, setMessage] = useState('');
const [to, setTo] = useState('');
const [isSuccess, setSuccess]= useState('');
const [status, setStatus] = useState('')
const [DirectMessage, setDirectMessage] = useState([]);

const {authValue} = useContext(context);

const db = getFirestore();

const DirectMessageCoillection = collection(db, 'directMessage');
const q = query(collection(db, "directMessage"), where("to", "==", authValue.email))


const handleSubmitMessage = (e)=>{

  e.preventDefault();
  if (message === '' && to==='') {
    setStatus('The field cannot be empty');
  }else{
    //check if the person to message is registered email
    const profileRef = doc(db, 'profile', to);
      getDoc(profileRef)
      .then((result)=>{
      if (result.data()) {
        addDoc(DirectMessageCoillection, { 
            sentBy: authValue.email,
            to:to,
            content:message,
            date:new Date().toDateString()
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

//get the message for the login user
useEffect(()=>{
  onSnapshot(q, (querySnapshot) => {
    const message = [];
    querySnapshot.forEach((messages) => {
      message.push({...messages.data(), id:messages.id});
    });
    setDirectMessage(message);
  });
}, [])

console.log(DirectMessage);

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
        <div className='mt-2 message_container p-2'>
          <h5>Direct message for me:</h5>
          {!DirectMessage.length && <div class="alert alert-danger" role="alert">No message yet</div>}

          {DirectMessage.map(message=>{
            return(
              <div className='message_wrapper mt-4' key={message.id}>
                  <div className='me-2'>
                    <img src='/asset/avatar/avatar.jpg' width='50' height='50' alt='sender image' className=''/>
                  </div>
                  <div className='message_content'>
                      <p>joseph <span>{message.date}</span></p>
                      <p>{message.content}</p>
                  </div>
              </div>
            )
          })}

        </div>
    </div>
  );
}
