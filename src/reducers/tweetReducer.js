import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tweetReducer(state = initialState.tweets, action) {
    switch (action.type) {
        case types.LOAD_TWEETS_SUCCESS:
            return action.tweets;
        default:
            return state;
    }
}