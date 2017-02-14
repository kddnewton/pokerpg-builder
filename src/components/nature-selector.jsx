import React from 'react';
import Select from 'react-select';

import data from '../config/natures.csv';

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
    const options = data.map(nature => {
      return { value: nature.Nature, label: nature.Nature };
    });
    return <Select options={options} onChange={this.updateValue} value={this.state.selected} />;
  }
});
