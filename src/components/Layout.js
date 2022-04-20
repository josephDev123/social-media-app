import React from 'react';
import Sidebar from '../components/pages/Sidebar';
import TwitterEmbed from './TwitterEmbed';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return(
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 col-sm-12 col-md-4'>
          <Sidebar/>
        </div>

        <div className='col-lg-4 col-sm-12 col-md-5'>
          <Outlet/>
        </div>

        <div className='col-lg-4 col-sm-12 col-md-3'>
          <TwitterEmbed/>
        </div>
      </div>
    </div>
  )
}
