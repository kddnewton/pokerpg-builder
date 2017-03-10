import React, { PropTypes } from "react";

const PokeDisplay = ({ poke, level }) => {
  const hitPointsDisplay = level + poke.hp * 3 + 10;

  return (
    <dl>
      <dt>HP</dt>
      <dd>{hitPointsDisplay}</dd>
      <dt>Attack</dt>
      <dd>{poke.attack}</dd>
      <dt>Defense</dt>
      <dd>{poke.defense}</dd>
      <dt>Special Atk</dt>
      <dd>{poke.sAtk}</dd>
      <dt>Special Def</dt>
      <dd>{poke.sDef}</dd>
      <dt>Speed</dt>
      <dd>{poke.speed}</dd>
    </dl>
  );
};

PokeDisplay.propTypes = {
  poke: PropTypes.any.isRequired,
  level: PropTypes.number.isRequired
};

export default PokeDisplay;
