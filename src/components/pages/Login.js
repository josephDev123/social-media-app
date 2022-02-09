import React from 'react';
import { Link } from 'react-router-dom';
import '../css/login_reg.css';

export default function Login() {
    const myStyle={
        backgroundImage:`url(${process.env.PUBLIC_URL+ "/asset/login_reg_bg_img/login_img_bg1.png"})`,
       height:"100vh",
       width:"100vh",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        };



  return( 
    <div className='container d-flex flex-column justify-content-center align-items-center login_wrapper' style={myStyle}>
        <form  style={{ marginTop:'30vh' }}>
            <div className="mb-3">
            <h4>Login</h4>
                <label htmlFor="loginInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label htmlFor="loginInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginInputPassword1"/>
            </div>
            <div class="input-group mb-3">
                <button type="submit" className="btn btn-primary me-2">Login</button>
                <Link className='btn btn_bg-littleStyle' to='/register'>Register</Link>
            </div>
        </form>
    </div>
);
}
