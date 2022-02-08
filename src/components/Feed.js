import React from 'react';
import './css/feed.css';

export default function Feed() {
  return (
    <div className='d-flex feed_wrapper'>
      <div>
        <img src='asset/avatar/avatar.jpg' alt='' className='img-fluid' width='150px' height='150px' />
      </div>
       
       <div>
         <div className='d-flex'>
            <span className='username me-2'>Uzuegbu Joseph </span><span className='username-sm'>@josephUzuegbu</span>
         </div>
         
          <p className='feed'>Real Madrid consider Luka Modrić new contract as "matter of time", deal to be extended in the coming weeks/months. He's untouchable in Carlo Ancelotti's plans</p>

          {/* media space */}
          <div className='feed_media'>

          </div>
       </div>
    </div>
  );
}
