import React, { PropTypes } from "react";

const PokeDisplay = ({ poke, level }) => {
  const hitPointsDisplay = level + poke.hp * 3 + 10;

  return (
    <div className="row">
      <div
        className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3"
      >
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
      </div>
    </div>
  );
};

PokeDisplay.propTypes = {
  poke: PropTypes.any.isRequired,
  level: PropTypes.number.isRequired
};

export default PokeDisplay;
