import React from 'react';
import '../css/home_page.css';

export default function Home() {
  return (
    <div className='home_container'>
        <h6 className='pb-4'>Home</h6>

        <div class="input-group form-group-sm">
          <span class="input-group-text"><img src='asset/avatar/avatar.jpg' className='img-fluid' width='30px' height='30px'></img></span>
          <textarea class="form-control tweet_box" width='20px' height='20px' placeholder="What is Happening?"></textarea>
        </div>
    <hr/>
        <div className='d-flex justify-content-between mt-4'>
          <div class="image-upload">
            <label for="file-input">
              <i class="fas fa-file-upload img"></i>
            </label>

            <input id="file-input" type="file" />
          </div>
            <div className='tweet_btn_wrapper'>
              <button className='tweet_btn'>Tweet</button>
            </div>
        </div>
      <hr/>
        {/* feed component */}


    </div>
  );
}
