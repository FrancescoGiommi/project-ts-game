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
    image: "/img/valle_incantata.jpg",
    description:
      "Una Valle silenziosa e piena di misteri. Gli alberi sembrano muoversi e sussurrare tra loro.",
    startingWeaponId: 1,

    paths: [
      {
        id: "A",
        title: "l'Insediamento dei Goblin",

        description: "Vai all'insediamento dei Goblin",
        image: "/img/goblin.jpg",
        narration: `stai andando verso l'insediamento dei Goblin, ma lungo il
                percorso ti trovi davanti ad un ponte di legno con sotto un
                dirupo.
                Le assi scricchiolano al vento, alcune sembrano pronte a cedere.
                che cosa fai?`,
        imagePath1: "/img/ponte.jpg",

        paths: [
          {
            id: "a",
            image: "/img/ponte_pericoloso.jpg",
            description: "Attraversa il ponte, rischiando di cadere",
          },
          {
            id: "b",
            image: "/img/sentiero.jpg",
            description: "Cerca un sentiero secondario lungo la montagna",
          },
          {
            id: "c",
            image: "/img/valle_incantata.jpg",
            description: "torno indietro e prendo un altra strada",
          },
        ],
      },
      {
        id: "B",
        title: "la Cripta sotterranea",
        description: "Vai alla Cripta",
        image: "/img/cripta.jpg",
        narration: `ti incammini verso la Cripta sotterranea. L'ingresso è seminascosto tra le radici di un grande albero contorto.
         Una scalinata di pietra umida scende nell'oscurità più profonda. Scendendo le scale senti il rumore di ossa che scricchiolano,
         sono gli scheletri che fanno di guardia alla cripta. Che cosa fai ?`,
        paths: [
          {
            id: "a",
            description: "Tenti di passare silenziosamente tra gli scheletri",
          },
          {
            id: "b",
            description: "Prendi l'arma e li attacchi",
          },
          {
            id: "c",
            description:
              "Gli urli contro per spaventarli e corri verso il portone infondo",
          },
        ],
      },
      {
        id: "C",
        title: "il Castello",
        description: "Vai al Castello",
        image: "/img/castello.jpg",
      },
    ],
  },
];

export const paths = [
  {
    id: "floor-1",
    title: "Valle Incantata",
    description:
      "Una Valle silenziosa e piena di misteri. Gli alberi sembrano muoversi e sussurrare tra loro.",
    startingWeaponId: 1,
    image: "/img/valle.jpg",
    options: [
      { text: "Vai all'insediamento dei Goblin", next: "goblin-settlement" },
      { text: "Vai alla Cripta", next: "crypt" },
      { text: "Vai al Castello", next: "castle" },
    ],
  },
  {
    id: "goblin-settlement",
    title: "Insediamento dei Goblin",
    description: "Ti trovi davanti a un ponte sospeso su un dirupo.",
    image: "/img/goblin.jpg",
    options: [
      {
        text: "Attraversa il ponte lentamente",
        consequence: "Rischio di caduta, ma strada diretta.",
        next: "bridge-crossed",
      },
      {
        text: "Cerca un sentiero secondario",
        consequence: "Percorso alternativo, possibile incontro.",
        next: "mountain-path",
      },
      {
        text: "Lancia un sasso per testare il ponte",
        consequence: "Scopri la stabilità o attiri un nemico.",
        next: "disturb-creature",
      },
    ],
  },
  {
    id: "crypt",
    title: "La Cripta",
    description: "Oscura e piena di misteri...",
    image: "/img/cripta.jpg",
    options: [
      // prossime scelte...
    ],
  },
  {
    id: "castle",
    title: "Il Castello",
    description: "Un grande castello in rovina si staglia davanti a te...",
    image: "/img/castello.jpg",
    options: [
      // prossime scelte...
    ],
  },
  // altri path come bridge-crossed, mountain-path, etc.
];
export const gameData = {
  weapons,
  enemies,
  floors,
};
