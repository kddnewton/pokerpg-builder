import React from "react";

const PokeDisplay = ({ poke, level }) => {
  const hitPointsDisplay = level + poke.hp * 3 + 10;

  return (
    <div className="well poke-display clearfix">
      <div className="col-xs-6">
        <ul className="list-unstyled text-right strong">
          <li>HP</li>
          <li>Attack</li>
          <li>Defense</li>
          <li>Special Attack</li>
          <li>Special Defense</li>
          <li>Speed</li>
        </ul>
      </div>
      <div className="col-xs-6">
        <ul className="list-unstyled">
          <li>{hitPointsDisplay}</li>
          <li>{poke.attack}</li>
          <li>{poke.defense}</li>
          <li>{poke.sAtk}</li>
          <li>{poke.sDef}</li>
          <li>{poke.speed}</li>
        </ul>
      </div>
    </div>
  );
};

export default PokeDisplay;
