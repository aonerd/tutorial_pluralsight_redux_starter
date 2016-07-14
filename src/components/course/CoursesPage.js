import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
/**
 * Will only list courses (not add them)
 */
class CoursesPage extends React.Component {
    /**
     * Initialize state and bind functions
     */
    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
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
                <input type="submit"
                       value="Add Course"
                       className="btn btn-primary"
                       onClick={this.redirectToAddCoursePage}/>
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