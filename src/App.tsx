import React, { useState } from "react";
import type { default as StateManagedSelect, OnChangeValue } from "react-select";

import { AlgorithmName, Nature, Pokemon, PokemonSpec } from "./typings";
import leveler from "./leveler";
import "./styles.css";

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports */
const natures = require("./natures.csv").default as Nature[];
const pokemon = require("./pokemon.csv").default as PokemonSpec[];

// Explicit casting here as otherwise we can't use the generic
const ReactSelect = React.lazy(() => import("react-select")) as StateManagedSelect;

// Explicitly not handling null here and forcing our way around the types
type SelectProps<T> = { options: T[], value: T, onChange: (value: T) => void };
type SelectOnChange<T> = (newValue: OnChangeValue<T, false>) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Select = <T extends { label: string | number, value: any, key: string }>(
  { options, value, onChange }: SelectProps<T>
) => (
  <React.Suspense fallback={
    <select className="select fallback" value={value.key} disabled>
      {options.map((opt) => (
        <option key={opt.key} value={opt.key}>{opt.label}</option>
      ))}
    </select>
  }>
    <ReactSelect<T>
      className="select"
      options={options}
      value={value}
      onChange={onChange as SelectOnChange<T>}
    />
  </React.Suspense>
);

type ContentContainer = React.FC<{ children: React.ReactNode }>;
const makeContainer = (displayName: string, className: string): ContentContainer => {
  const container: ContentContainer = ({ children }) => <div className={className}>{children}</div>;
  container.displayName = displayName;

  return container;
};

const Container = makeContainer("Container", "container");
const Row = makeContainer("Row", "row");
const Cols = makeContainer("Cols", "col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3");
const ButtonCols = makeContainer("ButtonCols", "col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3");
const RestCols = makeContainer("RestCols", "col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5");
const SplitCols = makeContainer("SplitCols", "col-xs-6");
const Well = makeContainer("Well", "well");

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button type="button" className="btn btn-primary" onClick={onClick}>
    {children}
  </button>
);

const Label: ContentContainer = ({ children }) => (
  <Row>
    <Cols>
      <strong>{children}</strong>
    </Cols>
  </Row>
);

const Text: ContentContainer = ({ children }) => (
  <>{children}</>
);

type PokemonOpt = { label: string; value: Pokemon, key: string };
type LevelOpt = { label: number; value: number, key: string };
type NatureOpt = { label: string; value: Nature, key: string };
type AlgorithmOpt = { label: string; value: AlgorithmName, key: string };

const makePokemonOpt = (spec: PokemonSpec): PokemonOpt => {
  const value = {
    number: spec.Number,
    name: spec.Name,
    hp: parseInt(spec.HP, 10),
    attack: parseInt(spec.Attack, 10),
    defense: parseInt(spec.Defense, 10),
    sAtk: parseInt(spec["Special Attack"], 10),
    sDef: parseInt(spec["Special Defense"], 10),
    speed: parseInt(spec.Speed, 10)
  };

  const label = `(#${value.number}) ${value.name}`;
  return { label, value, key: label };
};

const pokemonOpts: PokemonOpt[] = pokemon.map(makePokemonOpt);

const levelOpts: LevelOpt[] = Array(100).fill(0).map((_zero, level) => ({
  label: level + 1,
  value: level + 1,
  key: (level + 1).toString()
}));

const natureOpts: NatureOpt[] = natures.map((nature: Nature) => ({
  label: nature.Nature,
  value: nature,
  key: nature.Nature
}));

const algorithmOpts: AlgorithmOpt[] = [
  { label: "Random", value: "Random", key: "Random" },
  { label: "Even", value: "Even", key: "Even" }
];

const getRandomNature = () => natureOpts[Math.floor(Math.random() * natureOpts.length)];

const App: React.FC = () => {
  const [pokemonOpt, setPokemonOpt] = useState<PokemonOpt>(pokemonOpts[0]);
  const [levelOpt, setLevelOpt] = useState<LevelOpt>(levelOpts[0]);
  const [natureOpt, setNatureOpt] = useState<NatureOpt>(getRandomNature());
  const [algorithmOpt, setAlgorithmOpt] = useState<AlgorithmOpt>(algorithmOpts[0]);

  const onRandomNatureClick = () => setNatureOpt(getRandomNature());

  const poke = leveler(levelOpt.value, natureOpt.value, pokemonOpt.value, algorithmOpt.value);
  const hp = levelOpt.value + poke.hp * 3 + 10;

  console.log({natureOpt});

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
                    <li>{hp}</li>
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
