import React from 'react';
import Select from 'react-select';

const pokemon = {};
const options = [];
const stats = ['HP', 'Attack', 'Defense', 'Special Atk', 'Special Def', 'Speed'];

require('../config/pokemon.csv').forEach(poke => {
  stats.forEach(stat => poke[stat] = parseInt(poke[stat]));
  pokemon[poke.Number] = poke;
  options.push({ value: poke.Number, label: `(#${poke.Number}) ${poke.Name}` });
});

export default React.createClass({
  getInitialState() {
    return { selected: null };
  },

  updateValue(newValue) {
    if (!newValue) {
      newValue = { value: null };
    }
    this.setState({ selected: newValue.value });
    this.props.updatePokemon(pokemon[newValue.value]);
  },

  render() {
    return <Select options={options} onChange={this.updateValue} value={this.state.selected} />;
  }
});
