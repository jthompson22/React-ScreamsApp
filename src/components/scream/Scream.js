import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import DeleteScream from "./DeleteScream";
import ScreamDialog from './ScreamDialog';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import LikeButton from "./LikeButton";

//Save
const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

export class Scream extends Component {

  render() {
    dayjs.extend(relativeTime);

    //2x destructuring
    //This SPECIFIC scream is passed down from HOME and rendered
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: {handle}
      }
    } = this.props;
    
    const deleteButton = (authenticated && userHandle === handle) ? (
      <DeleteScream screamId={screamId}></DeleteScream>
    ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        ></CardMedia>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>

          {deleteButton}

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId}></LikeButton>
          <span>{likeCount} Likes </span>
          <MyButton tip="comments">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} Comments</span>
          
          <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}></ScreamDialog>
        </CardContent>
      </Card>
    );
  }
}
const mapStateToProps= (state) => ({
  user: state.user
})

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

export default connect(mapStateToProps)(withStyles(styles)(Scream));
