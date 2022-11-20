import React, { Component } from 'react'
import axios from 'axios';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton'

import {connect} from 'react-redux';
//MUI
import { getScreams} from '../redux/actions/dataActions';


export class home extends Component {
  state = { //State is a defaulted global variable?
    screams: null
  } 
  
  componentDidMount(){
    this.props.getScreams()
  }
  render() {
    const {screams, loading} = this.props.data;

    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream}></Scream>) 
      ) : <ScreamSkeleton></ScreamSkeleton>;

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}
home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

//data reducer puts all data into data object
const mapStateToProps =(state) => ({
  data: state.data
})
export default connect(mapStateToProps, {getScreams})(home);