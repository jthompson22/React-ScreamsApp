import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import { PropTypes } from 'prop-types';

const AuthRoute = ({component: Component, authenticated, ...rest}) => (
    //parenthesis will straight away return something
    <Route
    {...rest}
    //If authenticated, render a redirect (render === call method). Else give that component which is either login or signup
    render={(props) => authenticated === true ? <Redirect to='/'/> : <Component {...props} />}
    />
) 
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
    user: PropTypes.object
}
export default connect(mapStateToProps)(AuthRoute);

//AuthRoute is a simple functional component wrapper around a Route. Creates a prop render JSX method within the Route component. Upon clicking the Route
// link, that render method is engaged either rendering a redirect if authenticated is true or the component passed into the wrapper, Authroute. In these
//cases its either the signup component or the the sign in component. 