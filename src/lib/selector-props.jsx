export const levelSelectorProps = update => {
  const options = {};
  const displays = [];

  [...Array(100).keys()].forEach(level => {
    options[level + 1] = level + 1;
    displays.push({ value: level + 1, label: level + 1 });
  });

  return { update, displays, options };
};

export const natureSelectorProps = update => {
  const options = {};
  const displays = [];

  require("../config/natures").forEach(nature => {
    options[nature.Nature] = nature;
    displays.push({ value: nature.Nature, label: nature.Nature });
  });

  return { update, displays, options };
};

export const pokemonSelectorProps = update => {
  const options = {};
  const displays = [];

  require("../config/pokemon").forEach(spec => {
    if (!spec.Name) {
      return;
    }

    const poke = {
      number: spec.Number,
      name: spec.Name,
      hp: parseInt(spec.HP),
      attack: parseInt(spec.Attack),
      defense: parseInt(spec.Defense),
      sAtk: parseInt(spec["Special Attack"]),
      sDef: parseInt(spec["Special Defense"]),
      speed: parseInt(spec.Speed)
    };

    let label = poke.name;
    if (poke.number) {
      label = `(#${poke.number}) ${poke.name}`;
    }

    options[poke.name] = poke;
    displays.push({ value: poke.name, label: label });
  });

  return { update, displays, options };
};
