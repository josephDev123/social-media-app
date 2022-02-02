import React from 'react';
import './css/ProfileSnapShot.css';

export default function ProfileSnapShot() {
  return(
    <div className='profileSnapshot'>
        <div className='profileSnapshot_img'>
            <img src='asset/avatar/avatar.jpg' alt='' width='40vw' height='40vw'/>
        </div>
        <div className='profileSnapshot_username'>
            <h6>Joseph uzuegbu</h6>
            <p>@josephuzuegbu</p>
        </div>
       
    </div>
  );
}
