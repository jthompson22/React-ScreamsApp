import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { PropTypes } from 'prop-types';
//MUI Stuf
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications'
//Redux
import {connect} from 'react-redux';

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';

// to=/'login' connects to specific routes we've defined in the global App.js

export class Navbar extends Component {
  render() {
    const {authenticated} = this.props
    return (
      <AppBar position='fixed'> 
        <Toolbar className = 'nav-container'>
        {authenticated ? (
          <Fragment>
            <PostScream></PostScream>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary"></HomeIcon>
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
                <Notifications color="primary"></Notifications>
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color='inherit' component={Link} to="/login"> Login </Button>
            <Button color='inherit' component={Link} to="/"> Home </Button>
            <Button color='inherit' component={Link} to="/signup"> Signup </Button>
          </Fragment>
          )
        }
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}
export default connect(mapStateToProps)(Navbar)