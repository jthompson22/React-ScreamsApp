
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import ProfileSkeleton from '../util/ProfileSkeleton';

//import ScreamSkeleton from '../util/ScreamSkeleton';
//import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import Profile from '../components/profile/Profile';

export class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle; //get handle from the url route with matach and params
        const screamId = this.props.match.params.screamId;

        if(screamId) this.setState({screamIdParam: screamId});

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }

    render() {
    const {screams, loading} = this.props.data;
    const {screamIdParam} = this.state; 
    const screamsMarkup = loading ? (
        <p> Loading data ... </p>
    ) : screams === null ? (
        <p> No Screams from the user </p>
    ) : !screamIdParam ? (
        screams.map(scream => <Scream key={scream.screamId} scream={scream}></Scream>)
    ) : (
        screams.map(scream=> {
            if(scream.screamId !== screamIdParam){
                return <Scream key={scream.screamId} scream={scream}></Scream>
            } else  return <Scream key={scream.screamId} scream={scream} openDialog></Scream> //passing opendialog just passes property return as true
        })
    )
    return (
       <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
            {this.state.profile === null ?(
                <ProfileSkeleton></ProfileSkeleton>
            ): (
                <StaticProfile profile={this.state.profile} />
            )}
        </Grid>
      </Grid>
    )
  }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getUserData }
  )(user);