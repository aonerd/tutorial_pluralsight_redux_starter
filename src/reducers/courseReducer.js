import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            console.log("courseReducer::load course success");
            return action.courses;

        case types.CREATE_COURSE_SUCCESS:
            //NOTE:Remember state is immutable so return the state (spread) with the new course
            console.log("courseReducer::create course success" + action.course.title);
            return [
                ...state,
                Object.assign({}, action.course)
            ];

        default:
            return state;
    }
}