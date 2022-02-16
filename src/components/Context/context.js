import { createContext } from "react";
import {useReducer, useState, useEffect} from 'react';
import {reducer} from '../Reducer/reducer';
import {app} from '../firebase/firebaseApp';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

// create context
export const context = createContext();

export function SetContext({children}){
    const auth = getAuth();

    const initialState = [];
    const[state, dispatch] = useReducer(reducer, initialState);

    const [authValue, setAuthValue] = useState('');
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        onAuthStateChanged(auth, (authSnapShot)=>{
            if(authSnapShot){
                setAuthValue(authSnapShot.email);
                setPending(false);
            }else{
                setAuthValue(null);
                setPending(false);
        }})
    }, []);
    
 
    const user = (snapshot)=>{
        setAuthValue(snapshot);
        setPending(false);
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
        <context.Provider value={{ authValue, user }}>
            {children}
        </context.Provider>
    )
}