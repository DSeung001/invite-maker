import type { InviteData, InviteLanguage, InviteText } from "./invite-types";

export const TEXT_PRESETS: Record<InviteLanguage, InviteText> = {
  ko: {
    question: "나랑 데이트 갈래?",
    yesLabel: "YES",
    noLabel: "NO",
    yesTitle: "진짜로?",
    yesDescription: "거절할 줄 알았어.",
    nextButton: "좋아, 다음으로",
    scheduleTitle: "언제 만날래?",
    foodTitle: "뭐 먹을래?",
    finalTitle: "고마워!",
    finalLetter: "너와 함께할 시간이 벌써 기대돼.",
    rejectTitle: "괜찮아!",
    rejectDescription: "다음에 기회가 되면 같이 가자.",
  },
  en: {
    question: "Will you go on a date with me?",
    yesLabel: "YES",
    noLabel: "NO",
    yesTitle: "Wait, you actually said yes?",
    yesDescription: "I was so ready for you to say no.",
    nextButton: "Okay, okay!",
    scheduleTitle: "When are you free?",
    foodTitle: "What are we feeling?",
    finalTitle: "Thank you!",
    finalLetter: "I can't wait to spend time with you.",
    rejectTitle: "That's okay!",
    rejectDescription: "Maybe next time.",
  },
  ja: {
    question: "私とデートしませんか？",
    yesLabel: "YES",
    noLabel: "NO",
    yesTitle: "本当に？",
    yesDescription: "断られると思ってた。",
    nextButton: "次へ",
    scheduleTitle: "いつ会う？",
    foodTitle: "何を食べる？",
    finalTitle: "ありがとう！",
    finalLetter: "一緒に過ごす時間が楽しみです。",
    rejectTitle: "大丈夫！",
    rejectDescription: "また今度、機会があれば行こう。",
  },
};

export const DEFAULT_FOODS = [
  { icon: "🍕", label: "피자" },
  { icon: "🍣", label: "스시" },
  { icon: "🍔", label: "버거" },
  { icon: "🍝", label: "파스타" },
  { icon: "🌮", label: "타코" },
  { icon: "🍜", label: "라멘" },
];

function futureDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function createDefaultInvite(language: InviteLanguage = "ko"): InviteData {
  return {
    version: 1,
    language,
    image: { type: "sample", value: "sample-01" },
    text: { ...TEXT_PRESETS[language] },
    schedules: [
      { date: futureDate(7), times: ["17:00", "18:00", "19:00"] },
      { date: futureDate(8), times: ["13:00", "14:00"] },
    ],
    foods: DEFAULT_FOODS.slice(0, 6),
    timezone: "Asia/Seoul",
  };
}
