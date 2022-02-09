import React from 'react';

export default function Register() {
  return( 
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <form>
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            
        </div>
  );
}
