import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import tweets from './tweetReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    tweets,
    ajaxCallsInProgress
});

export default rootReducer;