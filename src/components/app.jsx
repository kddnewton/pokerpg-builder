import React from 'react';
import NatureSelector from './nature-selector';
import '../stylesheets/app.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>PokeRPG</h1>
        <NatureSelector />
      </div>
    );
  }
};
