import React, { PropTypes } from "react";

const PokeDisplay = ({ pokemon, level }) => {
  const hitPointsDisplay = level + pokemon.hp * 3 + 10;

  return (
    <dl>
      <dt>HP</dt>
      <dd>{hitPointsDisplay}</dd>
      <dt>Attack</dt>
      <dd>{pokemon.attack}</dd>
      <dt>Defense</dt>
      <dd>{pokemon.defense}</dd>
      <dt>Special Atk</dt>
      <dd>{pokemon.sAtk}</dd>
      <dt>Special Def</dt>
      <dd>{pokemon.sDef}</dd>
      <dt>Speed</dt>
      <dd>{pokemon.speed}</dd>
    </dl>
  );
};

PokeDisplay.propTypes = {
  pokemon: PropTypes.any.isRequired,
  level: PropTypes.number.isRequired
};

export default PokeDisplay;
