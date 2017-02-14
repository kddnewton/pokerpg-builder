import React from 'react';
import Select from 'react-select';

const natures = {};
const options = [];

require('../config/natures.csv').forEach(nature => {
  natures[nature.Nature] = nature;
  options.push({ value: nature.Nature, label: nature.Nature });
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
    this.props.updateNature(natures[newValue.value]);
  },

  render() {
    return <Select options={options} onChange={this.updateValue} value={this.state.selected} />;
  }
});
