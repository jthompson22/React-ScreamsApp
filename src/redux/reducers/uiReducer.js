import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI,  STOP_LOADING_UI} from "../types";

const initialState = {
    loading: false,
    errors: null
};

//reducers are functions that take (STATE, ACTION) as arguments and return a new STATE as a result
export default function(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        default: 
            return state;
    }
}