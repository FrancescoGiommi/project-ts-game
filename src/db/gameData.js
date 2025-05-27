const weapons = [
  {
    id: 1,
    name: "Spadone a due mani",
    damage: 1,
    image: "/../img/spadone.jpg",
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
  },
];

export const paths = [
  {
    id: "A",
    title: "l'Insediamento dei Goblin",
    description: "Vai all'insediamento dei Goblin",
    image: "/img/goblin.jpg",
    narration: `stai andando verso l'insediamento dei Goblin, ma lungo il percorso ti trovi davanti ad un ponte di legno con sotto un dirupo.\nLe assi scricchiolano al vento, alcune sembrano pronte a cedere. che cosa fai?`,
    imagePath1: "/img/ponte.jpg",
    options: [
      {
        id: "A1",
        image: "/img/ponte_pericoloso.jpg",
        description: "Attraversa il ponte",
        next: "B1",
      },
      {
        id: "A2",
        image: "/img/sentiero.jpg",
        description: "Cerca un sentiero secondario",
        next: "C1",
      },
      {
        id: "A3",
        image: "/img/valle_incantata.jpg",
        description: "torno indietro e prendo un altra strada",
        next: "floor-1",
      },
    ],
  },
  {
    id: "B1",
    title: "Il ponte cede",
    description: "",
    image: "/img/caduta.jpg",
    narration: `Inizi a percorrere il ponte ma dopo qualche passo senti che inizia a cedere, preso dal panico inizi a correre per raggiungere la fine il prima possibile.\nNella corsa cedono gli assi e finisci per cadere di sotto.
    `,
    imagePath1: "",
    next: "Sei Morto",
    options: [],
  },
  {
    id: "C1",
    title: "Sentiero secondario",
    description: "",
    image: "/img/sentiero.jpg",
    narration: `Segui il sentiero secondario che serpeggia tra gli alberi. L’atmosfera è tranquilla, ma senti come se qualcuno ti stesse osservando…`,
    imagePath1: "",
    options: [],
  },
  {
    id: "floor-1",
    title: "Ritorno alla scelta iniziale",
    description: "",
    image: "/img/valle_incantata.jpg",
    narration: `Hai deciso di tornare indietro e prendere un'altra strada.`,
    imagePath1: "",
    options: [],
  },
  {
    id: "B",
    title: "la Cripta sotterranea",
    description: "Vai alla Cripta",
    image: "/img/cripta.jpg",
    narration: `ti incammini verso la Cripta sotterranea. L'ingresso è seminascosto tra le radici di un grande albero contorto.
         Una scalinata di pietra umida scende nell'oscurità più profonda. Scendendo le scale senti il rumore di ossa che scricchiolano,
         sono gli scheletri che fanno di guardia alla cripta. Che cosa fai ?`,
    imagePath1: "/img/interno_cripta.jpg",
    options: [
      {
        id: "B1",
        image: "/img/stealth.jpg",
        description: "Tenti di passare silenziosamente tra gli scheletri",
        next: "B1",
      },
      {
        id: "B2",
        image: "/img/combattimento.jpg",
        description: "Prendi l'arma e li attacchi",
        next: "combattimento con gli scheletri",
      },
      {
        id: "B3",
        image: "/img/cripta_portone.jpg",
        description:
          "Gli urli contro per spaventarli e corri verso il portone infondo",
        next: "porta della cripta",
      },
    ],
  },
  {
    id: "C",
    title: "Il Castello",
    description: "Vai al Castello",
    image: "/img/castello.jpg",
    narration: `stai andando verso il Castello ma lungo il
                percorso incontri un mercante con una carrozza incastrata nel fango.
                Ti chiede aiuto per tirarla fuori,
                che cosa fai?`,
    imagePath1: "/img/strada.jpg",
    options: [
      {
        id: "C1",
        image: "/img/aiuto_mercante.jpg",
        description: "Aiuta il mercante",
        next: "ricompensa del mercante",
      },
      {
        id: "C2",
        image: "/img/direzione_castello.jpg",
        description: "Ignoralo e prosegui per la tua strada",
        next: "portone del castello",
      },
      {
        id: "C3",
        image: "/img/scambio.jpg",
        description: "Lo aiuti ma vuoi qualcosa in cambio",
        next: "Negozia con il mercante",
      },
    ],
  },
];

export const gameData = {
  weapons,
  enemies,
  floors,
  paths,
};
