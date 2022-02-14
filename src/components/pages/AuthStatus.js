import React from 'react'
import { useContext } from 'react'
import {context} from '../Context/context';
import { Navigate } from "react-router-dom";

export default function AuthStatus({children}) {
    let {authValue} = useContext(context);

    if(!authValue){
      return <div><Navigate to='/login' /></div>
    }

    return (
        <div>{children}</div>
    )
}
