import React, { useState, useCallback } from "react";
import ReactSelect from "react-select";

import leveler from "./leveler";
import natures from "./natures.csv";
import pokemon from "./pokemon.csv";
import "./styles.css";

const makePokemonOpt = spec => {
  const value = {
    number: spec.Number,
    name: spec.Name,
    hp: parseInt(spec.HP),
    attack: parseInt(spec.Attack),
    defense: parseInt(spec.Defense),
    sAtk: parseInt(spec["Special Attack"]),
    sDef: parseInt(spec["Special Defense"]),
    speed: parseInt(spec.Speed)
  };

  let label = value.name;
  if (value.number) {
    label = `(#${value.number}) ${value.name}`;
  }

  return { label, value };
};

const pokemonOpts = pokemon.filter(({ Name }) => Name).map(makePokemonOpt);
const levelOpts = [...Array(100).keys()].map(level => ({ label: level + 1, value: level + 1 }));
const natureOpts = natures.map(nature => ({ label: nature.Nature, value: nature }));
const algorithmOpts = [{ label: "Random", value: "Random" }, { label: "Even", value: "Even" }];

const makeContainer = className => ({ children }) => <div className={className}>{children}</div>;

const Container = makeContainer("container");
const Row = makeContainer("row");
const Cols = makeContainer("col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3");
const ButtonCols = makeContainer("col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3");
const RestCols = makeContainer("col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5");
const SplitCols = makeContainer("col-xs-6");
const Well = makeContainer("well");

const Button = ({ children, onClick }) => (
  <button type="button" className="btn btn-primary" onClick={onClick}>
    {children}
  </button>
);

const Label = ({ children }) => (
  <Row>
    <Cols>
      <strong>{children}</strong>
    </Cols>
  </Row>
);

const Select = props => <ReactSelect className="select" {...props} />;

const Text = ({ children }) => children;

const getRandomNature = () => natureOpts[Math.floor(Math.random() * natureOpts.length)];

const App = () => {
  const [pokemonOpt, setPokemonOpt] = useState(pokemonOpts[0]);
  const [levelOpt, setLevelOpt] = useState(levelOpts[0]);
  const [natureOpt, setNatureOpt] = useState(getRandomNature());
  const [algorithmOpt, setAlgorithmOpt] = useState(algorithmOpts[0]);

  const onRandomNatureClick = useCallback(() => setNatureOpt(getRandomNature()), []);

  const poke = leveler(levelOpt.value, natureOpt.value, pokemonOpt.value, algorithmOpt.value);

  return (
    <>
      <header>
        <Text>PokeRPG Pokemon Builder</Text>
        <a href="PokeRPG-Base-Stat-Info.pdf" className="pull-right">
          <span className="glyphicon glyphicon-file" />
          {" "}
          <Text>(PDF)</Text>
        </a>
      </header>
      <Container>
        <Label>
          <Text>Pokemon</Text>
        </Label>
        <Row>
          <Cols>
            <Select options={pokemonOpts} value={pokemonOpt} onChange={setPokemonOpt} />
          </Cols>
        </Row>
        <Label>
          <Text>Level</Text>
        </Label>
        <Row>
          <Cols>
            <Select options={levelOpts} value={levelOpt} onChange={setLevelOpt} />
          </Cols>
        </Row>
        <Label>
          <Text>Nature</Text>
        </Label>
        <Row>
          <ButtonCols>
            <Button onClick={onRandomNatureClick}>
              <Text>Random</Text>
            </Button>
          </ButtonCols>
          <RestCols>
            <Select options={natureOpts} value={natureOpt} onChange={setNatureOpt} />
          </RestCols>
        </Row>
        <Label>
          <Text>Algorithm</Text>
        </Label>
        <Row>
          <Cols>
            <Select options={algorithmOpts} value={algorithmOpt} onChange={setAlgorithmOpt} />
          </Cols>
        </Row>
        <Row>
          <Cols>
            <Well>
              <Row>
                <SplitCols>
                  <ul className="list-unstyled text-right strong">
                    <li>
                      <Text>HP</Text>
                    </li>
                    <li>
                      <Text>Attack</Text>
                    </li>
                    <li>
                      <Text>Defense</Text>
                    </li>
                    <li>
                      <Text>Special Attack</Text>
                    </li>
                    <li>
                      <Text>Special Defense</Text>
                    </li>
                    <li>
                      <Text>Speed</Text>
                    </li>
                  </ul>
                </SplitCols>
                <SplitCols>
                  <ul className="list-unstyled">
                    <li>{levelOpt.value + poke.hp * 3 + 10}</li>
                    <li>{poke.attack}</li>
                    <li>{poke.defense}</li>
                    <li>{poke.sAtk}</li>
                    <li>{poke.sDef}</li>
                    <li>{poke.speed}</li>
                  </ul>
                </SplitCols>
              </Row>
            </Well>
          </Cols>
        </Row>
      </Container>
    </>
  );
};

export default App;
