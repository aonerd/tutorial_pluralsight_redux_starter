import * as types from './actionTypes';
import author from '../api/mockAuthorApi';

export function loadAuthorsSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(authors) {
    return function (dispatch) {
        return author.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error=> {
            throw(error);
        });
    };
}