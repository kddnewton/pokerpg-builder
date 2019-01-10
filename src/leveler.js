const compareStat = (valueA, valueB) => (valueA > valueB ? 1 : -1);

const canRaiseStat = (originalStats, currentStats, nextStat) => (
  Object.keys(originalStats).every(statName => (
    originalStats[statName] === originalStats[nextStat]
    || (
      compareStat(originalStats[statName], originalStats[nextStat])
      === compareStat(currentStats[statName], currentStats[nextStat] + 1)
    )
  ))
);

const getNextRandomStat = (originalStats, currentStats) => {
  const stats = Object.keys(originalStats);
  const nextStat = stats[Math.floor(Math.random() * stats.length)];

  if (canRaiseStat(originalStats, currentStats, nextStat)) {
    return nextStat;
  }
  return getNextRandomStat(originalStats, currentStats);
};

const getNextEvenStat = (originalStats, currentStats) => (
  Object.keys(originalStats).reduce((current, stat) => {
    const delta = currentStats[stat] - originalStats[stat];

    const hasGoodRatio = (
      current === null || delta < currentStats[current] - originalStats[current]
    );

    if (hasGoodRatio && canRaiseStat(originalStats, currentStats, stat)) {
      return stat;
    }
    return current;
  }, null)
);

const applyNature = (nature, pokemon) => {
  const natureStatDelta = stat => (stat === "hp" ? 1 : 2);

  pokemon[nature.Raise] += natureStatDelta(nature.Raise);
  pokemon[nature.Lower] -= Math.max(1, natureStatDelta(nature.Lower));
  return pokemon;
};

const applyLevel = (level, pokemon, algorithm) => {
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

const leveler = (level, nature, pokemon, algorithm) => (
  applyLevel(level, applyNature(nature, { ...pokemon }), algorithm)
);

export default leveler;
