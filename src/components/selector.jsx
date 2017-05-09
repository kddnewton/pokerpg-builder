import React from "react";
import Select from "react-select";

export default class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.update = this.update.bind(this);
  }

  random() {
    const displays = this.props.displays;
    this.update(displays[Math.floor(Math.random() * displays.length)]);
  }

  update(value) {
    const selected = value ? value.value : null;
    this.setState({ selected });
    this.props.update(this.props.options[selected]);
  }

  render() {
    return (
      <Select
        options={this.props.displays}
        onChange={this.update}
        value={this.state.selected}
      />
    );
  }
}
