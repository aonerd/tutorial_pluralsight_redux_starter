import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render(){
        return (
            <div className="jumbotron">
                <h1>Pluralsight admin</h1>
                <p>React and Redux tutorial</p>
                <Link to="about" className="btn btn-primary btn-lg">About us</Link>
            </div>        
        );
    }
}

export default HomePage;