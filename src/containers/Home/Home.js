import React, {Component} from 'react';
import classes from './Home.module.css';
import Button from '../../components/UI/Button/Button';

class Home extends Component {

    startGameHandler = () => {
        this.props.history.push('/game');
    }

    render() {
        return(
            <div className={classes.Home}>
                <h1>Welcome to Krusty Games</h1>
                <Button clicked={this.startGameHandler}>Start Game</Button>
            </div>
        );
    }
}

export default Home;