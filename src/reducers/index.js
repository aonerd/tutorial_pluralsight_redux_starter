import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
    courses    //short hand property name
});

export default rootReducer;