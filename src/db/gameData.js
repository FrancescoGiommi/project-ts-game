const weapons = [
  {
    id: 1,
    name: "Spadone a due mani",
    damage: 1,
    rarity: "Comune",
    description: "Uno spadone pesante da impugnare a due mani.",
  },
  {
    id: 2,
    name: "Ascia bipenne",
    damage: 2,
    rarity: "Comune",
    description: "Un ascia da impugnare a due mani.",
  },
];

export const enemies = [
  {
    id: 1,
    name: "Goblin",
    hp: 5,
    attack: 2,
    description: "Una creatura veloce e furtiva.",
  },
  {
    id: 2,
    name: "Scheletro della cripta",
    hp: 10,
    attack: 5,
    description: "Scheletro di vedetta della cripta.",
  },
];

export const floors = [
  {
    id: 1,
    name: "Valle Incantata",
    description:
      "Una Valle silenziosa e piena di misteri. Gli alberi sembrano muoversi e sussurrare tra loro.",
    startingWeaponId: 1,
    paths: [
      {
        id: "A",
        description: "Vai all'accampamento dei Goblin",
        image: "/img/goblin.jpg",
      },
      {
        id: "B",
        description: "Vai alla Cripta",
        image: "/img/cripta.jpg",
      },
      {
        id: "C",
        description: "Vai al Castello",
        image: "/img/castello.jpg",
      },
    ],
  },
];
export const gameData = {
  weapons,
  enemies,
  floors,
};
