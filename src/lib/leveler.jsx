const applyNature = (nature, pokemon) => {
  const natureStatDelta = stat => stat === "hp" ? 1 : 2;

  pokemon[nature.Raise] += natureStatDelta(nature.Raise);
  pokemon[nature.Lower] -= Math.max(1, natureStatDelta(nature.Lower));
  return pokemon;
};

const canRaiseStat = (pokemon, originalStats, nextStat) => {
  // Object.keys(originalStats).every(statName => {
//     pokemon[nextStat] >= originalStats[statName] ==
//       pokemon[nextStat] + 1 >= originalStats[statName];
//   });
return true;
};

const applyLevel = (level, pokemon) => {
  const randomStat = stats => stats[Math.floor(Math.random() * stats.length)];

  const originalStats = {
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    sAtk: pokemon.sAtk,
    sDef: pokemon.sDef,
    speed: pokemon.speed
  };
  let statPoints = level + 10;

  let nextStat;
  while (statPoints > 0) {
    nextStat = randomStat(Object.keys(originalStats));
    if (canRaiseStat(pokemon, originalStats, nextStat)) {
      pokemon[nextStat] += 1;
      statPoints -= 1;
    }
  }

  return pokemon;
};

export default (level, nature, pokemon) => {
  return applyLevel(level, applyNature(nature, pokemon));
};
