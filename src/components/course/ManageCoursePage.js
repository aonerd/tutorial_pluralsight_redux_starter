import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
//Export required for testing
export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    /**
     * React Lifecycle function called anytime props have changed
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            //Necessary to populate from when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(()=> this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            })
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    redirect() {
        this.context.router.push('/courses');
        toastr.success('Course was saved');
        this.setState({saving: false});
    }

    render() {
        return (
            <CourseForm
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
                loading={this.state.saving}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, courseId) {
    const course = courses.filter(course => course.id == courseId);
    if (course.length > 0) return course[0]; //Filter returns a list therefore return the first one
    return null;
}

/**
 *
 * @param state
 * @param ownProps
 * @returns {{course: {id: string, watchHref: string, title: string, authorId: string, length: string, category: string}, authors: Array}}
 */
function mapStateToProps(state, ownProps) {
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
    const courseId = ownProps.params.id;  //from the path /course/id (routes.js)

    //If you have a course id and one course exists(on refresh)
    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }


    return {
        course: course,
        authors: authorsFormattedForDropDown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
