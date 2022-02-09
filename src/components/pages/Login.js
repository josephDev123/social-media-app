import React from 'react';

export default function Login() {
  return( 
    <div className='container d-flex flex-column justify-content-center align-items-center'>
       
        <form>
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
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
        
    </div>
);
}
