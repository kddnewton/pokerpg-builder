import React, { Component } from "react";
import Select from "react-select";

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };
    this.update = this.update.bind(this);
  }

  random() {
    const { displays } = this.props;

    this.update(displays[Math.floor(Math.random() * displays.length)]);
  }

  update(value) {
    const { options, update } = this.props;

    this.setState({ selected: value });
    update(options[value ? value.value : null]);
  }

  render() {
    const { displays } = this.props;
    const { selected } = this.state;

    return <Select options={displays} onChange={this.update} value={selected} className="selector" />;
  }
}

export default Selector;
