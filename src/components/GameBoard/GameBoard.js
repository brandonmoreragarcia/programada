import React, { Component } from 'react';
import classes from './GameBoard.module.css';
import GameBoardSquare from '../GameBoardSquare/GameBoardSquare';
import GameContext from '../../Context/GameContext';

class GameBoard extends Component {
    state = {
        utilityMatrix: [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ],
        canMoveChecker: false,
        checkerBeingDragged: {
            position: null,
            checkerType: null
        },
        checkerNewPosition : null,
        boardMatrix: []
    }
    //sets checker to false, removes the checker from it's last position
    removeChecker = (position) => {
        if (this.state.canMoveChecker) {
            console.log('removing frome', position);
            const newMatrix = this.inmutableMatrixGenerator();
            const oldSquare = this.state.boardMatrix[position.r][position.c];
            const newSquare = <GameBoardSquare {...oldSquare.props} hasChecker={false} checkerType='any' />
            newMatrix[position.r][position.c] = newSquare;
            this.setState({ boardMatrix: newMatrix });
        }
        
        if (this.state.checkerNewPosition) {
            this.canEatChecker(this.state.checkerNewPosition);
        }


    }

    insertChecker = (position) => {
        console.log('inserting');
        const newMatrix = this.inmutableMatrixGenerator();
        const oldSquare = this.state.boardMatrix[position.r][position.c];
        const newSquare = <GameBoardSquare {...oldSquare.props} hasChecker={true} checkerType={this.state.checkerBeingDragged.checkerType} />
        newMatrix[position.r][position.c] = newSquare;
        this.setState({ boardMatrix: newMatrix });
    }

    setCheckerBeingDragged = (position, checkerType) => {
        this.setState({ checkerBeingDragged: { position, checkerType } });
    }

    canDropChecker = (squareType, checkerNewPosition, hasChecker) => {
        if (squareType === 0 && !hasChecker) {
            switch (this.state.checkerBeingDragged.checkerType) {
                case 'red':
                    if (this.isPositionValid(checkerNewPosition) && checkerNewPosition.r < this.state.checkerBeingDragged.position.r) {
                        this.setState({ canMoveChecker: true, checkerNewPosition: checkerNewPosition })
                        return true;
                    }
                    break;
                case 'white':
                    if (this.isPositionValid(checkerNewPosition) && checkerNewPosition.r > this.state.checkerBeingDragged.position.r) {
                        this.setState({ canMoveChecker: true, checkerNewPosition: checkerNewPosition })
                        return true;
                    }
                    break;
                default:
                    this.setState({ canMoveChecker: false });
                    return false;
            }
            this.setState({ canMoveChecker: false });
            return false;
        }

    }

    //to prevent from moving more than one square at a time;
    isPositionValid = (checkerNewPosition) => {
        const diference = checkerNewPosition.r - this.state.checkerBeingDragged.position.r;
        //return Math.abs(diference) === 1;
        return true;
    }

    canEatChecker = (checkerNewPosition) => {
        const diference = Math.abs(checkerNewPosition.r - this.state.checkerBeingDragged.position.r) === 2;
        let previousSquare = null;
        let isEating = false;
        switch (this.state.checkerBeingDragged.checkerType) {
            case 'red':
                //moving to the right
                console.log(this.state.checkerBeingDragged.position.c - checkerNewPosition.c)
                if (this.state.checkerBeingDragged.position.c - checkerNewPosition.c === -2) {
                    //checking if position in between has a checker to be eated
                    previousSquare = this.state.boardMatrix[checkerNewPosition.r + 1][checkerNewPosition.c - 1];
                    isEating = previousSquare.props.hasChecker && previousSquare.props.checkerType === 'white';
                    
                }
                //moving to the left
                if (this.state.checkerBeingDragged.position.c - checkerNewPosition.c === 2) {
                    //checking if position in between has a checker to be eated
                    previousSquare = this.state.boardMatrix[checkerNewPosition.r + 1][checkerNewPosition.c + 1];
                    console.log(previousSquare);
                    isEating = previousSquare.props.hasChecker && previousSquare.props.checkerType === 'white';
                    console.log('should eat? ' + isEating)
                }
                break;

            case 'white':
                //moving to the right
                    if (this.state.checkerBeingDragged.position.c - checkerNewPosition.c === -2) {
                        previousSquare = this.state.boardMatrix[checkerNewPosition.r - 1][checkerNewPosition.c + 1];
                        isEating = previousSquare.props.hasChecker && previousSquare.props.checkerType === 'white';
                    }
                    //moving to the left
                    if (this.state.checkerBeingDragged.position.c - checkerNewPosition.c === 2) {
                        previousSquare = this.state.boardMatrix[checkerNewPosition.r - 1][checkerNewPosition.c - 1];
                        isEating = previousSquare.props.hasChecker && previousSquare.props.checkerType === 'white';
    
                    }
                break;
        }
        return isEating;
    }

    inmutableMatrixGenerator() {
        const newMatrix = [];
        for (let r = 0; r < this.state.boardMatrix.length; r++) {
            newMatrix.push(new Array(this.state.boardMatrix.length));
            for (let c = 0; c < this.state.boardMatrix[r].length; c++) {
                let oldElement = this.state.boardMatrix[r][c];
                newMatrix[r][c] = <GameBoardSquare {...oldElement.props} />
            }
        }
        return newMatrix;
    }

    componentDidMount() {
        const boardMatrix = [];
        for (let r = 0; r < this.state.utilityMatrix.length; r++) {
            boardMatrix.push(new Array(8));

            for (let c = 0; c < this.state.utilityMatrix[r].length; c++) {
                //if its a space that can hold a checker
                if (this.state.utilityMatrix[r][c] === 0) {
                    //to set checkers in their initial position
                    if (r === 5 || r === 6 || r === 7) {
                        boardMatrix[r][c] = <GameBoardSquare
                            type={0}
                            position={{ r: r, c: c }}
                            hasChecker={true}
                            checkerType='red'
                            canDropChecker={this.canDropChecker}
                            insertChecker={this.insertChecker}
                        />

                    } else if ((r === 0 || r === 1 || r === 2)) {
                        boardMatrix[r][c] = <GameBoardSquare
                            type={0}
                            position={{ r: r, c: c }}
                            hasChecker={true}
                            checkerType='white'
                            canDropChecker={this.canDropChecker}
                            insertChecker={this.insertChecker}
                        />


                    } else { //for the rest of the rows where there is no checkers in the initial position
                        boardMatrix[r][c] = <GameBoardSquare
                            type={0}
                            position={{ r: r, c: c }}
                            hasChecker={false}
                            checkerType='any'
                            canDropChecker={this.canDropChecker}
                            insertChecker={this.insertChecker}
                        />

                    }
                } else {
                    boardMatrix[r][c] = <GameBoardSquare
                        type={1}
                        canDropChecker={this.canDropChecker}
                        insertChecker={this.insertChecker} />
                }
            }
        }
        this.setState({ boardMatrix: boardMatrix })
    }

    render() {
        return (
            <GameContext.Provider value={{
                removeChecker: this.removeChecker,
                setCheckerBeingDragged: this.setCheckerBeingDragged,

            }}>
                <div className={classes.GameBoard}>
                    {this.state.boardMatrix}
                </div>
            </GameContext.Provider>
        );
    }

}

export default GameBoard;