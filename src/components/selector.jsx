import React, { PropTypes } from "react";
import Select from "react-select";

const Selector = React.createClass({
  getInitialState() {
    return { selected: null };
  },

  update(newValue) {
    if (!newValue) {
      newValue = { value: null };
    }
    this.setState({ selected: newValue.value });
    this.props.update(this.props.options[newValue.value]);
  },

  render() {
    return (
      <Select
        options={this.props.displays}
        onChange={this.update}
        value={this.state.selected}
      />
    );
  }
});

Selector.propTypes = {
  options: PropTypes.any,
  displays: PropTypes.arrayOf(PropTypes.any).isRequired,
  update: PropTypes.func.isRequired
};

export default Selector;
