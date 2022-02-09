import React from 'react';
import { Link } from 'react-router-dom';
import '../css/login_reg.css';

export default function Register() {

    const myStyle={
        backgroundImage:`url(${process.env.PUBLIC_URL+ "/asset/login_reg_bg_img/register_bg_img.png"})`,
               height:"100vh",
               width:"100vh",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                };
  return( 
      <div style={myStyle}>
        <div className=' d-flex flex-column justify-content-center align-items-center register_wrapper' >
            <form className='' style={{ marginTop:'30vh' }}>
                <div className="mb-3">
                <h4>Register</h4>
                    <label htmlFor="registerInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="registerInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="registerInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="registerInputPassword1"/>
                </div>
               
                <div class="input-group mb-3">
                     <button type="submit" className="btn btn-primary me-2">Register</button>
                    <Link className='btn btn_bg-littleStyle' to='/login'>Login</Link>
                </div>
            </form>
            
        </div>
        </div>
  );
}
