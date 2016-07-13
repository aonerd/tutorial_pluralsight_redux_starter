import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';

//Import the named import ManagedCoursePage and not the default
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
    it('set error message when trying to save empty title', () => {
        const props = {
            authors: [],
            actions: {
                saveCourse: () => {
                    return Promise.resolve();
                }
            },
            course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
        };

        ////We use mount here to create a full InMem Dom 

        ////Option number 1 which is useful when testing connect code:
        //const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>)

        ////Option number 2 preferred approach of using namedImport as opposed to the default
        const wrapper = mount(<ManageCoursePage {...props}/>);

        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});