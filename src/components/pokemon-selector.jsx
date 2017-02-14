import React from 'react';
import Select from 'react-select';

const options = require('../config/pokemon.csv').map(pokemon => {
  return { value: pokemon.Number, label: `(#${pokemon.Number}) ${pokemon.Name}` };
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
  },

  render() {
    return <Select options={options} onChange={this.updateValue} value={this.state.selected} />;
  }
});
