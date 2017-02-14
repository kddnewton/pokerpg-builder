import React from 'react';

export default React.createClass({
  /** Calculation functions **/

  calculate(nextProps) {
    const newState = nextProps.pokemon;
    newState[nextProps.nature.Raise] += this.incrementFrom(nextProps.nature.Raise);
    newState[nextProps.nature.Lower] = Math.max(
      1,
      newState[nextProps.nature.Lower] - this.incrementFrom(nextProps.nature.Lower)
    );

    newState.level = nextProps.level;
    return newState;
  },

  hitPointsDisplay() {
    if (this.state.level && this.state.HP) {
      return this.state.level + (this.state.HP * 3) + 10;
    } else {
      return null;
    }
  },

  incrementFrom(statName) {
    return statName == "HP" ? 1 : 2;
  },

  /** Component functions **/

  getInitialState() {
    return {};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.level && nextProps.nature && nextProps.pokemon) {
      this.setState(this.calculate(nextProps));
    } else {
      this.setState({});
    }
  },

  render() {
    if (this.state.level && this.state.HP) {
      const hitPointsDisplay = this.state.level + (this.state.HP * 3) + 10;
    } else {
      const hitPointsDisplay = null;
    }

    return (
      <dl>
        <dt>HP</dt>
        <dd>{this.hitPointsDisplay()}</dd>
        <dt>Attack</dt>
        <dd>{this.state.Attack}</dd>
        <dt>Defense</dt>
        <dd>{this.state.Defense}</dd>
        <dt>Special Atk</dt>
        <dd>{this.state['Special Atk']}</dd>
        <dt>Special Def</dt>
        <dd>{this.state['Special Def']}</dd>
        <dt>Speed</dt>
        <dd>{this.state.Speed}</dd>
      </dl>
    );
  }
});
