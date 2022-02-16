import { createContext } from "react";
import {useReducer, useState, useEffect, useContext} from 'react';
import {reducer} from '../Reducer/reducer';
import {app} from '../firebase/firebaseApp';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { type } from "../Type/reducerType";

// create context
export const context = createContext();

export function SetContext({children}){
    const auth = getAuth();

    const initialState = [];
    const[state, dispatch] = useReducer(reducer, initialState);

    const {SET_EMAIL} = type;

    const [authValue, setAuthValue] = useState('');
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth, (authSnapShot)=>{
            if(authSnapShot){
                setAuthValue(authSnapShot);
                setPending(false);
                dispatch({type:SET_EMAIL, email:authSnapShot.email})
            }else{
                setAuthValue(null);
                setPending(false);
        }})
    }, []);
    
 
    const currentUserEmail = (snapshot)=>{
        setAuthValue(snapshot);
        setPending(false);
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
        <context.Provider value={{ authValue, currentUserEmail, state, dispatch }}>
            {children}
        </context.Provider>
    )
}