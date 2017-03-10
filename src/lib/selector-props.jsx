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

  return { update, displays, options };
};
