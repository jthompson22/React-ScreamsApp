import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'; //middleware or store enhancer

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer, //everything that comes from userReducer will be stored in user object inside our state.
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()    
        )
    );

export default store; 

//ACTIONS are dispatched as a TYPE; analogous to calling a JSON RPC call. Actions change/mutate state