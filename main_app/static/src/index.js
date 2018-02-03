import React from 'react';
import { render } from 'react-dom';
import Board from './components/Board';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <h1>Hello Better Team!</h1>
    <Board />
  </div>
);

render(<App />, document.getElementById('root'));
