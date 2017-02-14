import React from 'react';

export default React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <dl>
        <dt>HP</dt>
        <dd>{this.state.hp}</dd>
        <dt>Attack</dt>
        <dd>{this.state.attack}</dd>
        <dt>Defense</dt>
        <dd>{this.state.defense}</dd>
        <dt>Special Atk</dt>
        <dd>{this.state.specialAtk}</dd>
        <dt>Special Def</dt>
        <dd>{this.state.specialDef}</dd>
        <dt>Speed</dt>
        <dd>{this.state.speed}</dd>
      </dl>
    );
  }
});
