import React from 'react';
import Select from 'react-select';

const options = [...Array(100).keys()].map(level => {
  return { value: level + 1, label: level + 1 };
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
    this.props.updateLevel(newValue.value);
  },

  render() {
    return <Select options={options} onChange={this.updateValue} value={this.state.selected} />;
  }
});
