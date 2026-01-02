
import { GrammarSection, TaskType } from '../types';

export const GRAMMAR_SECTIONS: GrammarSection[] = [
  {
    id: 'present-simple',
    title: 'Present Simple',
    theory: `Czas teraźniejszy prosty. Używamy go do opisywania stałych sytuacji, nawyków oraz faktów naukowych.

**BUDOWA:**
- Twierdzenia: Podmiot + czasownik (w 3 os. l.poj. końcówka -s/-es).
- Przeczenia: don't / doesn't + forma podstawowa.
- Pytania: Do / Does + podmiot + forma podstawowa.

**SŁOWA KLUCZE:**
always, usually, often, sometimes, rarely, never, every day, on Mondays.`,
    usage: ["Rutyny i nawyki", "Prawa natury", "Harmonogramy", "Stałe sytuacje"],
    forms: { affirmative: "I/You play | He/She/It plays", negative: "I don't play | He doesn't play", question: "Do you play? | Does he play?" },
    examples: ["She walks to work.", "They don't like pizza.", "Do you speak English?", "Water boils at 100°C.", "The movie starts at 8."],
    initialQuiz: [
      { id: 'ps-q1', type: TaskType.MULTIPLE_CHOICE, question: "She ___ to school every day.", options: ["walk", "walks", "walking", "walked"], answer: "walks", explanation: "W 3 osobie liczby pojedynczej dodajemy końcówkę -s." },
      { id: 'ps-q2', type: TaskType.FILL_IN_BLANK, question: "They ___ (not/like) vegetables.", answer: "don't like", explanation: "Dla 'They' używamy operatora 'don't'." }
    ],
    flashcards: [
      { id: 'ps-f1', front: "Końcówka dla 'He/She/It'?", back: "-s lub -es" },
      { id: 'ps-f2', front: "Operator w pytaniu dla 'I'?", back: "Do" }
    ]
  },
  {
    id: 'present-continuous',
    title: 'Present Continuous',
    theory: `Czas teraźniejszy ciągły. Opisuje czynności dziejące się w tej chwili lub plany na bliską przyszłość.

**BUDOWA:**
Podmiot + am/is/are + czasownik z -ing.`,
    usage: ["Czynności w tej chwili", "Sytuacje tymczasowe", "Plany na przyszłość"],
    forms: { affirmative: "I am playing", negative: "I'm not playing", question: "Are you playing?" },
    examples: ["I'm reading now.", "Are you listening?", "He isn't working today."],
    initialQuiz: [
      { id: 'pc-q1', type: TaskType.MULTIPLE_CHOICE, question: "Look! It ___ outside.", options: ["is raining", "rains", "rain"], answer: "is raining", explanation: "Czynność dzieje się teraz (Look!)." }
    ],
    flashcards: [{ id: 'pc-f1', front: "Budowa?", back: "be + verb-ing" }]
  },
  {
    id: 'past-simple',
    title: 'Past Simple',
    theory: `Czas przeszły dokonany. Opisuje zakończone czynności w określonym czasie w przeszłości.`,
    usage: ["Zakończone czynności", "Seria zdarzeń w przeszłości"],
    forms: { affirmative: "I played / went", negative: "I didn't play", question: "Did you play?" },
    examples: ["I saw him yesterday.", "Did you enjoy it?", "They didn't come."],
    initialQuiz: [{ id: 'pas-q1', type: TaskType.MULTIPLE_CHOICE, question: "I ___ to London last year.", options: ["went", "go", "gone"], answer: "went", explanation: "V2 dla 'go' to 'went'." }],
    flashcards: [{ id: 'pas-f1', front: "Końcówka regularna?", back: "-ed" }],
    irregularVerbs: [
      { v1: 'be', v2: 'was/were', v3: 'been', translation: 'być' },
      { v1: 'go', v2: 'went', v3: 'gone', translation: 'iść' }
    ]
  },
  {
    id: 'past-continuous',
    title: 'Past Continuous',
    theory: `Opisuje czynności, które trwały w określonym momencie w przeszłości.`,
    usage: ["Czynność ciągła w przeszłości", "Tło dla innych wydarzeń"],
    forms: { affirmative: "I was playing", negative: "I wasn't playing", question: "Were you playing?" },
    examples: ["I was sleeping at 10.", "What were you doing?", "It was raining all day."],
    initialQuiz: [{ id: 'pac-q1', type: TaskType.FILL_IN_BLANK, question: "They ___ (dance) when I arrived.", answer: "were dancing", explanation: "Dla 'they' używamy 'were'." }],
    flashcards: [{ id: 'pac-f1', front: "Was czy Were dla 'You'?", back: "Were" }]
  },
  {
    id: 'present-perfect',
    title: 'Present Perfect',
    theory: `Łączy przeszłość z teraźniejszością. Skupia się na skutku.`,
    usage: ["Doświadczenia życiowe", "Skutek teraz", "Czynność trwająca od przeszłości"],
    forms: { affirmative: "I have seen", negative: "I haven't seen", question: "Have you seen?" },
    examples: ["I've lost my keys.", "Have you ever been to Paris?", "She has lived here for 5 years."],
    initialQuiz: [{ id: 'pp-q1', type: TaskType.MULTIPLE_CHOICE, question: "I ___ my homework already.", options: ["have finished", "finished", "has finished"], answer: "have finished", explanation: "Already sugeruje Present Perfect." }],
    flashcards: [{ id: 'pp-f1', front: "For czy Since dla '3 lat'?", back: "For" }]
  },
  {
    id: 'past-perfect',
    title: 'Past Perfect',
    theory: `Czas zaprzeszły. Opisuje czynność, która wydarzyła się przed inną czynnością w przeszłości.`,
    usage: ["Czynność wcześniejsza niż inna przeszła"],
    forms: { affirmative: "I had finished", negative: "I hadn't finished", question: "Had you finished?" },
    examples: ["When I arrived, he had left.", "I had never seen him before."],
    initialQuiz: [{ id: 'pap-q1', type: TaskType.FILL_IN_BLANK, question: "The train ___ (leave) before I got to the station.", answer: "had left", explanation: "Czynność wcześniejsza." }],
    flashcards: [{ id: 'pap-f1', front: "Budowa?", back: "had + V3" }]
  },
  {
    id: 'future-simple',
    title: 'Future Simple (Will)',
    theory: `Używany do spontanicznych decyzji, obietnic i przewidywań.`,
    usage: ["Obietnice", "Spontaniczne decyzje", "Przewidywania"],
    forms: { affirmative: "I will help", negative: "I won't help", question: "Will you help?" },
    examples: ["I'll call you.", "I think it will rain.", "I won't tell anyone."],
    initialQuiz: [{ id: 'fs-q1', type: TaskType.MULTIPLE_CHOICE, question: "I'm tired. I ___ to bed.", options: ["will go", "go", "went"], answer: "will go", explanation: "Spontaniczna decyzja." }],
    flashcards: [{ id: 'fs-f1', front: "Skrót od 'will not'?", back: "won't" }]
  },
  {
    id: 'future-going-to',
    title: 'Going to',
    theory: `Używamy do wyrażania intencji i przewidywań opartych na dowodach.`,
    usage: ["Plany i intencje", "Przewidywania na podstawie dowodów"],
    forms: { affirmative: "I am going to study", negative: "I'm not going to study", question: "Are you going to study?" },
    examples: ["I'm going to buy a car.", "Look at the clouds! It's going to rain."],
    initialQuiz: [{ id: 'gt-q1', type: TaskType.FILL_IN_BLANK, question: "We ___ (visit) our grandma next week.", answer: "are going to visit", explanation: "Wyrażanie planu." }],
    flashcards: [{ id: 'gt-f1', front: "Kiedy używamy 'going to' zamiast 'will'?", back: "Przy planach i dowodach" }]
  },
  {
    id: 'conditionals-0-1',
    title: 'Conditionals 0 & 1',
    theory: `Tryb warunkowy zerowy (fakty) i pierwszy (prawdopodobna przyszłość).`,
    usage: ["Prawa natury (0)", "Realna możliwość w przyszłości (1)"],
    forms: { affirmative: "If I study, I pass (1)", negative: "If I don't study, I won't pass (1)", question: "Will you go if it rains? (1)" },
    examples: ["If you heat water, it boils.", "If I have time, I will help you."],
    initialQuiz: [{ id: 'c1-q1', type: TaskType.MULTIPLE_CHOICE, question: "If he ___ hard, he will pass.", options: ["studies", "will study", "study"], answer: "studies", explanation: "Po 'if' nie używamy 'will' w 1 trybie." }],
    flashcards: [{ id: 'c1-f1', front: "Czy po 'If' dajemy 'will'?", back: "Nie" }]
  },
  {
    id: 'conditionals-2-3',
    title: 'Conditionals 2 & 3',
    theory: `Tryb warunkowy drugi (gdybanie) i trzeci (przeszłość, której nie zmienimy).`,
    usage: ["Sytuacje nierealne teraz (2)", "Żal za przeszłość (3)"],
    forms: { affirmative: "If I were rich, I would buy a boat (2)", negative: "If I hadn't gone, I wouldn't have met her (3)", question: "What would you do? (2)" },
    examples: ["If I won the lottery, I would travel.", "If I had known, I would have helped."],
    initialQuiz: [{ id: 'c2-q1', type: TaskType.FILL_IN_BLANK, question: "If I ___ (be) you, I would go.", answer: "were", explanation: "W 2 trybie dla 'I' często używamy 'were'." }],
    flashcards: [{ id: 'c2-f1', front: "Budowa 2 trybu?", back: "If + Past Simple, would + V1" }]
  },
  {
    id: 'passive-voice',
    title: 'Passive Voice',
    theory: `Strona bierna. Skupiamy się na czynności, a nie na wykonawcy.`,
    usage: ["Gdy wykonawca jest nieznany", "Gdy czynność jest ważniejsza"],
    forms: { affirmative: "It is made", negative: "It isn't made", question: "Is it made?" },
    examples: ["The car was repaired.", "English is spoken here.", "This book was written in 1990."],
    initialQuiz: [{ id: 'pv-q1', type: TaskType.MULTIPLE_CHOICE, question: "The window ___ by the wind.", options: ["was broken", "broke", "was breaking"], answer: "was broken", explanation: "Strona bierna w przeszłości." }],
    flashcards: [{ id: 'pv-f1', front: "Budowa?", back: "be + V3" }]
  },
  {
    id: 'reported-speech',
    title: 'Reported Speech',
    theory: `Mowa zależna. Cofamy czas o jeden stopień (Backshift).`,
    usage: ["Relacjonowanie czyichś słów"],
    forms: { affirmative: "He said he was happy", negative: "She said she didn't know", question: "He asked where I lived" },
    examples: ["'I am tired' -> He said he was tired.", "'I will go' -> He said he would go."],
    initialQuiz: [{ id: 'rs-q1', type: TaskType.FILL_IN_BLANK, question: "She said: 'I love pizza'. She said she ___ pizza.", answer: "loved", explanation: "Present Simple zmienia się w Past Simple." }],
    flashcards: [{ id: 'rs-f1', front: "W co zmienia się 'Will'?", back: "Would" }]
  },
  {
    id: 'modal-verbs',
    title: 'Modal Verbs',
    theory: `Czasowniki modalne: can, must, should, may, might.`,
    usage: ["Umiejętności", "Obowiązek", "Rada", "Pozwolenie"],
    forms: { affirmative: "I can swim", negative: "I can't swim", question: "Can you swim?" },
    examples: ["You should study more.", "I must go now.", "He might come tonight."],
    initialQuiz: [{ id: 'mv-q1', type: TaskType.MULTIPLE_CHOICE, question: "You ___ smoke here. It's forbidden.", options: ["mustn't", "shouldn't", "don't have to"], answer: "mustn't", explanation: "Zakaz wyrażamy przez 'mustn't'." }],
    flashcards: [{ id: 'mv-f1', front: "Rada - jakie słowo?", back: "should" }]
  },
  {
    id: 'relative-clauses',
    title: 'Relative Clauses',
    theory: `Zaimki względne: who, which, that, where, whose.`,
    usage: ["Łączenie zdań", "Dodawanie informacji o osobie/rzeczy"],
    forms: { affirmative: "The man who lives here...", negative: "The book that I don't like...", question: "Is this the place where we met?" },
    examples: ["This is the man who stole my bag.", "The house where I live is old."],
    initialQuiz: [{ id: 'rc-q1', type: TaskType.MULTIPLE_CHOICE, question: "The girl ___ sits next to me is nice.", options: ["who", "which", "where"], answer: "who", explanation: "Dla osób używamy 'who'." }],
    flashcards: [{ id: 'rc-f1', front: "Zaimek dla rzeczy?", back: "which / that" }]
  }
];
