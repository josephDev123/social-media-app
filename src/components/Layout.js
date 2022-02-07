import React from 'react';
import Sidebar from '../components/pages/Sidebar';
// import Feed from './Feed';
import TwitterEmbed from './TwitterEmbed';
import Home from './pages/Home';

export default function Layout() {
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 col-sm-12 col-md-4'>
          <Sidebar/>
        </div>

        <div className='col-lg-4 col-sm-12 col-md-4'>
          <Home/>
        </div>

        <div className='col-lg-4 col-sm-12 col-md-4'>
          <TwitterEmbed/>
        </div>
      </div>
    </div>
  )
}
