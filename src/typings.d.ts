export type AlgorithmName = "Even" | "Random";

export type Nature = {
  Value: number;
  Nature: string;
  Raise: StatName;
  Lower: StatName;
};

export type Pokemon = {
  number: string;
  name: string;
  hp: number;
  attack: number;
  defense: number;
  sAtk: number;
  sDef: number;
  speed: number;
};

export type PokemonSpec = {
  Number: string;
  Name: string;
  HP: string;
  Attack: string;
  Defense: string;
  "Special Attack": string;
  "Special Defense": string;
  Speed: string;
};

export type PokemonStats = Pick<Pokemon, StatName>;

export type StatName = "hp" | "attack" | "defense" | "sAtk" | "sDef" | "speed";
