import React, { Component } from "react";
import Select from "react-select";

import PokeDisplay from "./PokeDisplay";

import { levelOptions, natureOptions, pokemonOptions, algorithmOptions } from "../lib/options";
import leveler from "../lib/leveler";

import "../application";

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

class Application extends Component {
  constructor(props) {
    super(props);

    this.natureSelector = React.createRef();

    this.state = {
      level: null,
      nature: null,
      pokemon: null,
      algorithm: null
    };

    this.handlePokemonChange = this.handlePokemonChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleNatureChange = this.handleNatureChange.bind(this);
    this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
    this.handleRandomNatureClick = this.handleRandomNatureClick.bind(this);
  }

  handlePokemonChange(pokemon) {
    this.setState({ pokemon });
  }

  handleLevelChange(level) {
    this.setState({ level });
  }

  handleNatureChange(nature) {
    this.setState({ nature });
  }

  handleAlgorithmChange(algorithm) {
    this.setState({ algorithm });
  }

  handleRandomNatureClick(event) {
    event.preventDefault();
    this.setState({ nature: natureOptions[Math.floor(Math.random() * natureOptions.length)] });
  }

  render() {
    const { level, nature, pokemon, algorithm } = this.state;

    let pokeDisplay = "";
    if (level && nature && pokemon && algorithm) {
      const leveled = leveler(level.value, nature.value, pokemon.value, algorithm.value);
      pokeDisplay = <PokeDisplay poke={leveled} level={level.value} />;
    }

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
              onChange={this.handlePokemonChange}
            />
          </Input>
          <Input name="Level">
            <Select
              className="select"
              options={levelOptions}
              value={level}
              onChange={this.handleLevelChange}
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
                onClick={this.handleRandomNatureClick}
              >
                Random
              </button>
            </div>
            <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5">
              <Select
                ref={this.natureSelector}
                className="select"
                options={natureOptions}
                value={nature}
                onChange={this.handleNatureChange}
              />
            </div>
          </div>
          <Input name="Algorithm">
            <Select
              className="select"
              options={algorithmOptions}
              value={algorithm}
              onChange={this.handleAlgorithmChange}
            />
          </Input>
          <Row>{pokeDisplay}</Row>
        </div>
      </>
    );
  }
}

export default Application;
