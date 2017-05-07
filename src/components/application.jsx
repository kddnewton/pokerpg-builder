import React from "react";
import "react-select/dist/react-select.css";

import Selector from "./selector";
import PokeDisplay from "./poke-display";

import {
  levelSelectorProps,
  natureSelectorProps,
  pokemonSelectorProps,
  algorithmSelectorProps
} from "../lib/selector-props";
import leveler from "../lib/leveler";

import "../application";
import pdfPath from "../PokeRPG-Base-Stat-Info";

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      level: null,
      nature: null,
      pokemon: null,
      algorithm: null
    };
  }

  render() {
    let pokeDisplay = "";
    const state = this.state;

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
              <Selector
                {...pokemonSelectorProps(pokemon => {
                  this.setState({ pokemon });
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
                {...levelSelectorProps(level => {
                  this.setState({ level });
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
                {...natureSelectorProps(nature => {
                  this.setState({ nature });
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
                {...algorithmSelectorProps(algorithm => {
                  this.setState({ algorithm });
                })}
              />
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
}
