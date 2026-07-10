import type {
  FoodOption,
  InviteData,
  InviteLanguage,
  InviteText,
} from "./invite-types";
import { LIMITS } from "./invite-types";

export const TEXT_PRESETS: Record<InviteLanguage, InviteText> = {
  ko: {
    question: "있잖아... 나랑 데이트 갈래?",
    yesLabel: "좋아요",
    noLabel: "싫어..",
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
    yesLabel: "Like",
    noLabel: "No..",
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
    yesLabel: "いいよ",
    noLabel: "いや..",
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
  zh: {
    question: "那个... 你愿意和我约会吗？",
    yesLabel: "喜欢",
    noLabel: "不要..",
    yesTitle: "诶，真的？",
    yesDescription: "其实我一直在紧张你会不会拒绝...",
    nextButton: "那... 下一步",
    scheduleTitle: "我们什么时候见面呢？",
    foodTitle: "那天... 想吃什么？",
    finalTitle: "谢谢你",
    finalLetter: "一想到那天要见你，我已经开始期待了。到时见。",
    rejectTitle: "没关系",
    rejectDescription: "如果下次有机会... 我们再一起去吧。",
  },
};

export const FOOD_PRESETS: Record<InviteLanguage, FoodOption[]> = {
  ko: [
    { icon: "🍕", label: "피자" },
    { icon: "🍣", label: "스시" },
    { icon: "🍔", label: "버거" },
    { icon: "🍝", label: "파스타" },
    { icon: "🌮", label: "타코" },
    { icon: "🍜", label: "라멘" },
    { icon: "🍗", label: "치킨" },
    { icon: "🥩", label: "스테이크" },
    { icon: "🥟", label: "만두" },
    { icon: "🍰", label: "케이크" },
    { icon: "🥗", label: "샐러드" },
    { icon: "🍛", label: "카레" },
    { icon: "🥪", label: "샌드위치" },
    { icon: "🍙", label: "김밥" },
    { icon: "🥞", label: "팬케이크" },
  ],
  en: [
    { icon: "🍕", label: "Pizza" },
    { icon: "🍣", label: "Sushi" },
    { icon: "🍔", label: "Burger" },
    { icon: "🍝", label: "Pasta" },
    { icon: "🌮", label: "Tacos" },
    { icon: "🍜", label: "Ramen" },
    { icon: "🍗", label: "Fried chicken" },
    { icon: "🥩", label: "Steak" },
    { icon: "🥟", label: "Dumplings" },
    { icon: "🍰", label: "Cake" },
    { icon: "🥗", label: "Salad" },
    { icon: "🍛", label: "Curry" },
    { icon: "🥪", label: "Sandwich" },
    { icon: "🍙", label: "Kimbap" },
    { icon: "🥞", label: "Pancakes" },
  ],
  ja: [
    { icon: "🍕", label: "ピザ" },
    { icon: "🍣", label: "寿司" },
    { icon: "🍔", label: "バーガー" },
    { icon: "🍝", label: "パスタ" },
    { icon: "🌮", label: "タコス" },
    { icon: "🍜", label: "ラーメン" },
    { icon: "🍗", label: "チキン" },
    { icon: "🥩", label: "ステーキ" },
    { icon: "🥟", label: "餃子" },
    { icon: "🍰", label: "ケーキ" },
    { icon: "🥗", label: "サラダ" },
    { icon: "🍛", label: "カレー" },
    { icon: "🥪", label: "サンドイッチ" },
    { icon: "🍙", label: "キンパプ" },
    { icon: "🥞", label: "パンケーキ" },
  ],
  zh: [
    { icon: "🍕", label: "披萨" },
    { icon: "🍣", label: "寿司" },
    { icon: "🍔", label: "汉堡" },
    { icon: "🍝", label: "意面" },
    { icon: "🌮", label: "塔可" },
    { icon: "🍜", label: "拉面" },
    { icon: "🍗", label: "炸鸡" },
    { icon: "🥩", label: "牛排" },
    { icon: "🥟", label: "饺子" },
    { icon: "🍰", label: "蛋糕" },
    { icon: "🥗", label: "沙拉" },
    { icon: "🍛", label: "咖喱饭" },
    { icon: "🥪", label: "三明治" },
    { icon: "🍙", label: "紫菜包饭" },
    { icon: "🥞", label: "松饼" },
  ],
};

export function createDefaultFoods(language: InviteLanguage): FoodOption[] {
  return FOOD_PRESETS[language]
    .slice(0, LIMITS.maxFoods)
    .map((food) => ({ ...food }));
}

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
    foods: createDefaultFoods(language),
    timezone: "Asia/Seoul",
  };
}
