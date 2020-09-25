import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRouter = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    const URL = rest.location.search ? rest.location.pathname + rest.location.search : rest.location.pathname;
    localStorage.setItem("lastPath", URL );

    return (
        <Route 
            { ...rest } 
            component={ ( props ) =>(
                (isAuthenticated)
                    ? (<Component { ...props } />)
                    : (<Redirect to="/login" />)
            )}
        
        >
            
        </Route>
    )
}

PrivateRouter.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}