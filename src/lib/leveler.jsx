const applyNature = (nature, pokemon) => {
  const natureStatDelta = stat => stat === "hp" ? 1 : 2;

  pokemon[nature.Raise] += natureStatDelta(nature.Raise);
  pokemon[nature.Lower] -= Math.max(1, natureStatDelta(nature.Lower));
  return pokemon;
};

const applyLevel = (level, pokemon, getNextStat) => {
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
    nextStat = getNextStat(originalStats, pokemon);
    pokemon[nextStat] += 1;
    statPoints -= 1;
  }

  return pokemon;
};

export default (level, nature, pokemon, algorithm) => {
  // Clone the pokemon object so that the option from the select doesn't get
  // accidentally modified.
  const cloned = Object.assign({}, pokemon);

  return applyLevel(level, applyNature(nature, cloned), algorithm);
};
