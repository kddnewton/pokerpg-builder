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
import "../stylesheets/app";

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
        <header>PokeRPG Pokemon Builder</header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <strong>Pokemon</strong>
              <Selector {...pokemonSelectorProps(this.updatePokemon)} />

              <strong>Level</strong>
              <Selector {...levelSelectorProps(this.updateLevel)} />

              <strong>Nature</strong>
              <Selector {...natureSelectorProps(this.updateNature)} />
            </div>
          </div>

          {pokeDisplay}
        </div>
      </div>
    );
  }
});
