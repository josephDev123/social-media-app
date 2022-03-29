import React from 'react';
import '../css/message.css';

export default function Message() {
  return (
     <div>
        <h5 className='mt-2'>Messages</h5>
        <section className='search_wrapper row mb-2'>
          <input type='search' placeholder='Direct message' className='search p-2 m-2' />
        </section>
        <hr/>
    </div>
  );
}
