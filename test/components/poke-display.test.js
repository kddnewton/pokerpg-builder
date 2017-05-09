import React from "react";
import PokeDisplay from "../../src/components/poke-display";
import renderer from "react-test-renderer";

test("displays consistently", () => {
  const pokemon = { hp: 2, attack: 3, defense: 4, sAtk: 5, sDef: 6, speed: 7 };
  const component = renderer.create(<PokeDisplay poke={pokemon} level={10} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
