import React, { useContext } from 'react'
import { AuthContext } from '../../../auth/AuthContext'
import { types } from '../../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext( AuthContext );
    
    const handleLogin = ()=>{

        
        const action = {
            type: types.login,
            payload: {
                name : "Ricardo"
            }
            
        }
        dispatch(action);
        
        
        history.replace('/');
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className  = "btn btn-outline-primary"
                onClick    = { handleLogin }
            >
                Sign In
            </button>

        </div>
    )
}
