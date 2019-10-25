import React, { Component } from 'react';
import classes from './Game.module.css';
import GameBoard from '../../components/GameBoard/GameBoard';

class Game extends Component {

    render() {
        return (
            <div className={classes.Game}>
                <GameBoard/>
            </div>
        );  
    }
}

export default Game;