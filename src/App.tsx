import * as React from "react";

import { AlgorithmName, Nature, Pokemon, PokemonSpec } from "./typings";
import leveler from "./leveler";
import "./styles.css";

const natures = require("./natures.csv") as Nature[];
const pokemon = require("./pokemon.csv") as PokemonSpec[];

const ReactSelect = React.lazy(() => import("react-select"));

type SelectValue = any;
type SelectProps = {
  options: { label: string | number, value: SelectValue }[];
  value: SelectValue;
  onChange: (value: SelectValue) => void;
};

const Select = ({ options, value, onChange }: SelectProps) => (
  <ReactSelect
    className="select"
    options={options}
    value={value}
    onChange={onChange}
  />
);

type ContainerProps = {
  children: React.ReactNode;
};

const makeContainer = (className: string) => ({ children }: ContainerProps) => (
  <div className={className}>{children}</div>
);

const Container = makeContainer("container");
const Row = makeContainer("row");
const Cols = makeContainer("col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3");
const ButtonCols = makeContainer("col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3");
const RestCols = makeContainer("col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5");
const SplitCols = makeContainer("col-xs-6");
const Well = makeContainer("well");

type ButtonProps = ContainerProps & {
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => (
  <button type="button" className="btn btn-primary" onClick={onClick}>
    {children}
  </button>
);

const Label = ({ children }: ContainerProps) => (
  <Row>
    <Cols>
      <strong>{children}</strong>
    </Cols>
  </Row>
);

const Text = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const makePokemonOpt = (spec: PokemonSpec) => {
  const value: Pokemon = {
    number: spec.Number,
    name: spec.Name,
    hp: parseInt(spec.HP, 10),
    attack: parseInt(spec.Attack, 10),
    defense: parseInt(spec.Defense, 10),
    sAtk: parseInt(spec["Special Attack"], 10),
    sDef: parseInt(spec["Special Defense"], 10),
    speed: parseInt(spec.Speed, 10)
  };

  let label = value.name;
  if (value.number) {
    label = `(#${value.number}) ${value.name}`;
  }

  return { label, value };
};

type PokemonOpt = { label: string, value: Pokemon };
const pokemonOpts: PokemonOpt[] = pokemon.map(makePokemonOpt);

type LevelOpt = { label: number, value: number };
const levelOpts: LevelOpt[] = Array(100).fill(0).map((_zero, level) => ({
  label: level + 1,
  value: level + 1
}));

type NatureOpt = { label: string, value: Nature };
const natureOpts: NatureOpt[] = natures.map((nature: Nature) => ({
  label: nature.Nature,
  value: nature
}));

type AlgorithmOpt = { label: string, value: AlgorithmName };
const algorithmOpts: AlgorithmOpt[] = [
  { label: "Random", value: "Random" },
  { label: "Even", value: "Even" }
];

const getRandomNature = () => natureOpts[Math.floor(Math.random() * natureOpts.length)];

const App = () => {
  const [pokemonOpt, setPokemonOpt] = React.useState<PokemonOpt>(pokemonOpts[0]);
  const [levelOpt, setLevelOpt] = React.useState<LevelOpt>(levelOpts[0]);
  const [natureOpt, setNatureOpt] = React.useState<NatureOpt>(getRandomNature());
  const [algorithmOpt, setAlgorithmOpt] = React.useState<AlgorithmOpt>(algorithmOpts[0]);

  const onRandomNatureClick = () => setNatureOpt(getRandomNature());

  const poke = leveler(levelOpt.value, natureOpt.value, pokemonOpt.value, algorithmOpt.value);
  const hp = levelOpt.value + poke.hp * 3 + 10;

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
      <React.Suspense fallback={null}>
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
      </React.Suspense>
    </>
  );
};

export default App;
