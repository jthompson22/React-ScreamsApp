import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

//reducers are functions that take (STATE, ACTION) as arguments and return a new STATE as a result
export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        //In both cases do the same
        case LIKE_SCREAM: 
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload; 
            }
            return{
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(index,1);
            return {
                ...state
            };
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream:{
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        default: 
            return state;
    }
}