import expect from 'expect';
import * as courseActions from './courseAction';
import * as types from './actionTypes';

//Probably not really needed
describe('Course Actions', ()=> {
    describe('createCourseSuccess', ()=> {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            const course = {id: 'clean-code', title: 'Clean Code'};
            const exepctedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course: course
            };

            //act
            const action = courseActions.createCourseSuccess(course);

            //assert
            expect(action).toEqual(exepctedAction);
        })
    })
});