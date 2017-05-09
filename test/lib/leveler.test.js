import leveler from "../../src/lib/leveler";

test("levels up a basic pokemon", () => {
  const nature = { Raise: "attack", Lower: "defense" };
  const pokemon = { hp: 0, attack: 0, defense: 0, sAtk: 0, sDef: 0, speed: 0 };

  expect(leveler(15, nature, pokemon, (stats, pkmn) => "hp")).toEqual({
    hp: 25,
    attack: 2,
    defense: -2,
    sAtk: 0,
    sDef: 0,
    speed: 0
  });
});

test("only levels up hp by 1 for nature", () => {
  const nature = { Raise: "hp", Lower: "attack" };
  const pokemon = { hp: 0, attack: 0, defense: 0, sAtk: 0, sDef: 0, speed: 0 };

  expect(leveler(15, nature, pokemon, (stats, pkmn) => "defense")).toEqual({
    hp: 1,
    attack: -2,
    defense: 25,
    sAtk: 0,
    sDef: 0,
    speed: 0
  });
});
