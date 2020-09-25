import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRouter = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

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