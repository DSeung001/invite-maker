import type { InviteData, InviteLanguage, InviteText } from "./invite-types";

export const TEXT_PRESETS: Record<InviteLanguage, InviteText> = {
  ko: {
    question: "있잖아... 나랑 데이트 갈래?",
    yesLabel: "좋아!",
    noLabel: "음...",
    yesTitle: "헉, 진짜...?",
    yesDescription: "사실 거절하면 어쩌나 엄청 떨렸어...",
    nextButton: "그럼... 다음으로",
    scheduleTitle: "우리 언제 만날까...?",
    foodTitle: "그날... 뭐 먹으러 갈까?",
    finalTitle: "고마워...!",
    finalLetter: "너랑 보낼 그날을 생각하니까 벌써 설레... 그날 봐!",
    rejectTitle: "괜찮아...",
    rejectDescription: "다음에 기회가 되면... 그때 같이 가자.",
  },
  en: {
    question: "So... will you go on a date with me?",
    yesLabel: "Yes!",
    noLabel: "Hmm...",
    yesTitle: "Wait... really?",
    yesDescription: "I was so nervous you'd say no...",
    nextButton: "Okay... next",
    scheduleTitle: "So... when are you free?",
    foodTitle: "And... what should we eat?",
    finalTitle: "Thank you...!",
    finalLetter: "I'm already excited just thinking about that day... See you then!",
    rejectTitle: "That's okay...",
    rejectDescription: "Maybe next time... let's go together then.",
  },
  ja: {
    question: "あのね... 私とデートしない？",
    yesLabel: "いいよ！",
    noLabel: "うーん...",
    yesTitle: "え、ほんとに...？",
    yesDescription: "断られたらどうしようって、すごくドキドキしてた...",
    nextButton: "じゃあ... 次へ",
    scheduleTitle: "いつ会おうか...？",
    foodTitle: "その日... 何食べに行く？",
    finalTitle: "ありがとう...！",
    finalLetter: "その日のことを考えるだけで、もうワクワクしてる... じゃあ、その日にね！",
    rejectTitle: "大丈夫...",
    rejectDescription: "また今度、機会があったら... その時は一緒に行こうね。",
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
