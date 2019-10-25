import React from 'react';
import classes from './GameBoardSquare.module.css';
import Checker from '../Checker/Checker';
import { ItemTypes } from '../../Constants/ItemTypes';
import { useDrop } from 'react-dnd';

const SQUARE_ZERO = 0;
const GameBoardSquare = props => {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.CHECKER,
        drop: () => props.insertChecker(props.position),
        canDrop: () => props.canDropChecker(props.type, props.position, props.hasChecker),
        collect: mon => ({
            isOver: mon.isOver(),
            canDrop: mon.canDrop()
        }),
    })

    const displayPosition = (props.type === SQUARE_ZERO) ? <span style={{zIndex:100, color:'white'}}>{props.position.r + "," + props.position.c}</span> : null;

    const array_classes = [classes.Square];
    props.type === SQUARE_ZERO
        ? array_classes.push(classes.SquareZero)
        : array_classes.push(classes.SquareOne);

    const checker = props.hasChecker
        ? <Checker
            checkerType={props.checkerType}
            position={props.position}
        />
        : null;

   // const background = isOver && canDrop ? 'green' : 'none';

    return (
        <div ref={drop} className={array_classes.join(' ')}>
            {displayPosition}
            {checker}
        </div>
    )
}

export default GameBoardSquare;