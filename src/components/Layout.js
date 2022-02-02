import React from 'react';
import Sidebar from '../components/pages/Sidebar';
import Feed from './Feed';
import TwitterEmbed from './TwitterEmbed';

export default function Layout() {
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-5 col-sm-10 col-md-4'>
          <Sidebar/>
        </div>

        <div className='col-5 col-sm-10 col-md-4'>
          <Feed/>
        </div>

        <div className='col-5 col-sm-10 col-md-4'>
          <TwitterEmbed/>
        </div>
      </div>
    </div>
  )
}
