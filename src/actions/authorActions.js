import * as types from './actionTypes';
import author from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(authors) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return author.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error=> {
            throw(error);
        });
    };
}