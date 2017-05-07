import React from "react";
import Selector from "./selector";
import PokeDisplay from "./poke-display";

import {
  levelSelectorProps,
  natureSelectorProps,
  pokemonSelectorProps,
  algorithmSelectorProps
} from "../lib/selector-props";
import leveler from "../lib/leveler";

import "react-select/dist/react-select.css";
import "../application";
import pdfPath from "../PokeRPG-Base-Stat-Info";

export default React.createClass({
  getInitialState() {
    return {
      level: null,
      nature: null,
      pokemon: null,
      algorithm: null
    };
  },

  randomNature(event) {
    event.preventDefault();
    this.refs.nature.random();
  },

  updateLevel(level) {
    this.setState({ level: level });
  },

  updateNature(nature) {
    this.setState({ nature: nature });
  },

  updatePokemon(pokemon) {
    this.setState({ pokemon: pokemon });
  },

  updateAlgorithm(algorithm) {
    this.setState({ algorithm: algorithm });
  },

  render() {
    let pokeDisplay = "";
    let state = this.state;

    if (state.level && state.nature && state.pokemon && state.algorithm) {
      const leveled = leveler(
        state.level,
        state.nature,
        state.pokemon,
        state.algorithm
      );
      pokeDisplay = <PokeDisplay poke={leveled} level={state.level} />;
    }

    const defaultClassName =
      "col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3";

    return (
      <div>
        <header>
          PokeRPG Pokemon Builder
          <a href={pdfPath} className="pull-right">
            <span className="glyphicon glyphicon-file" /> (PDF)
          </a>
        </header>
        <div className="container">
          <div className="row">
            <div className={defaultClassName}>
              <strong>Pokemon</strong>
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <Selector {...pokemonSelectorProps(this.updatePokemon)} />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <strong>Level</strong>
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <Selector {...levelSelectorProps(this.updateLevel)} />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <strong>Nature</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3">
              <a
                className="btn btn-primary"
                href="#"
                onClick={this.randomNature}
              >
                Random
              </a>
            </div>
            <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5">
              <Selector
                ref="nature"
                {...natureSelectorProps(this.updateNature)}
              />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <strong>Algorithm</strong>
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <Selector {...algorithmSelectorProps(this.updateAlgorithm)} />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              {pokeDisplay}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
