import { createContext } from "react";
import {useReducer, useState, useEffect} from 'react';
import {reducer} from '../Reducer/reducer';
import {app} from '../firebase/firebaseApp';
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import { Navigate } from "react-router-dom";
import { type } from "../Type/reducerType";

// create context
export const context = createContext();

export function SetContext({children}){
    const auth = getAuth();

    //reducer state
    const initialState = [];
    const[state, dispatch] = useReducer(reducer, initialState);

    // reducer type
    const {SET_EMAIL_USERNAME} = type;
// state
    const [authValue, setAuthValue] = useState('');
    const [pending, setPending] = useState(true);
    const [profileImgLink, setProfileImgLink] = useState('');

    console.log(profileImgLink);

    useEffect(()=>{
        onAuthStateChanged(auth, (authSnapShot)=>{
            if(authSnapShot.uid){
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

    // grab the profile image once the person update it profile
    const grapProfileImageFromdownloadURL = (profileImgLink)=>{
        setProfileImgLink(profileImgLink);
    }
 
    // console.log(state);

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
        <context.Provider value={{ authValue, currentUserEmail, state, dispatch, profileImgLink, grapProfileImageFromdownloadURL }}>
            {children}
        </context.Provider>
    )
}