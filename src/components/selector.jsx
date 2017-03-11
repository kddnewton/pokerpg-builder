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
      <div className="row">
        <div
          className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"
        >
          <strong>{this.props.label}</strong>
          <Select
            options={this.props.displays}
            onChange={this.update}
            value={this.state.selected}
          />
        </div>
      </div>
    );
  }
});

Selector.propTypes = {
  options: PropTypes.any,
  displays: PropTypes.arrayOf(PropTypes.any).isRequired,
  update: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Selector;
