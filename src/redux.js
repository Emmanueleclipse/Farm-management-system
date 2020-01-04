import {createStore, combineReducers} from 'redux';
import LinksReducer from './reducers/LinksReducer';
import AllData from './reducers/AllData';
import AuthReducer from './reducers/AuthReducer';

const allReducers = combineReducers({
    LinksReducer,
    AllData,
    AuthReducer
})

const store = createStore(allReducers);

export default store;