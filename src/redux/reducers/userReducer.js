import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ} from "../types";
import axios from 'axios';
import { CardActionArea } from "@material-ui/core";

//user initial state
const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            console.log("authenticated");
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER: 
            return {
                authenticated: true,
                loading: false,
                ...action.payload //just spreading this is going to combine likes to likes, authenticated to authenticated, credentials to credentials
                // ? -- but how does it know to be initialState
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAM:
            return{
                ...state,
                likes: [
                    ...state.likes, //spread likes then add a new one
                    {
                        //add a new like
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId

                    }
                ]
            }
        case UNLIKE_SCREAM:
            return{
                ...state,
                likes: state.likes.filter((like) => like.screamId !== action.payload.screamId) //filter out any like with the specific screamId
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true);
            return {
                ...state
            }
        default: 
            return state
    }
}