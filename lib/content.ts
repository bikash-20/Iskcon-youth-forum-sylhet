export type EventItem = {
  slug: string;
  title: string;
  start: string;
  end?: string;
  location: string;
  description: string;
  image?: string;
  isFeatured?: boolean;
  registration?: string;
};

export type ProgramItem = {
  name: string;
  time: string;
  description: string;
};

// Full daily programme at Sri Sri Radha Madhava Mandir — times in BD (UTC+6).
export type DailySlot = {
  name: string;
  /** "HH:MM" 24-hour, BD time */
  time: string;
  description: string;
  /** Whether darshan is open around this slot */
  darshan?: "open" | "closed";
  /** Optional accent — distinguishes opening/closing entries */
  kind?: "regular" | "opens" | "closes";
};

export type FestivalKind = "single" | "multi" | "month";

export type Festival = {
  slug: string;
  name: string;
  when: string; // human range, e.g. "Aug – Sep"
  month: string; // heading bucket
  kind: FestivalKind;
  /** ISO start (YYYY-MM-DD) for countdown; null = approximate */
  startISO?: string;
  description: string;
  tags?: string[];
};

export type CourseItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  modules: string[];
  duration: string;
  nextBatch?: string;
  registration?: string;
};

export const SCHEDULE: ProgramItem[] = [
  {
    name: "Mangal Arati",
    time: "4:30 AM",
    description: "The first tender arati of the day, at the break of dawn.",
  },
  {
    name: "Tulasi Puja & Japa",
    time: "5:00 AM",
    description: "Offerings to Tulasi Devi and a quiet hour of mantra meditation.",
  },
  {
    name: "Śrīmad Bhāgavatam Class",
    time: "7:30 AM",
    description: "Verse-by-verse discussion of the Bhāgavatam, open to all.",
  },
  {
    name: "Gītā Class for Youth",
    time: "5:30 PM",
    description: "A weekly walk through the Bhagavad-gītā with the IYF circle.",
  },
  {
    name: "Sandhyā Arati",
    time: "7:00 PM",
    description: "Evening arati to Śrī Śrī Rādhā-Mādhava, with kīrtan.",
  },
  {
    name: "Kīrtan & Prasādam",
    time: "7:45 PM",
    description: "Congregational chanting and a warm meal together.",
  },
];

export const COURSES: CourseItem[] = [
  {
    slug: "be-smart",
    title: "Be SMART",
    tagline: "Simplicity · Modesty · Awareness · Regularity · Truthfulness",
    description:
      "Our flagship youth course: a six-week journey that turns five quiet virtues into the architecture of a more conscious life. Built around small habits, satsanga, and reflection.",
    modules: [
      "Week 1 — Simplicity: clearing the noise",
      "Week 2 — Modesty: the strength of restraint",
      "Week 3 — Awareness: seeing with the heart",
      "Week 4 — Regularity: small daily anchors",
      "Week 5 — Truthfulness: words that match the soul",
      "Week 6 — Living SMART: a personal charter",
    ],
    duration: "6 weeks · Saturdays, 4:00–6:00 PM",
    nextBatch: "Next batch begins 8 August 2026",
    registration: "/contact",
  },
  {
    slug: "scripture-study",
    title: "Scripture Study Circle",
    tagline: "Read. Discuss. Apply.",
    description:
      "A guided weekly reading group across the Bhagavad-gītā and selected cantos of the Bhāgavatam. Friendly, curious, no prior background required.",
    modules: [
      "Foundations of bhakti",
      "The path of karma-yoga",
      "Śrīla Prabhupāda's commentaries",
      "Living wisdom in a modern city",
    ],
    duration: "Ongoing · Tuesdays, 6:30 PM",
    registration: "/contact",
  },
  {
    slug: "kirtan-club",
    title: "Kīrtan & Devotional Practices",
    tagline: "Chant. Listen. Dissolve.",
    description:
      "Weekly kīrtan training with traditional karatalās and mṛdaṅga. Open sessions for newcomers; deeper sessions for those who wish to learn the ragas.",
    modules: [
      "Voice & breath",
      "Karatalā patterns",
      "Classic kīrtanas",
      "Leading a session",
    ],
    duration: "Sundays, 5:00 PM",
    registration: "/contact",
  },
  {
    slug: "discover-yourself",
    title: "Discover Yourself",
    tagline: "A six-session journey through the Bhagavad-gītā.",
    description:
      "An internationally acclaimed, six-session course based on the Bhagavad-gītā, run by ISKCON temples and youth forums worldwide. Through interactive sessions, reflection, and open Q&A, it guides young seekers through life's deeper questions — Who am I? What is lasting happiness? Does God exist? Why do bad things happen? What is the real purpose of life? No prior knowledge is needed; a certificate is awarded on completion.",
    modules: [
      "Session 1 — Discover the Game of Life",
      "Session 2 — Discover the Inner Self",
      "Session 3 — Discover God (a logical proof)",
      "Session 4 — Discover the Manual of Life",
      "Session 5 — Discover Karma, choice, and destiny",
      "Session 6 — Discover practical spiritual living",
    ],
    duration: "6 sessions · weekends · ~1.5 hrs each · ages 15–35",
    nextBatch: "Next batch announced on WhatsApp · register interest below",
    registration: "/contact",
  },
  {
    slug: "stress-management-through-gita",
    title: "Stress Management through Gītā",
    tagline: "Calm the mind. See clearly. Act wisely.",
    description:
      "A short, practical workshop that draws from the Bhagavad-gītā to help students, professionals, and young adults deal with exam pressure, workplace stress, anxiety, and decision fatigue. Through guided reflection and short kīrtan sessions, participants learn to pause, observe, and respond — instead of react. No prior scriptural background needed.",
    modules: [
      "What stress really is — the Gītā's view",
      "The breath, the mantra, and the wandering mind",
      "Karma-yoga: doing your best without burning out",
      "Building a daily 15-minute reset",
      "Questions, answers, and a guided closing meditation",
    ],
    duration: "1-day workshop · Saturdays, 10:00 AM – 1:00 PM",
    nextBatch: "Next workshop: 19 September 2026",
    registration: "/contact",
  },
  {
    slug: "leadership-personality-development",
    title: "Leadership & Personality Development",
    tagline: "Lead yourself first — the rest follows.",
    description:
      "A youth leadership program built on the Gītā's model of the sthitaprajña — the steady, clear-headed person. Over four weeks, participants work on self-awareness, communication, decision-making, and team-leading through case studies, kīrtan circles, and small-group mentoring. Designed for IYF coordinators, club leaders, and anyone who wants to lead with integrity.",
    modules: [
      "Week 1 — Know yourself: values, strengths, blind spots",
      "Week 2 — Communicate with clarity and warmth",
      "Week 3 — Decide calmly: the sthitaprajña model",
      "Week 4 — Lead a small team: a live mini-project",
    ],
    duration: "4 weeks · Saturdays, 4:00–6:30 PM · ages 18–30",
    nextBatch: "Next cohort: 3 October 2026",
    registration: "/contact",
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    slug: "janmashtami-2026",
    title: "Krishna Leela Mela — Janmāṣṭamī",
    start: "2026-08-25T18:00:00+06:00",
    end: "2026-08-27T21:00:00+06:00",
    location: "Sri Sri Radha Madhava Mandir",
    description:
      "Three days of kirtan, abhishek, a midnight birth ceremony of Śrī Krishna, and a mela with stalls, prasadam, and theatre by the IYF youth.",
    isFeatured: true,
    registration: "/contact",
  },
  {
    slug: "be-smart-orientation",
    title: "Be SMART — Orientation Evening",
    start: "2026-08-01T18:30:00+06:00",
    location: "IYF Hall, Jugaltila",
    description:
      "An open evening for prospective Be SMART participants — meet the mentors, see the course material, ask anything.",
    registration: "/contact",
  },
  {
    slug: "narasimha-jayanti",
    title: "Nṛsiṁha Caturdaśī",
    start: "2026-09-12T19:00:00+06:00",
    location: "Temple courtyard",
    description:
      "Abhishek of Śrī Nṛsiṁhadeva, abhishek of the saligrama, and a special kirtan until midnight.",
  },
  {
    slug: "weekly-kirtan",
    title: "Sunday Community Kirtan",
    start: "Every Sunday, 5:00 PM",
    location: "Temple courtyard",
    description: "Our weekly open-air kirtan — bring a voice, bring a friend.",
  },
];

export const DEITIES = [
  { name: "Śrī Śrī Rādhā-Mādhava", note: "Main deities" },
  { name: "Śrī Śrī Jagannātha, Baladeva, Subhadrā", note: "Ratha-yatra lords" },
  { name: "Śrī Śrī Gaura-Nitāi", note: "Caitanya's mercy" },
  { name: "Śrī Nṛsiṁhadeva", note: "Protector" },
];

// ─────────────────────────────────────────────────────────────
// Every-day-at-the-mandir — full daily programme
// ─────────────────────────────────────────────────────────────
export const DAILY_PROGRAMME: DailySlot[] = [
  {
    name: "Mangala Arati",
    time: "04:30",
    description:
      "The first offering of the day, before sunrise. Silent in the temple room.",
    kind: "regular",
  },
  {
    name: "Darshan Arati",
    time: "07:00",
    description:
      "Morning darshan opens with arati — the curtains part and the deities are seen for the first time.",
    kind: "regular",
  },
  {
    name: "Srimad Bhagavatam Class",
    time: "08:00",
    description: "Daily scripture study — open to all visitors.",
    kind: "regular",
  },
  {
    name: "Raj Bhoga Arati",
    time: "11:45",
    description:
      "The midday meal offered to the Lord, followed by arati. Last darshan before the temple closes for the afternoon.",
    kind: "regular",
  },
  {
    name: "Temple Closes",
    time: "13:00",
    description:
      "The temple rests. The deities rest too — please return for Dhoop Arati at 4:00 PM.",
    kind: "closes",
  },
  {
    name: "Dhoop Arati",
    time: "16:00",
    description:
      "Incense offering to the deities. The temple reopens for the evening.",
    kind: "opens",
  },
  {
    name: "Sandhya Arati",
    time: "18:30",
    description:
      "Evening lamp offering to the deities, with kirtan and incense.",
    kind: "regular",
  },
  {
    name: "Bhagavad-gita Class",
    time: "19:15",
    description:
      "Evening class — scripture for the soul. Open to all visitors.",
    kind: "regular",
  },
  {
    name: "Shayan Arati",
    time: "20:15",
    description:
      "The final offering of the day — the deities are prepared for rest.",
    kind: "regular",
  },
  {
    name: "Temple Closes",
    time: "20:30",
    description:
      "The temple day ends here. The deities sleep; the lamps dim until Mangala Arati.",
    kind: "closes",
  },
];

// ─────────────────────────────────────────────────────────────
// Full Vaishnava festival calendar
// (Approximate; tied to the Vedic lunar calendar.)
// ─────────────────────────────────────────────────────────────
export const FESTIVALS: Festival[] = [
  {
    slug: "gaura-purnima",
    name: "Gaura Purnima",
    when: "Feb – Mar",
    month: "March",
    kind: "single",
    description:
      "Appearance day of Sri Caitanya Mahaprabhu — the golden avatar who spread the chanting of the holy names across the world.",
    tags: ["Prasadam served free", "Appearance of Sri Caitanya Mahaprabhu"],
  },
  {
    slug: "rama-navami",
    name: "Rama Navami",
    when: "Apr – May",
    month: "April",
    kind: "single",
    description:
      "Appearance day of Lord Sri Ramachandra — the perfect king, the son of Dasharatha, the hero of the Ramayana.",
    tags: ["Prasadam served free"],
  },
  {
    slug: "pontirtha-snan-yatra",
    name: "Pontirtha Snan Yatra",
    when: "May",
    month: "May",
    kind: "single",
    description:
      "The ceremonial bath of the deities at the pond, marking the transition into the rainy season.",
    tags: ["Prasadam served free"],
  },
  {
    slug: "narasimha-jayanti",
    name: "Narasimha Jayanti",
    when: "May",
    month: "May",
    kind: "single",
    description:
      "Appearance day of Lord Nrsimhadeva — the half-man, half-lion incarnation who protected Prahlada and destroyed Hiranyakashipu.",
    tags: ["Prasadam served free"],
  },
  {
    slug: "jayapataka-swami-vyasapuja",
    name: "Jayapataka Swami Vyasapuja",
    when: "Jun – Jul",
    month: "June",
    kind: "single",
    description:
      "Celebration of the appearance day of His Holiness Jayapataka Swami — a senior Vaishnava sannyasi who has served ISKCON across the world for decades.",
    tags: ["Prasadam served free", "Vyasapuja offering"],
  },
  {
    slug: "snan-yatra",
    name: "Snan Yatra",
    when: "June",
    month: "June",
    kind: "single",
    description:
      "The deities of the mandir are ceremonially bathed in panca-amrita — milk, yogurt, honey, ghee, and sugar — and dressed in fresh clothes for the rainy season.",
    tags: ["Prasadam served free"],
  },
  {
    slug: "rathayatra",
    name: "Rathayatra",
    when: "July",
    month: "July",
    kind: "multi",
    description:
      "A nine-day public festival celebrating Lord Jagannatha, Baladeva, and Subhadra — the chariot procession travels through the streets of Sylhet with kirtan, dance, and an enormous public prasadam distribution.",
    tags: [
      "Prasadam served free",
      "9-day chariot festival · city procession",
    ],
  },
  {
    slug: "purushottam-month",
    name: "Purushottam Month",
    when: "Jun – Jul",
    month: "June – July",
    kind: "month",
    description:
      "A two-month extra-scriptural observance honouring Purushottama (Lord Jagannatha). Daily extra rounds of japa, special kirtan, and additional prasadam offerings throughout the period.",
    tags: ["Prasadam served free", "2-month observance"],
  },
  {
    slug: "jhulan-yatra",
    name: "Jhulan Yatra",
    when: "Aug – Sep",
    month: "August",
    kind: "single",
    description:
      "The swing festival — Sri Sri Radha Madhava are placed on decorated swings and gently swung to kirtan for several days, recalling Their pastimes in Vrindavan.",
    tags: ["Prasadam served free", "Swing festival · multi-day"],
  },
  {
    slug: "janmashtami",
    name: "Janmashtami",
    when: "August",
    month: "August",
    kind: "single",
    startISO: "2026-08-25",
    description:
      "The appearance day of Lord Sri Krishna — a full day and night of kirtan, abhishek, and midnight arati. Prasadam is served throughout.",
    tags: ["Prasadam served free", "Appearance of Lord Krishna"],
  },
  {
    slug: "radha-astami",
    name: "Radha Astami",
    when: "September",
    month: "September",
    kind: "single",
    description:
      "Appearance day of Srimati Radharani — Krishna's most beloved devotee and the embodiment of devotion itself.",
    tags: ["Prasadam served free"],
  },
  {
    slug: "srila-prabhupada-vyasapuja",
    name: "Srila Prabhupada Vyasapuja",
    when: "September",
    month: "September",
    kind: "single",
    description:
      "The appearance day of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada — founder-ācārya of ISKCON, who brought the teachings of Caitanya Mahaprabhu to the world.",
    tags: ["Prasadam served free", "Founder-ācārya · book distribution"],
  },
  {
    slug: "damodar-month",
    name: "Damodar Month",
    when: "Oct – Nov",
    month: "October – November",
    kind: "month",
    description:
      "A full month of extended evening lamp-offering arati to Sri Sri Radha Madhava in Their Damodara form, accompanied by kirtan, scripture readings, and an extra prasadam feast each day.",
    tags: [
      "Prasadam served free",
      "Month-long observance · daily lamp offering",
    ],
  },
  {
    slug: "gita-jayanti",
    name: "Gita Jayanti",
    when: "Dec – Jan",
    month: "December",
    kind: "single",
    description:
      "The day Lord Sri Krishna first spoke the Bhagavad-gita to Arjuna on the battlefield of Kurukshetra — celebrated with continuous scripture recitation and a public Gita recitation marathon.",
    tags: ["Prasadam served free"],
  },
];

// ─────────────────────────────────────────────────────────────
// Verse & thought of the day
// ─────────────────────────────────────────────────────────────
export const VERSE_OF_THE_DAY = {
  sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
  transliteration: "hare kṛṣṇa hare kṛṣṇa kṛṣṇa kṛṣṇa hare hare",
  meaning:
    "Chant the holy names of the Lord — the maha-mantra for this age.",
  source: "Kali-santarana Upanishad",
};

export const THOUGHT_OF_THE_DAY = {
  text: "Cows are mothers; protect them. Trees are friends; never cut them without purpose.",
  source: "Manu-samhita",
};

// Featured festival countdown — shown on the schedule page.
export const FEATURED_FESTIVAL = {
  slug: "janmashtami",
  name: "Janmashtami",
  iso: "2026-08-25T00:00:00+06:00",
  description:
    "A full day and night of kirtan, abhishek, and midnight arati. Prasadam is served throughout.",
};