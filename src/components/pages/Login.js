import '../css/login_reg.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { context } from '../Context/context';
import {signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {app} from '../firebase/firebaseApp';
import { type } from '../Type/reducerType';


export default function Login() {
    const myStyle={
        backgroundImage:`url(${process.env.PUBLIC_URL+ "/asset/login_reg_bg_img/login_img_bg.png"})`,
        height:"100vh",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        };

        const {currentUserEmail, dispatch, state} = useContext(context);
        const {SET_EMAIL_USERNAME} =  type;
        const redirect = useNavigate();
        const auth = getAuth();
        const [errors, setError] =useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        function handleLoginSubmit(e){
            e.preventDefault();
            signInWithEmailAndPassword(auth, email, password).then(user_snapshot=>{
                
                 if(user_snapshot){
                    currentUserEmail(user_snapshot)
                    const username_extract = user_snapshot.user.email;
                    // const stringIndex = username_extract?.indexOf('@');
                    // const username = username_extract.substring(0, stringIndex);

                    // dispatch({type:SET_EMAIL_USERNAME, email:user_snapshot.user.email, username:username});
                    return redirect('/');
                }else{
                    currentUserEmail(null);
                     return redirect('/register');
                    // return <Navigate to='/register' />;
                }
            }).catch(e=>setError(e.code))
        }


  return( 
    <div className='container' style={myStyle}>
        <div className='d-flex flex-column justify-content-center align-items-center login_wrapper'>
            <form  style={{ marginTop:'30vh' }} onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                <h4>Login</h4>
                {errors?<div className='alert alert-danger'>{errors}</div>:''}
                    <label htmlFor="loginInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-primary me-2">Login</button>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    </div>
);
}
