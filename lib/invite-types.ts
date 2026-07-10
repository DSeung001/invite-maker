export type InviteLanguage = "ko" | "en" | "ja" | "zh";

export type InviteImage =
  | { type: "sample"; value: string }
  | { type: "url"; value: string };

export type Schedule = {
  date: string; // YYYY-MM-DD
  times: string[]; // HH:mm
};

export type FoodOption = {
  icon: string;
  label: string;
};

export type InviteText = {
  question: string;
  yesLabel: string;
  noLabel: string;
  yesTitle: string;
  yesDescription: string;
  nextButton: string;
  scheduleTitle: string;
  foodTitle: string;
  finalTitle: string;
  finalLetter: string;
  rejectTitle: string;
  rejectDescription: string;
};

export type InviteData = {
  version: 1;
  language: InviteLanguage;
  image: InviteImage;
  text: InviteText;
  schedules: Schedule[];
  foods: FoodOption[];
  timezone: "Asia/Seoul";
};

export const LIMITS = {
  question: 60,
  yesTitle: 80,
  yesDescription: 120,
  finalLetter: 300,
  rejectTitle: 60,
  rejectDescription: 120,
  maxDates: 3,
  maxTimesPerDate: 6,
  minFoods: 2,
  maxFoods: 6,
  foodLabel: 20,
  imageUrl: 500,
  urlWarn: 4000,
  urlBlock: 8000,
} as const;

export const MOBILE_ESCAPE_LIMIT = 4;
export const DESKTOP_ESCAPE_DURATION_MS = 20_000;
export const POINTER_ESCAPE_RADIUS = 80;

export const SAMPLE_IMAGE_IDS = [
  "sample-01",
  "sample-02",
  "sample-03",
  "sample-04",
  "sample-05",
  "sample-06",
  "sample-07",
  "sample-08",
  "sample-09",
  "sample-10",
  "sample-11",
  "sample-12",
  "sample-13",
  "sample-14",
  "sample-15",
] as const;
