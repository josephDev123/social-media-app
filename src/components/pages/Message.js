import React from 'react';
import '../css/message.css';

export default function Message() {
  return (
     <div className='container'>
        <h5 className='mt-2'>Messages</h5>
        <section className='search_wrapper row mb-2'>
          <input type='text' placeholder='Direct message' className='search p-2 m-2' />
          <label htmlFor='reciever'>To</label>
          <input type='text' placeholder='message reciever name' className='search p-2 m-2' id='reciever'/>
        </section>
        <hr/>
    </div>
  );
}
