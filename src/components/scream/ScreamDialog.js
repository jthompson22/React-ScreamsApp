import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import Comments from './Comments';
import CommentForm from './CommentForm';


import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';


const styles = theme => ({
    ...theme,
    profileImage:{
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent:{
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})


export class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  }
  componentDidMount(){
    if(this.props.openDialog){
        this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId} = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    
    if(oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath);
    this.setState({open: true, oldPath, newPath});
    this.props.getScream(this.props.screamId);
  }
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({open: false});
    this.props.clearErrors(); 
  }

  render(){
    const {classes, scream: {screamId, body, createdAt, likeCount, commentCount,comments, userImage, userHandle}, UI: {loading }} = this.props;
    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2}></CircularProgress>
        </div>
    ) : (
        <Grid container spacing={16}>
            <Grid item sm={5}>
                <img src={userImage} alt="Profile" className={classes.profileImage}></img>
            </Grid>
            <Grid item sm={7}>
                <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeperator}></hr>
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeperator}></hr>
                <Typography variant='body1'>
                    {body}
                </Typography>
                <LikeButton screamId={screamId}></LikeButton>
                <span> {likeCount} Likes </span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"></ChatIcon>
                </MyButton>
                <span>{commentCount} Comments</span>
            </Grid>
            <hr className={classes.visibleSeperator}></hr>
            <CommentForm screamId={screamId}></CommentForm>
            <Comments comments={comments}></Comments>
        </Grid>
    )

    return(
        <Fragment>
            <MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                <UnfoldMore></UnfoldMore>
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon></CloseIcon>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
            </Dialog>

        </Fragment>
    )
  }
  

}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
  });

  const mapActionsToProps = {
    getScream,
    clearErrors
  };

  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(ScreamDialog));