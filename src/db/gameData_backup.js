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
    //! Insediamento dei Goblin
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
    //! Il ponte cede
    id: "A1-A",
    title: "Il ponte cede",
    description: "",
    image: "",
    narration: `Inizi a percorrere il ponte ma dopo qualche passo senti che inizia a cedere, preso dal panico inizi a correre per raggiungere la fine il prima possibile.\nNella corsa cedono gli assi e finisci per cadere di sotto.
    `,
    imagePath1: "/img/caduta.jpg",
    next: "Sei Morto",
    isDeath: true,
    options: [],
  },
  {
    //! Il sentiero secondario
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
    //! Arrivi all'insediamento
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
        next: "D2-A",
      },
    ],
  },
  {
    //! Cerchi un entrata secondaria
    id: "D2-A",
    title: "Cerchi un entrata secondaria",
    description: "",
    image: "",
    narration: `Ti muovi furtivamente tra i cespugli per non farti vedere dagli arcieri, quando improvvisamente dentro un cespuglio si apre una botola e cadi di sotto. Ti ritrovi in una sorta di caverna buia e vedi da lontano una statua illuminata dalla luce naturale, che cosa fai?`,
    imagePath1: "/img/caverna.jpg",
    options: [
      {
        id: "D2-B1",
        description: "Vai verso la statua",
        image: "/img/statua_dea.jpg",
        next: "D3-A",
      },
      {
        id: "D2-C1",
        description: "Cerchi una via d'uscita",
        image: "/img/uscita_caverna.jpg",
        next: "D3-B",
      },
    ],
  },
  {
    //! Vai verso la statua
    id: "D3-A",
    title: "Vai verso la statua",
    description: "",
    image: "",
    narration: `Ti avvicini alla statua e noti che è la statua della dea della luce, alla base c'è una scritta che dice: 'Prega e sarai ricompensato'. Che cosa fai? `,
    imagePath1: "/img/inchino.jpg",
    options: [
      {
        id: "D3-B",
        description: "Prega la dea",
        image: "/img/mani.jpg",
        next: "D3-B1",
      },
      {
        id: "D3-C",
        description: "Ti allonatani e cerchi un'uscita",
        image: "/img/uscita.jpg",
        next: "D3-C1",
      },
    ],
  },
  {
    //! Prega la dea
    id: "D3-B1",
    title: "Prega la dea",
    description: "",
    image: "",
    narration: `Ti inchini davanti alla statua e inizi a pregare, dopo qualche secondo gli occhi della dea si illuminano, la dea è grata per la tua preghiera e ti da la sua benedizione. Guadagni l'Abilità Fendente Divino! La tua arma ora è a + 10`,
    imagePath1: "/img/spada_divina.jpg",
    options: [
      {
        id: "D3-B2",
        description: "Ti allonatani e cerchi un'uscita",
        image: "/img/uscita.jpg",
        next: "D4",
      },
    ],
  },
  {
    //! Entri dal portone principale
    id: "D1-A",
    title: "Provi a entrare dal portone principale",
    description: "",
    image: "",
    narration: `Cammini attaccato al muro per non farti vedere, apri leggermente il portone ed entri. Ti guardi intorno e noti che una guardia da lontano ha visto qualcosa muoversi e si sta avvicinando, che cosa fai?`,
    imagePath1: "/img/guardia_goblin.jpg",
    options: [
      {
        id: "D1-B",
        description: "Provi a combattere la guardia",
        image: "/img/combattimento_guardia.jpg",
        next: "D2-B",
      },
      {
        id: "D1-C",
        description: "Provi a nasconderti",
        image: "/img/nascondersi.jpg",
        next: "D2-C",
      },
    ],
  },
  {
    //! Combatti la guardia
    id: "D2-B",
    title: "Provi a combattere la guardia",
    description: "",
    image: "",
    narration: `La guardia ti vede, suona un corno ed è pronta ad attaccarti!`,
    imagePath1: "/img/guardia_goblin.jpg",
    isBattle: true,
    options: [],
  },

  {
    //! Parli con l'albero
    id: "E",
    title: "Provi a parlare con l'albero",
    description: "",
    image: "",
    narration: `Provi a parlare con l'albero ma non riesci a carire cosa dice, sembra che ti stia avvertendo di qualcosa. Non capendo cosa fare gli dici che stai andando dai goblin, l'albero dice qualcosa di incomprensibile e tu fai si con la testa.
    L'albero crea dalla sua corteccia uno scudo di legno, che cosa fai?`,
    imagePath1: "/img/scudo.jpg",
    options: [
      {
        id: "E1",
        description: "Prendi lo scudo e prosegui",
        image: "/img/like.jpg",
        next: "D",
      },
      {
        id: "E2",
        description: "Lo rifiuti e prosegui",
        image: "/img/dislike.jpg",
        next: "D",
      },
    ],
  },

  {
    //! La cripta
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
    //! Il castello
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
