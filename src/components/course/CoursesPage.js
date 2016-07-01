import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';

class CoursesPage extends React.Component {
    /**
     * Initialize state and bind functions
     */
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: {title: ""}
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    /**
     * Child functions called by render
     */
    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course: course});
    }

    onClickSave() {
        this.props.actions.createCourse(this.state.course);//Third approach:
        //this.props.createCourse(this.state.course);//Second approach:
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    /**
     * Render
     * Should call child component but for simplicity the markup is inline
     */
    render() {
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input type="text"
                       onChange={this.onTitleChange}
                       value={this.state.course.title}/>
                <input
                    type="submit"
                    value="Save"
                    onClick={this.onClickSave}/>

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