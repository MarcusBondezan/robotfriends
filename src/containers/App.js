import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField } from '../actions';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    constructor(){
        super();
        this.state = {
            robots: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then( response => response.json())
        .then( users => this.setState({ robots: users }));   
    }

    render(){
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return robots.length ? this.getPage(filteredRobots, onSearchChange) : <h1>Loading... </h1>;
        
    }

    getPage(robots, onSearchChange){
        return (
            <div className='tc'>
                <h1 className='f1'>RobotFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={robots} />
                    </ErrorBoundary>
                </Scroll>                   
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);