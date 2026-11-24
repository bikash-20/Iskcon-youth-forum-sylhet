export const SITE_URL =
  process.env.PUBLIC_SITE_URL &&
  process.env.PUBLIC_SITE_URL !== "http://localhost:3000"
    ? process.env.PUBLIC_SITE_URL
    : "https://iyf-sylhet.vercel.app";

export const SITE_NAME = "ISKCON Youth Forum Sylhet";
export const MANDIR_NAME = "Sri Sri Radha Madhava Mandir";
export const ALT_NAMES = [
  "IYF Sylhet",
  "ISKCON Sylhet",
  "Sylhet ISKCON Mondir",
  "Sylhet ISKCON Mandir",
  "Sri Sri Radha Madhava Mandir Sylhet",
  "Jugaltila ISKCON Mandir",
  "ইস্কন যুব ফোরাম সিলেট",
  "সিলেট ইস্কন মন্দির",
  "শ্রী শ্রী রাধা মাধব মন্দির যুগলটিলা সিলেট",
];

export const PRIMARY_KEYWORDS = [
  // User specified primary search terms
  "iskcon youth forum sylhet",
  "iyf sylhet",
  "sylhet iskcon mondir",
  "sylhet iskcon mandir",
  "iskcon sylhet",
  "sylhet iskcon",
  // Temple & location variations
  "sri sri radha madhava mandir sylhet",
  "radha madhava mandir jugaltila",
  "iskcon jugaltila sylhet",
  "jugaltila iskcon",
  "iskcon temple sylhet",
  "iskcon mandir sylhet bangladesh",
  "kajalshah iskcon sylhet",
  "osmani medical college gate 1 iskcon sylhet",
  // Youth activities & programs
  "iskcon youth forum",
  "iyf bangladesh",
  "iskcon youth forum bangladesh",
  "be smart course iskcon sylhet",
  "discover yourself course sylhet",
  "gita classes sylhet",
  "bhagavad gita class for youth sylhet",
  "youth meditation sylhet",
  "kirtan club sylhet",
  "sunday feast iskcon sylhet",
  // Temple schedule & darshan queries
  "iskcon sylhet darshan time",
  "iskcon sylhet aarti schedule",
  "iskcon sylhet daily program",
  "sylhet iskcon mondir darshan timings",
  "iskcon sylhet phone number",
  "iskcon sylhet contact number",
  "iskcon sylhet location map",
  // Bengali search queries
  "ইস্কন যুব ফোরাম সিলেট",
  "সিলেট ইস্কন মন্দির",
  "শ্রী শ্রী রাধা মাধব মন্দির যুগলটিলা",
  "যুগলটিলা ইস্কন মন্দির সিলেট",
  "সিলেট ইস্কন দর্শন সময়",
  "ইস্কন সিলেট",
];

export const TEMPLE_DETAILS = {
  name: "ISKCON Youth Forum, Sylhet",
  legalName: "International Society for Krishna Consciousness, Sylhet",
  alternateName: ALT_NAMES,
  description:
    "ISKCON Youth Forum Sylhet (IYF Sylhet) is the youth wing of ISKCON Sylhet based at Sri Sri Radha Madhava Mandir, Jugaltila. Inspiring youth through Bhagavad-gita wisdom, mantra meditation, daily darshan, kirtan, and character development.",
  url: SITE_URL,
  telephone: ["+8801714101688", "+8801718781144"],
  address: {
    streetAddress: "Jugaltila, Kajalshah, Opposite Osmani Medical College Gate No. 1",
    addressLocality: "Sylhet",
    addressRegion: "Sylhet Division",
    postalCode: "3140",
    addressCountry: "BD",
  },
  geo: {
    latitude: 24.8996,
    longitude: 91.854,
  },
  sameAs: [
    "https://www.facebook.com/iyfsyl",
    "https://www.iskconsylhet.com",
    "https://www.youtube.com/results?search_query=gauradesh+tv",
    "https://github.com/bikash-20/Iskcon-youth-forum-sylhet",
  ],
  openingHours: [
    "Mo-Su 04:30-13:00",
    "Mo-Su 16:15-20:30",
  ],
};
