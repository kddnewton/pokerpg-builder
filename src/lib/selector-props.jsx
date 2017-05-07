import natureConfig from "../config/natures";
import pokemonConfig from "../config/pokemon";

const canRaiseStat = (originalStats, currentStats, nextStat) => {
  const compareStat = (valueA, valueB) => (valueA > valueB ? 1 : -1);

  return Object.keys(originalStats).every(
    statName =>
      originalStats[statName] === originalStats[nextStat] ||
      compareStat(originalStats[statName], originalStats[nextStat]) ===
        compareStat(currentStats[statName], currentStats[nextStat] + 1)
  );
};

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

  natureConfig.forEach(nature => {
    options[nature.Nature] = nature;
    displays.push({ value: nature.Nature, label: nature.Nature });
  });

  return { update, displays, options };
};

export const pokemonSelectorProps = update => {
  const options = {};
  const displays = [];

  pokemonConfig.forEach(spec => {
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
    displays.push({ value: poke.name, label });
  });

  return { update, displays, options };
};

export const algorithmSelectorProps = update => {
  const options = {
    random: (originalStats, currentStats) => {
      const stats = Object.keys(originalStats);
      const nextStat = stats[Math.floor(Math.random() * stats.length)];

      if (canRaiseStat(originalStats, currentStats, nextStat)) {
        return nextStat;
      }
      return options.random(originalStats, currentStats);
    },
    even: (originalStats, currentStats) =>
      Object.keys(originalStats).reduce((current, stat) => {
        const delta = currentStats[stat] - originalStats[stat];
        if (
          (current === null ||
            delta < currentStats[current] - originalStats[current]) &&
          canRaiseStat(originalStats, currentStats, stat)
        ) {
          return stat;
        }
        return current;
      }, null)
  };

  const displays = [
    { value: "random", label: "Random" },
    { value: "even", label: "Even" }
  ];

  return { update, displays, options };
};
