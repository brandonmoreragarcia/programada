import React from 'react';
import Layout from './components/UI/Layout/Layout';
import Home from './containers/Home/Home';
import { Route, Redirect, Switch } from 'react-router-dom';
import Game from './containers/Game/Game';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>

      <Layout>
        <Switch>

          <Route path="/game" component={Game} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" /> {/* to avoid unknown route's error */}

        </Switch>
      </Layout>

    </DndProvider>
  );
}

export default App;
