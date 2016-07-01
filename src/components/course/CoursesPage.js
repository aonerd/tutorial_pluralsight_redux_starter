import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
/**
 * Will only list courses (not add them)
 */
class CoursesPage extends React.Component {
    /**
     * Initialize state and bind functions
     */
    constructor(props, context) {
        super(props, context);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    /**
     * Render
     * Should call child component but for simplicity the markup is inline
     */
    render() {
        const {courses} = this.props;
        return (
            <div>
                <h1>Courses</h1>
                <CourseList courses={courses}/>
            </div>
        );
    }
}

/**
 * PropTypes
 */
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired// Third approach:
    //createCourse: PropTypes.func.isRequired// Second approach:
};

/**
 * Connect and related functions
 */
function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

//Third Approach:
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
//Second approach:
/*
 function mapDispatchToProps(dispatch) {
 return {
 createCourse: course => dispatch(courseActions.createCourse(course))
 };
 } */
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);