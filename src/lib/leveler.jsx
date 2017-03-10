const applyNature = (nature, pokemon) => {
  const natureStatDelta = stat => stat === "hp" ? 1 : 2;

  pokemon[nature.Raise] += natureStatDelta(nature.Raise);
  pokemon[nature.Lower] -= Math.max(1, natureStatDelta(nature.Lower));
  return pokemon;
};

export default (level, nature, pokemon) => {
  return applyNature(nature, pokemon);
};
