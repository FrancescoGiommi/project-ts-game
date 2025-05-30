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
        next: "A1-A",
      },
      {
        id: "A2",
        image: "/img/sentiero.jpg",
        description: "Cerca un sentiero secondario",
        next: "A2-B",
      },
    ],
  },
  {
    id: "A1-A",
    title: "Il ponte cede",
    description: "",
    image: "",
    narration: `Inizi a percorrere il ponte ma dopo qualche passo senti che inizia a cedere, preso dal panico inizi a correre per raggiungere la fine il prima possibile.\nNella corsa cedono gli assi e finisci per cadere di sotto.
    `,
    imagePath1: "/img/caduta.jpg",
    next: "Sei Morto",
    options: [],
  },
  {
    id: "A2-B",
    title: "Sentiero secondario",
    description: "",
    image: "/img/sentiero.jpg",
    narration: `Segui il sentiero secondario che serpeggia tra gli alberi. L’atmosfera è tranquilla, ma senti come se qualcuno ti stesse osservando…Ti giri e noti che un albero ti sta guardando.
    L'albero ti parla con la sua voce cupa e profonda ma non riesci a capire cosa dice, che cosa fai?`,
    imagePath1: "/img/albero_parlante2.jpg",
    options: [
      {
        id: "A2-B1",
        description: "Prosegui per la tua strada",
        image: "/img/continua.jpg",
        next: "D",
      },
      {
        id: "A2-B2",
        description: "Provi a parlare con l'albero",
        image: "/img/albero_parlante.jpg",
        next: "E",
      },
    ],
  },
  {
    id: "D",
    title: "Arrivi all'insediamento",
    description: "",
    image: "",
    narration: `Sei giunto all'insediamento, noti che ci sono 4 torri che lo circondano, ognuna con un arciere. Dentro ci sono guardie corazzate che fanno da guardia al baule, sicuramente custodiscono qualcosa di prezioso, che cosa fai?`,
    imagePath1: "/img/insediamento_goblin.jpg",
    options: [
      {
        id: "D1",
        description: "Provi a entrare dal portone principale",
        image: "/img/portone_principale.jpg",
        next: "D1-A",
      },
      {
        id: "D2",
        description: "Cerchi un entrata secondaria",
        image: "/img/entrata_secondaria.jpg",
        next: "D2-B",
      },
    ],
  },
  {
    id: "D1-A",
    title: "Provi a entrare dal portone principale",
    description: "",
    image: "",
    narration: `Cammini attaccato al muro per non farti vedere, apri leggermente il portone ed entri. Ti guardi intorno e noti che una guardia da lontano ha visto qualcosa muoversi e si sta avvicinando, che cosa fai?`,
    imagePath1: "/img/guardia_goblin.jpg",
    options: [
      {
        id: "D1",
        description: "",
        image: "/img/portone_principale.jpg",
        next: "D1-A",
      },
      {
        id: "D2",
        description: "",
        image: "/img/entrata_secondaria.jpg",
        next: "D2-B",
      },
    ],
  },
  {
    id: "E",
    title: "Provi a parlare con l'albero",
    description: "",
    image: "",
    narration: `Provi a parlare con l'albero ma non riesci a carire cosa dice, sembra che ti stia avvertendo di qualcosa. Non capendo cosa fare gli dici che stai andando dai goblin, l'albero dice qualcosa di incomprensibile e tu fai si con la testa.
    L'albero crea dalla sua corteccia uno scudo di legno, che cosa fai?`,
    imagePath1: "/img/scudo.jpg",
    options: [
      {
        id: "D1",
        description: "Prendi lo scudo",
        image: "/img/like.jpg",
        next: "D1-A",
      },
      {
        id: "D2",
        description: "Lo rifiuti e prosegui",
        image: "/img/dislike.jpg",
        next: "D2-B",
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
    imagePath1: "/img/interno_cripta.jpg",
    options: [
      {
        id: "B1",
        image: "/img/combattimento.jpg",
        description: "Prendi l'arma e li attacchi",
        next: "",
      },
      {
        id: "B2",
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
    ],
  },
];

export const gameData = {
  weapons,
  enemies,
  floors,
  paths,
};
