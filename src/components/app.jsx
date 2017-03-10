import React from "react";
import Selector from "./selector";
import PokeDisplay from "./poke-display";

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
      pokeDisplay = (
        <PokeDisplay pokemon={this.state.pokemon} level={this.state.level} />
      );
    }

    return (
      <div>
        <header>PokeRPG Pokemon Builder</header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <strong>Pokemon</strong>
              <Selector {...this._pokemonSelectorProps()} />

              <strong>Level</strong>
              <Selector {...this._levelSelectorProps()} />

              <strong>Nature</strong>
              <Selector {...this._natureSelectorProps()} />
            </div>
          </div>

          {pokeDisplay}
        </div>
      </div>
    );
  },

  _levelSelectorProps() {
    const options = {};
    const displays = [];

    [...Array(100).keys()].forEach(level => {
      options[level + 1] = level + 1;
      displays.push({ value: level + 1, label: level + 1 });
    });

    return { update: this.updateLevel, displays, options };
  },

  _natureSelectorProps() {
    const options = {};
    const displays = [];

    require("../config/natures").forEach(nature => {
      options[nature.Nature] = nature;
      displays.push({ value: nature.Nature, label: nature.Nature });
    });

    return { update: this.updateNature, displays, options };
  },

  _pokemonSelectorProps() {
    const options = {};
    const displays = [];

    require("../config/pokemon").forEach(spec => {
      const poke = {
        number: spec.Number,
        name: spec.Name,
        hp: parseInt(spec.HP),
        attack: parseInt(spec.Attack),
        defense: parseInt(spec.Defense),
        sAtk: parseInt(spec["Special Atk"]),
        sDef: parseInt(spec["Special Def"]),
        speed: parseInt(spec.Speed)
      };
      options[poke.number] = poke;
      displays.push({
        value: poke.number,
        label: `(#${poke.number}) ${poke.name}`
      });
    });

    return { update: this.updatePokemon, displays, options };
  }
});
