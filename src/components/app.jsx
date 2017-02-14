import React from 'react';

import LevelSelector from './level-selector';
import NatureSelector from './nature-selector';

import 'react-select/dist/react-select.css';
import '../stylesheets/app.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>PokeRPG</h1>
        <LevelSelector />
        <NatureSelector />
      </div>
    );
  }
};
