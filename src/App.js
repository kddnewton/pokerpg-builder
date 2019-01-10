import React, { useState, useCallback } from "react";
import Select from "react-select";

import { levelOptions, natureOptions, pokemonOptions, algorithmOptions } from "./options";
import leveler from "./leveler";

import "./styles";

const Row = ({ children }) => (
  <div className="row">
    <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      {children}
    </div>
  </div>
);

const Input = ({ children, name }) => (
  <>
    <Row>
      <strong>{name}</strong>
    </Row>
    <Row>
      {children}
    </Row>
  </>
);

const PokeDisplay = ({ poke, level }) => (
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
        <li>{level + poke.hp * 3 + 10}</li>
        <li>{poke.attack}</li>
        <li>{poke.defense}</li>
        <li>{poke.sAtk}</li>
        <li>{poke.sDef}</li>
        <li>{poke.speed}</li>
      </ul>
    </div>
  </div>
);

const Application = () => {
  const [level, setLevel] = useState(null);
  const [nature, setNature] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [algorithm, setAlgorithm] = useState(null);

  const onRandomNatureClick = useCallback(event => {
    event.preventDefault();
    setNature(natureOptions[Math.floor(Math.random() * natureOptions.length)]);
  });

  return (
    <>
      <header>
        PokeRPG Pokemon Builder
        <a href="PokeRPG-Base-Stat-Info.pdf" className="pull-right">
          <span className="glyphicon glyphicon-file" /> (PDF)
        </a>
      </header>
      <div className="container">
        <Input name="Pokemon">
          <Select
            className="select"
            options={pokemonOptions}
            value={pokemon}
            onChange={setPokemon}
          />
        </Input>
        <Input name="Level">
          <Select
            className="select"
            options={levelOptions}
            value={level}
            onChange={setLevel}
          />
        </Input>
        <Row>
          <strong>Nature</strong>
        </Row>
        <div className="row">
          <div className="col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onRandomNatureClick}
            >
              Random
            </button>
          </div>
          <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5">
            <Select
              className="select"
              options={natureOptions}
              value={nature}
              onChange={setNature}
            />
          </div>
        </div>
        <Input name="Algorithm">
          <Select
            className="select"
            options={algorithmOptions}
            value={algorithm}
            onChange={setAlgorithm}
          />
        </Input>
        <Row>
          {level && nature && pokemon && algorithm && (
            <PokeDisplay
              poke={leveler(level.value, nature.value, pokemon.value, algorithm.value)}
              level={level.value}
            />
          )}
        </Row>
      </div>
    </>
  );
};

export default Application;
