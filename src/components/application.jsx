import React, { Component } from "react";

import Selector from "./selector";
import PokeDisplay from "./poke-display";

import { levelSelectorProps, natureSelectorProps, pokemonSelectorProps, algorithmSelectorProps } from "../lib/selector-props";
import leveler from "../lib/leveler";

import "../application";
import pdfPath from "../PokeRPG-Base-Stat-Info";

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: null,
      nature: null,
      pokemon: null,
      algorithm: null
    };
  }

  render() {
    let pokeDisplay = "";
    const { level, nature, pokemon, algorithm } = this.state;

    if (level && nature && pokemon && algorithm) {
      const leveled = leveler(level, nature, pokemon, algorithm);
      pokeDisplay = <PokeDisplay poke={leveled} level={level} />;
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
              <Selector
                {...pokemonSelectorProps(pokemonOption => {
                  this.setState({ pokemon: pokemonOption });
                })}
              />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <strong>Level</strong>
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <Selector
                {...levelSelectorProps(levelOption => {
                  this.setState({ level: levelOption });
                })}
              />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>
              <strong>Nature</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-2 col-sm-offset-1 col-md-offset-2 col-lg-1 col-lg-offset-3">
              <button
                className="btn btn-primary"
                onClick={event => {
                  event.preventDefault();
                  this.natureSelector.random();
                }}
              >
                Random
              </button>
            </div>
            <div className="col-xs-9 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-6 col-lg-5">
              <Selector
                ref={natureSelector => {
                  this.natureSelector = natureSelector;
                }}
                {...natureSelectorProps(natureOption => {
                  this.setState({ nature: natureOption });
                })}
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
              <Selector
                {...algorithmSelectorProps(algorithmOption => {
                  this.setState({ algorithm: algorithmOption });
                })}
              />
            </div>
          </div>
          <div className="row">
            <div className={defaultClassName}>{pokeDisplay}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Application;
