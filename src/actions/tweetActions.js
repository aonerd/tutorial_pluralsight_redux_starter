import * as types from './actionTypes';

export function loadTweetsSuccess(tweets) {
    return {type: types.LOAD_TWEETS_SUCCESS, tweets};
}

export function loadTweets() {
    return function (dispatch) {
        return [];
    };
}