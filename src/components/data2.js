const modules = [
  {
    id: 1,
    bezeichnung: "Einführung in die Informatik",
    modulenr: "112(2)",
    code: "EINF",
    fachsemester: "1",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 2,
    bezeichnung: "Hardware Konzepte",
    modulenr: "113",
    code: "HWK",
    fachsemester: "1",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 3,
    bezeichnung: "Selbst- und Methodenkompetenz",
    modulenr: "111",
    code: "SMK",
    fachsemester: "1",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 4,
    bezeichnung: "Diskrete Mathematik",
    modulenr: "115",
    code: "DMA",
    fachsemester: "1",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 5,
    bezeichnung: "Betriebssysteme",
    modulenr: "114",
    code: "BS",
    fachsemester: "2",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 6,
    bezeichnung: "Datenbanken",
    modulenr: "122",
    code: "DB",
    fachsemester: "2",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 7,
    bezeichnung: "Rechnernetze und Netzwerksicherheit",
    modulenr: "123(2)",
    code: "BS",
    fachsemester: "2",
    studiengang: "Angewandte Informatik",
  },
  {
    id: 8,
    bezeichnung: "Objektorientierte Programmierung",
    modulenr: "124",
    code: "PROG2",
    fachsemester: "2",
    studiengang: "Angewandte Informatik",
  },
];

// const keysList = Object.keys(rooms[0]).join(", ");

const rooms = [
  {
    id: 1,
    name: "N104",
    capacity: 35,
    equipment: "Labor",
  },
  {
    id: 2,
    name: "N105",
    capacity: 40,
    equipment: "Classroom",
  },
  {
    id: 3,
    name: "N106",
    capacity: 30,
    equipment: "Classroom",
  },
  {
    id: 4,
    name: "N107",
    capacity: 25,
    equipment: "Labor",
  },
  {
    id: 5,
    name: "N108",
    capacity: 50,
    equipment: "Classroom",
  },
  {
    id: 6,
    name: "N109",
    capacity: 45,
    equipment: "Labor",
  },
  {
    id: 7,
    name: "N110",
    capacity: 30,
    equipment: "Classroom",
  },
  {
    id: 8,
    name: "N111",
    capacity: 40,
    equipment: "Labor",
  },
  {
    id: 9,
    name: "N112",
    capacity: 35,
    equipment: "Classroom",
  },
  {
    id: 10,
    name: "N113",
    capacity: 30,
    equipment: "Labor",
  },
];

const teachers = [
  {
    id: 1,
    name: "Herbert Thielen",
    email: "herbert.thielen@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 2,
    name: "Zdravko Bozakov",
    email: "zdravko.bozakov@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 3,
    name: "Oliver Gloger",
    email: "oliver.gloger@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 4,
    name: "Elisabeth Heinemann",
    email: "elisabeth.heinemann@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 5,
    name: "Dagmar Kessler",
    email: "dagmar.kessler@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 6,
    name: "Werner König",
    email: "werner.koenig@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
  {
    id: 7,
    name: "Bernd Ruhland",
    email: "bernd.ruhland@hs-worms.de",
    title: "Prof Dr.",
    intern: true,
  },
];

export default { modules, rooms, teachers };
