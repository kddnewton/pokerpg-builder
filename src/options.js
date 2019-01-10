import natures from "./natures";
import pokemon from "./pokemon";

const canRaiseStat = (originalStats, currentStats, nextStat) => {
  const compareStat = (valueA, valueB) => (valueA > valueB ? 1 : -1);

  return Object.keys(originalStats).every(
    statName => (
      originalStats[statName] === originalStats[nextStat] ||
      compareStat(originalStats[statName], originalStats[nextStat]) ===
        compareStat(currentStats[statName], currentStats[nextStat] + 1)
    )
  );
};

const raiseRandomStat = (originalStats, currentStats) => {
  const stats = Object.keys(originalStats);
  const nextStat = stats[Math.floor(Math.random() * stats.length)];

  if (canRaiseStat(originalStats, currentStats, nextStat)) {
    return nextStat;
  }
  return raiseRandomStat(originalStats, currentStats);
};

const raiseEvenStat = (originalStats, currentStats) => (
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
);

export const levelOptions = [...Array(100).keys()].map(level => ({
  label: level + 1, value: level + 1
}));

export const natureOptions = natures.map(nature => ({
  label: nature.Nature, value: nature
}));

export const pokemonOptions = pokemon.reduce((accum, spec) => {
  if (!spec.Name) {
    return accum;
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

  return [...accum, { label, value: poke }];
}, []);

export const algorithmOptions = [
  { label: "Random", value: raiseRandomStat },
  { label: "Even", value: raiseEvenStat }
];
