import { createContext } from "react";
import {useReducer, useState, useEffect} from 'react';
import {reducer} from '../Reducer/reducer';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
 import { Navigate } from "react-router-dom";
import { type } from "../Type/reducerType";

// create context
export const context = createContext();

export function SetContext({children}){
    const auth = getAuth();
// let navigate = useNavigate();
    //reducer state
    const initialState = [];
    const[state, dispatch] = useReducer(reducer, initialState);

    // reducer type
    const {SET_EMAIL_USERNAME} = type;
// state
    const [authValue, setAuthValue] = useState('');
    const [pending, setPending] = useState(true);
console.log(authValue);

    useEffect(()=>{
        onAuthStateChanged(auth, (authSnapShot)=>{
            if(authSnapShot?.uid){
                // console.log(authSnapShot.uid);
                 //current auth user
                setAuthValue(authSnapShot);

                //extracting username from user email
                const username_extract = authSnapShot.email;
                const stringIndex = username_extract.indexOf('@');
                const username = username_extract.substring(0, stringIndex);

                setPending(false);
                dispatch({type:SET_EMAIL_USERNAME, email:authSnapShot.email, username:username});
            }else{
                setAuthValue(null);
                setPending(false);
        }})
    }, []);
    
 //current auth user
    const currentUserEmail = (snapshot)=>{
        setAuthValue(snapshot);
        setPending(false);
    }

    //logout
    const Logout = ()=>{
        
        signOut(auth).then(() => {
            console.log("Sign-out successful"); 
            setAuthValue(null)
            setPending(false);
            <Navigate to='/login' />
          }).catch((error) => {
            console.log("An error happened."); 
          });
    }
        

    // if there is a refresh, loading Jxs is showed for UX
    if(pending){
        return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )
    }

    return (
        <context.Provider value={{ authValue, currentUserEmail, state, dispatch , Logout}}>
            {children}
        </context.Provider>
    )
}