import React from 'react';

import PokemonSelector from './pokemon-selector';
import LevelSelector from './level-selector';
import NatureSelector from './nature-selector';
import PokeDisplay from './poke-display';

import 'react-select/dist/react-select.css';
import '../stylesheets/app.css';

export default React.createClass({
  getInitialState() {
    return {
      level: null,
      nature: null,
      pokemon: null
    }
  },

  updateLevel(level) {
    this.setState({ level: level });
  },

  updateNature(nature) {
    this.setState({ nature: nature });
  },

  updatePokemon(pokemon) {
    this.setState({ pokemon: pokemon });
  },

  render() {
    return (
      <div className="container">
        <h1>PokeRPG</h1>
        <PokemonSelector updatePokemon={this.updatePokemon} />
        <LevelSelector updateLevel={this.updateLevel} />
        <NatureSelector updateNature={this.updateNature} />
        <PokeDisplay
          level={this.state.level}
          nature={this.state.nature}
          pokemon={this.state.pokemon}
        />
      </div>
    );
  }
});
