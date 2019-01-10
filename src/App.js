import React, { useState, useCallback } from "react";
import Select from "react-select";

import pokemon from "./pokemon";
import natures from "./natures";
import leveler from "./leveler";
import "./styles";

const pokemonOptions = pokemon.reduce((accum, spec) => {
  if (!spec.Name) {
    return accum;
  }

  const poke = {
    number: spec.Number,
    name: spec.Name,
    hp: parseInt(spec.HP),
    attack: parseInt(spec.Attack),
    defense: parseInt(spec.Defense),
    sAtk: parseInt(spec["Special Attack"]),
    sDef: parseInt(spec["Special Defense"]),
    speed: parseInt(spec.Speed)
  };

  let label = poke.name;
  if (poke.number) {
    label = `(#${poke.number}) ${poke.name}`;
  }

  return [...accum, { label, value: poke }];
}, []);

const levelOptions = [...Array(100).keys()].map(level => ({
  label: level + 1, value: level + 1
}));

const natureOptions = natures.map(nature => ({
  label: nature.Nature, value: nature
}));

const algorithmOptions = [
  { label: "Random", value: "Random" },
  { label: "Even", value: "Even" }
];

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
  const [levelOption, setLevelOption] = useState(null);
  const [natureOption, setNatureOption] = useState(null);
  const [pokemonOption, setPokemonOption] = useState(null);
  const [algorithmOption, setAlgorithmOption] = useState(null);

  const onRandomNatureClick = useCallback(event => {
    event.preventDefault();
    setNatureOption(natureOptions[Math.floor(Math.random() * natureOptions.length)]);
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
            value={pokemonOption}
            onChange={setPokemonOption}
          />
        </Input>
        <Input name="Level">
          <Select
            className="select"
            options={levelOptions}
            value={levelOption}
            onChange={setLevelOption}
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
              value={natureOption}
              onChange={setNatureOption}
            />
          </div>
        </div>
        <Input name="Algorithm">
          <Select
            className="select"
            options={algorithmOptions}
            value={algorithmOption}
            onChange={setAlgorithmOption}
          />
        </Input>
        <Row>
          {levelOption && natureOption && pokemonOption && algorithmOption && (
            <PokeDisplay
              poke={leveler(levelOption.value, natureOption.value, pokemonOption.value, algorithmOption.value)}
              level={levelOption.value}
            />
          )}
        </Row>
      </div>
    </>
  );
};

export default Application;
