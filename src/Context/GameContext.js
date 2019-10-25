import React from 'react';

const GameContext = React.createContext({
    setCheckerBeingDragged: () => {},
    removeChecker: () => {}
});

export default GameContext;