import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    //Redux Store
    const token = useSelector((store) => store.authReducer.token) || false;

    if(!token){
        return <Navigate to={"/login"} />
    }


  return children
}

export default PrivateRoute
