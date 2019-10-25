import React, { useContext } from 'react';
import classes from './Checker.module.css';
import { ItemTypes } from '../../Constants/ItemTypes';
import { useDrag } from 'react-dnd'
import GameContext from '../../Context/GameContext';


const Checker = props => {

    const myContext = useContext(GameContext);

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CHECKER },
        begin: () => myContext.setCheckerBeingDragged(props.position, props.checkerType),
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                return; //in case we drop the checker outside of the board
            }
            myContext.removeChecker(props.position);

        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),

        }),
    })


    const array_classes = [classes.Checker];
    props.checkerType === 'red' ? array_classes.push(classes.Red) : array_classes.push(classes.White);

    return (
        <div
            className={array_classes.join(' ')}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            ref={drag} />
    )
}

export default Checker;