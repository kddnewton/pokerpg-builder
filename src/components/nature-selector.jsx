import React from 'react';
import Select from 'react-select';

const options = require('../config/natures.csv').map(nature => {
  return { value: nature.Nature, label: nature.Nature };
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
