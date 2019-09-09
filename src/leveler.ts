import { AlgorithmName, Nature, Pokemon, PokemonStats, StatName } from "./typings";

const compareStat = (valueA: number, valueB: number) => (
  valueA > valueB ? 1 : -1
);

const canRaiseStat = (originalStats: PokemonStats, currentStats: Pokemon, nextStat: StatName) => (
  Object.keys(originalStats).every(key => {
    const statName = key as StatName;

    return (
      originalStats[statName] === originalStats[nextStat]
      || (
        compareStat(originalStats[statName], originalStats[nextStat])
        === compareStat(currentStats[statName], currentStats[nextStat] + 1)
      )
    );
  })
);

const getNextRandomStat = (originalStats: PokemonStats, currentStats: Pokemon): StatName => {
  const stats = Object.keys(originalStats) as StatName[];
  const nextStat = stats[Math.floor(Math.random() * stats.length)];

  if (canRaiseStat(originalStats, currentStats, nextStat)) {
    return nextStat;
  }
  return getNextRandomStat(originalStats, currentStats);
};

const getNextEvenStat = (originalStats: PokemonStats, currentStats: Pokemon): StatName => {
  const stats = Object.keys(originalStats) as StatName[];
  let nextStat = stats[0];

  stats.forEach((stat: StatName) => {
    const delta = currentStats[stat] - originalStats[stat];
    const hasGoodRatio = delta < currentStats[nextStat] - originalStats[nextStat];

    if (hasGoodRatio && canRaiseStat(originalStats, currentStats, stat)) {
      nextStat = stat;
    }
  });

  return nextStat;
};

const applyNature = (nature: Nature, pokemon: Pokemon) => {
  const natureStatDelta = (stat: StatName) => (stat === "hp" ? 1 : 2);

  pokemon[nature.Raise] += natureStatDelta(nature.Raise);
  pokemon[nature.Lower] -= Math.max(1, natureStatDelta(nature.Lower));
  return pokemon;
};

const applyLevel = (level: number, pokemon: Pokemon, algorithm: AlgorithmName) => {
  const getNextStat = { Even: getNextEvenStat, Random: getNextRandomStat }[algorithm];
  const originalStats = {
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    sAtk: pokemon.sAtk,
    sDef: pokemon.sDef,
    speed: pokemon.speed
  };

  let statPoints = level + 10;
  while (statPoints > 0) {
    pokemon[getNextStat(originalStats, pokemon)] += 1;
    statPoints -= 1;
  }

  return pokemon;
};

const leveler = (level: number, nature: Nature, pokemon: Pokemon, algorithm: AlgorithmName) => (
  applyLevel(level, applyNature(nature, { ...pokemon }), algorithm)
);

export default leveler;
