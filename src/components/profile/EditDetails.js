import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

//REDUX
import {connect} from 'react-redux';

//MUI
import { editUserDetails } from '../../redux/actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//Icons
import EditIcon from '@material-ui/icons/Edit';
import MyButton from '../../util/MyButton';



const styles = (theme) => ({
    ...theme,
    button: {
        float: 'right'
    }
}) 

//RCE tab
export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    }    
    componentDidMount(){
        const {credentials} = this.props; 
        this.mapUserDetailsToState(credentials);
    }
    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    //doesn't take a event becuase its not a form

    handleSubmit = () => {

        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props; //global variables, like props, have to called and assigned with their scope
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
                        <EditIcon color="primary"></EditIcon>
                    </MyButton>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="sm">
                    <DialogTitle> Edit your details </DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="Bio" multiline rows="3" placeholder='A short bio about yourself' className={classes.textField} value={this.state.bio} onChange={this.handleChange} fullwidth>

                            </TextField>
                            <TextField name="website" type="text" label="Website" placeholder='Your personal or professional website' className={classes.textField} value={this.state.website} onChange={this.handleChange} fullwidth>

                            </TextField>
                            <TextField name="location" type="text" label="Location" placeholder='Where you live' className={classes.textField} value={this.state.location} onChange={this.handleChange} fullwidth>

                            </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary"> Cancel </Button>
                        <Button onClick={this.handleSubmit} color="primary"> Submit </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

//what state do we want from redux
const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})


EditDetails.protoTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))