import React, { Component } from "react";
import Select from "react-select";

import PokeDisplay from "./PokeDisplay";

import { levelOptions, natureOptions, pokemonOptions, algorithmOptions } from "../lib/selector-props";
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

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };
    this.update = this.update.bind(this);
  }

  random() {
    const { options } = this.props;

    this.update(options[Math.floor(Math.random() * displays.length)]);
  }

  update(option) {
    const { onChange } = this.props;

    this.setState({ selected: option });
    onChange(option ? option.value : null);
  }

  render() {
    const { options } = this.props;
    const { selected } = this.state;

    return <Select options={options} onChange={this.update} value={selected} className="selector" />;
  }
}

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

  render() {
    let pokeDisplay = "";
    const { level, nature, pokemon, algorithm } = this.state;

    if (level && nature && pokemon && algorithm) {
      const leveled = leveler(level, nature, pokemon, algorithm);
      pokeDisplay = <PokeDisplay poke={leveled} level={level} />;
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
            <Selector options={pokemonOptions} onChange={this.handlePokemonChange} />
          </Input>
          <Input name="Level">
            <Selector options={levelOptions} onChange={this.handleLevelChange} />
          </Input>
          <Row>
            <strong>Nature</strong>
          </Row>
          <div className="row">
            <div className="col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={event => {
                  event.preventDefault();
                  this.natureSelector.current.random();
                }}
              >
                Random
              </button>
            </div>
            <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5">
              <Selector ref={this.natureSelector} options={natureOptions} onChange={this.handleNatureChange} />
            </div>
          </div>
          <Input name="Algorithm">
            <Selector options={algorithmOptions} onChange={this.handleAlgorithmChange} />
          </Input>
          <Row>{pokeDisplay}</Row>
        </div>
      </>
    );
  }
}

export default Application;
