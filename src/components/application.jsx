import React from "react";
import Selector from "./selector";
import PokeDisplay from "./poke-display";

import {
  levelSelectorProps,
  natureSelectorProps,
  pokemonSelectorProps
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
      pokemon: null
    };
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

  render() {
    let pokeDisplay = "";
    if (this.state.level && this.state.nature && this.state.pokemon) {
      const leveled = leveler(
        this.state.level,
        this.state.nature,
        this.state.pokemon
      );
      pokeDisplay = <PokeDisplay poke={leveled} level={this.state.level} />;
    }

    return (
      <div>
        <header>
          PokeRPG Pokemon Builder
          <a href={pdfPath} className="pull-right">
            <span className="glyphicon glyphicon-file" /> (PDF)
          </a>
        </header>
        <div className="container">
          <Selector
            label="Pokemon"
            {...pokemonSelectorProps(this.updatePokemon)}
          />
          <Selector label="Level" {...levelSelectorProps(this.updateLevel)} />
          <Selector
            label="Nature"
            {...natureSelectorProps(this.updateNature)}
          />
          {pokeDisplay}
        </div>
      </div>
    );
  }
});
