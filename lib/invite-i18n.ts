import type { InviteLanguage } from "./invite-types";

export const SUPPORTED_LANGUAGES: readonly InviteLanguage[] = [
  "ko",
  "en",
  "ja",
  "zh",
] as const;

export function isSupportedLanguage(value: unknown): value is InviteLanguage {
  return (
    typeof value === "string" &&
    SUPPORTED_LANGUAGES.includes(value as InviteLanguage)
  );
}

export const LANGUAGE_LABELS: Record<InviteLanguage, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

export const DATE_LOCALES: Record<InviteLanguage, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
  zh: "zh-CN",
};

export type TimePresetId = "lunch" | "afternoon" | "evening";

export const TIME_PRESET_LABELS: Record<
  InviteLanguage,
  Record<TimePresetId, string>
> = {
  ko: { lunch: "점심", afternoon: "오후", evening: "저녁" },
  en: { lunch: "Lunch", afternoon: "Afternoon", evening: "Evening" },
  ja: { lunch: "昼", afternoon: "午後", evening: "夜" },
  zh: { lunch: "午餐", afternoon: "下午", evening: "晚餐" },
};

export type EditorUi = {
  heading: string;
  sectionLanguage: string;
  languageHint: string;
  sectionImage: string;
  customImageAriaLabel: string;
  customImageLabel: string;
  sampleImageAlt: (id: string) => string;
  samplePaginationAriaLabel: string;
  prev: string;
  next: string;
  sectionText: string;
  lineBreakHelp: string;
  lineBreakHelpAriaLabel: string;
  fieldQuestion: string;
  fieldYesTitle: string;
  fieldYesDescription: string;
  fieldRejectTitle: string;
  fieldRejectDescription: string;
  fieldFinalLetter: string;
  fieldCount: (current: number, max: number) => string;
  sectionSchedule: (maxDates: number) => string;
  sectionTimezone: string;
  timezoneHint: string;
  timezoneAriaLabel: string;
  dateAriaLabel: (index: number) => string;
  removeDateAriaLabel: string;
  clearTimes: string;
  copyTimesToOtherDates: string;
  selectedTimesHint: (count: number, max: number, times: string) => string;
  scheduleTimeEmpty: string;
  addTime: (time: string) => string;
  addTimeDuplicate: string;
  addTimeMax: (max: number) => string;
  removeTimeAriaLabel: (time: string) => string;
  selectedTimesAriaLabel: string;
  addDate: string;
  sectionFoods: (min: number, max: number) => string;
  foodSlotAriaLabel: (index: number) => string;
  foodEmojiAriaLabel: (index: number) => string;
  foodNamePlaceholder: string;
  foodNameAriaLabel: (index: number) => string;
  removeFoodAriaLabel: string;
  addFood: string;
  recommendedMenusTitle: string;
  recommendedMenusHint: string;
  currentSlotBadge: (index: number) => string;
  sectionShareLink: string;
  errorNoSchedule: string;
  errorMinFoods: (min: number) => string;
  errorInvalidImageUrl: string;
  errorNoQuestion: string;
  errorUrlTooLong: string;
  warningUrlLong: string;
  copyLink: string;
  copied: string;
  openInvite: string;
  previewOpen: string;
  previewClose: string;
  shareLinkHint: string;
  urlModalTitle: string;
  urlModalHint: string;
  urlModalFieldLabel: string;
  urlModalError: string;
  cancel: string;
  apply: string;
};

export const EDITOR_UI: Record<InviteLanguage, EditorUi> = {
  ko: {
    heading: "데이트 초대장 만들기 💌",
    sectionLanguage: "언어",
    languageHint: "언어를 바꾸면 기본 문구가 초기화됩니다.",
    sectionImage: "대표 이미지",
    customImageAriaLabel: "커스텀 이미지 URL 입력",
    customImageLabel: "이미지 주소 입력",
    sampleImageAlt: (id) => `샘플 이미지 ${id}`,
    samplePaginationAriaLabel: "대표 이미지 페이지 이동",
    prev: "이전",
    next: "다음",
    sectionText: "문구",
    lineBreakHelp: "줄바꿈은 <br/> 만 사용할 수 있어요.",
    lineBreakHelpAriaLabel: "줄바꿈 도움말",
    fieldQuestion: "메인 질문",
    fieldYesTitle: "수락 확인 제목",
    fieldYesDescription: "수락 확인 부제",
    fieldRejectTitle: "거절 제목",
    fieldRejectDescription: "거절 설명",
    fieldFinalLetter: "마지막 편지",
    fieldCount: (current, max) => `${current}/${max}`,
    sectionSchedule: (maxDates) => `가능한 날짜와 시간 (최대 ${maxDates}일)`,
    sectionTimezone: "시간대",
    timezoneHint: "선택한 시간은 이 시간대 기준입니다.",
    timezoneAriaLabel: "시간대 선택",
    dateAriaLabel: (index) => `날짜 ${index}`,
    removeDateAriaLabel: "날짜 삭제",
    clearTimes: "시간 초기화",
    copyTimesToOtherDates: "이 시간대를 다른 날짜에 복사",
    selectedTimesHint: (count, max, times) =>
      `선택한 시간 ${count}/${max}${times ? ` · ${times}` : ""}`,
    scheduleTimeEmpty: "아래 휠에서 시간을 고른 뒤 추가해 주세요.",
    addTime: (time) => `${time} 추가`,
    addTimeDuplicate: "이미 추가됨",
    addTimeMax: (max) => `최대 ${max}개`,
    removeTimeAriaLabel: (time) => `${time} 삭제`,
    selectedTimesAriaLabel: "선택된 시간",
    addDate: "+ 날짜 추가",
    sectionFoods: (min, max) => `음식 후보 (${min}~${max}개)`,
    foodSlotAriaLabel: (index) => `음식 ${index}번 편집 선택`,
    foodEmojiAriaLabel: (index) => `음식 ${index} 이모지`,
    foodNamePlaceholder: "메뉴 이름",
    foodNameAriaLabel: (index) => `음식 ${index} 이름`,
    removeFoodAriaLabel: "음식 삭제",
    addFood: "+ 음식 추가",
    recommendedMenusTitle: "추천 메뉴",
    recommendedMenusHint:
      "위에서 채울 칸을 고른 뒤, 아래 메뉴를 눌러 빠르게 넣을 수 있어요.",
    currentSlotBadge: (index) => `현재 ${index}번 칸`,
    sectionShareLink: "공유 링크",
    errorNoSchedule: "과거가 아닌 날짜와 시간을 최소 1개 설정해 주세요.",
    errorMinFoods: (min) => `음식 후보를 ${min}개 이상 입력해 주세요.`,
    errorInvalidImageUrl:
      "이미지 URL은 https:// 로 시작하고 .png, .jpg, .webp 등 이미지 확장자로 끝나야 합니다.",
    errorNoQuestion: "메인 질문을 입력해 주세요.",
    errorUrlTooLong: "링크가 너무 깁니다. 긴 문구나 이미지 URL을 줄여 주세요.",
    warningUrlLong: "링크가 깁니다. 일부 앱에서 잘릴 수 있어요.",
    copyLink: "초대장 링크 복사",
    copied: "복사 완료! 💗",
    openInvite: "확인하기",
    previewOpen: "미리보기",
    previewClose: "미리보기 닫기",
    shareLinkHint:
      "이 링크에는 초대장 내용이 그대로 담겨 있어요. 이름, 전화번호 같은 민감한 정보는 넣지 마세요.",
    urlModalTitle: "이미지 주소 입력",
    urlModalHint:
      "이미지 URL을 입력해 주세요. https로 시작하고 .png, .jpg, .webp 등 이미지 확장자로 끝나야 합니다.",
    urlModalFieldLabel: "이미지 URL",
    urlModalError: "올바른 이미지 URL을 입력해 주세요.",
    cancel: "취소",
    apply: "적용",
  },
  en: {
    heading: "Date Invite Maker 💌",
    sectionLanguage: "Language",
    languageHint: "Changing the language resets the default text.",
    sectionImage: "Cover image",
    customImageAriaLabel: "Enter custom image URL",
    customImageLabel: "Enter image URL",
    sampleImageAlt: (id) => `Sample image ${id}`,
    samplePaginationAriaLabel: "Cover image pages",
    prev: "Previous",
    next: "Next",
    sectionText: "Text",
    lineBreakHelp: "Use <br/> only for line breaks.",
    lineBreakHelpAriaLabel: "Line break help",
    fieldQuestion: "Main question",
    fieldYesTitle: "Acceptance title",
    fieldYesDescription: "Acceptance subtitle",
    fieldRejectTitle: "Rejection title",
    fieldRejectDescription: "Rejection message",
    fieldFinalLetter: "Final letter",
    fieldCount: (current, max) => `${current}/${max}`,
    sectionSchedule: (maxDates) => `Available dates and times (up to ${maxDates} days)`,
    sectionTimezone: "Time zone",
    timezoneHint: "Times you pick are in this time zone.",
    timezoneAriaLabel: "Select time zone",
    dateAriaLabel: (index) => `Date ${index}`,
    removeDateAriaLabel: "Remove date",
    clearTimes: "Clear times",
    copyTimesToOtherDates: "Copy these times to other dates",
    selectedTimesHint: (count, max, times) =>
      `Selected times ${count}/${max}${times ? ` · ${times}` : ""}`,
    scheduleTimeEmpty: "Pick a time on the wheel below, then add it.",
    addTime: (time) => `Add ${time}`,
    addTimeDuplicate: "Already added",
    addTimeMax: (max) => `Max ${max}`,
    removeTimeAriaLabel: (time) => `Remove ${time}`,
    selectedTimesAriaLabel: "Selected times",
    addDate: "+ Add date",
    sectionFoods: (min, max) => `Food options (${min}–${max})`,
    foodSlotAriaLabel: (index) => `Select food slot ${index} to edit`,
    foodEmojiAriaLabel: (index) => `Food ${index} emoji`,
    foodNamePlaceholder: "Menu name",
    foodNameAriaLabel: (index) => `Food ${index} name`,
    removeFoodAriaLabel: "Remove food",
    addFood: "+ Add food",
    recommendedMenusTitle: "Suggested menus",
    recommendedMenusHint:
      "Select a slot above, then tap a menu below to fill it quickly.",
    currentSlotBadge: (index) => `Slot ${index}`,
    sectionShareLink: "Share link",
    errorNoSchedule: "Set at least one future date and time.",
    errorMinFoods: (min) => `Enter at least ${min} food options.`,
    errorInvalidImageUrl:
      "Image URL must start with https:// and end with an image extension such as .png, .jpg, or .webp.",
    errorNoQuestion: "Enter the main question.",
    errorUrlTooLong: "The link is too long. Shorten long text or the image URL.",
    warningUrlLong: "The link is long. Some apps may truncate it.",
    copyLink: "Copy invite link",
    copied: "Copied! 💗",
    openInvite: "Open invite",
    previewOpen: "Preview",
    previewClose: "Close preview",
    shareLinkHint:
      "This link contains the invite content. Do not include sensitive info like names or phone numbers.",
    urlModalTitle: "Enter image URL",
    urlModalHint:
      "Enter an image URL. It must start with https and end with an image extension such as .png, .jpg, or .webp.",
    urlModalFieldLabel: "Image URL",
    urlModalError: "Enter a valid image URL.",
    cancel: "Cancel",
    apply: "Apply",
  },
  ja: {
    heading: "デート招待状メーカー 💌",
    sectionLanguage: "言語",
    languageHint: "言語を変えると、デフォルトの文面がリセットされます。",
    sectionImage: "代表画像",
    customImageAriaLabel: "カスタム画像URLを入力",
    customImageLabel: "画像URLを入力",
    sampleImageAlt: (id) => `サンプル画像 ${id}`,
    samplePaginationAriaLabel: "代表画像のページ移動",
    prev: "前へ",
    next: "次へ",
    sectionText: "文面",
    lineBreakHelp: "改行には <br/> のみ使えます。",
    lineBreakHelpAriaLabel: "改行のヘルプ",
    fieldQuestion: "メインの質問",
    fieldYesTitle: "承諾確認タイトル",
    fieldYesDescription: "承諾確認サブタイトル",
    fieldRejectTitle: "お断りタイトル",
    fieldRejectDescription: "お断りメッセージ",
    fieldFinalLetter: "最後の手紙",
    fieldCount: (current, max) => `${current}/${max}`,
    sectionSchedule: (maxDates) => `候補日と時間（最大${maxDates}日）`,
    sectionTimezone: "タイムゾーン",
    timezoneHint: "選んだ時間はこのタイムゾーン基準です。",
    timezoneAriaLabel: "タイムゾーンを選択",
    dateAriaLabel: (index) => `日付 ${index}`,
    removeDateAriaLabel: "日付を削除",
    clearTimes: "時間をリセット",
    copyTimesToOtherDates: "この時間帯を他の日付にコピー",
    selectedTimesHint: (count, max, times) =>
      `選択した時間 ${count}/${max}${times ? ` · ${times}` : ""}`,
    scheduleTimeEmpty: "下のホイールで時間を選んでから追加してください。",
    addTime: (time) => `${time} を追加`,
    addTimeDuplicate: "追加済み",
    addTimeMax: (max) => `最大 ${max} 個`,
    removeTimeAriaLabel: (time) => `${time} を削除`,
    selectedTimesAriaLabel: "選択した時間",
    addDate: "+ 日付を追加",
    sectionFoods: (min, max) => `食べ物候補（${min}〜${max}個）`,
    foodSlotAriaLabel: (index) => `食べ物 ${index}番の編集を選択`,
    foodEmojiAriaLabel: (index) => `食べ物 ${index} の絵文字`,
    foodNamePlaceholder: "メニュー名",
    foodNameAriaLabel: (index) => `食べ物 ${index} の名前`,
    removeFoodAriaLabel: "食べ物を削除",
    addFood: "+ 食べ物を追加",
    recommendedMenusTitle: "おすすめメニュー",
    recommendedMenusHint:
      "上で入れる枠を選んでから、下のメニューをタップして素早く入力できます。",
    currentSlotBadge: (index) => `現在 ${index}番枠`,
    sectionShareLink: "共有リンク",
    errorNoSchedule: "過去ではない日付と時間を最低1つ設定してください。",
    errorMinFoods: (min) => `食べ物候補を${min}個以上入力してください。`,
    errorInvalidImageUrl:
      "画像URLは https:// で始まり、.png、.jpg、.webp などの画像拡張子で終わる必要があります。",
    errorNoQuestion: "メインの質問を入力してください。",
    errorUrlTooLong: "リンクが長すぎます。長い文面や画像URLを短くしてください。",
    warningUrlLong: "リンクが長いです。一部のアプリで切り詰められる場合があります。",
    copyLink: "招待状リンクをコピー",
    copied: "コピーしました 💗",
    openInvite: "確認する",
    previewOpen: "プレビュー",
    previewClose: "プレビューを閉じる",
    shareLinkHint:
      "このリンクには招待状の内容がそのまま含まれます。名前や電話番号などの個人情報は入れないでください。",
    urlModalTitle: "画像URLを入力",
    urlModalHint:
      "画像URLを入力してください。httpsで始まり、.png、.jpg、.webp などの画像拡張子で終わる必要があります。",
    urlModalFieldLabel: "画像URL",
    urlModalError: "正しい画像URLを入力してください。",
    cancel: "キャンセル",
    apply: "適用",
  },
  zh: {
    heading: "约会邀请函制作 💌",
    sectionLanguage: "语言",
    languageHint: "切换语言会重置默认文案。",
    sectionImage: "封面图片",
    customImageAriaLabel: "输入自定义图片 URL",
    customImageLabel: "输入图片地址",
    sampleImageAlt: (id) => `示例图片 ${id}`,
    samplePaginationAriaLabel: "封面图片翻页",
    prev: "上一页",
    next: "下一页",
    sectionText: "文案",
    lineBreakHelp: "换行只能使用 <br/>。",
    lineBreakHelpAriaLabel: "换行帮助",
    fieldQuestion: "主要问题",
    fieldYesTitle: "接受确认标题",
    fieldYesDescription: "接受确认副标题",
    fieldRejectTitle: "拒绝标题",
    fieldRejectDescription: "拒绝说明",
    fieldFinalLetter: "最后留言",
    fieldCount: (current, max) => `${current}/${max}`,
    sectionSchedule: (maxDates) => `可选日期和时间（最多 ${maxDates} 天）`,
    sectionTimezone: "时区",
    timezoneHint: "所选时间以此时区为准。",
    timezoneAriaLabel: "选择时区",
    dateAriaLabel: (index) => `日期 ${index}`,
    removeDateAriaLabel: "删除日期",
    clearTimes: "重置时间",
    copyTimesToOtherDates: "将此时间段复制到其他日期",
    selectedTimesHint: (count, max, times) =>
      `已选时间 ${count}/${max}${times ? ` · ${times}` : ""}`,
    scheduleTimeEmpty: "请在下方滚轮中选择时间后添加。",
    addTime: (time) => `添加 ${time}`,
    addTimeDuplicate: "已添加",
    addTimeMax: (max) => `最多 ${max} 个`,
    removeTimeAriaLabel: (time) => `删除 ${time}`,
    selectedTimesAriaLabel: "已选时间",
    addDate: "+ 添加日期",
    sectionFoods: (min, max) => `食物选项（${min}~${max} 个）`,
    foodSlotAriaLabel: (index) => `选择编辑食物 ${index}`,
    foodEmojiAriaLabel: (index) => `食物 ${index} 表情`,
    foodNamePlaceholder: "菜单名称",
    foodNameAriaLabel: (index) => `食物 ${index} 名称`,
    removeFoodAriaLabel: "删除食物",
    addFood: "+ 添加食物",
    recommendedMenusTitle: "推荐菜单",
    recommendedMenusHint: "先在上方选择要填写的格子，再点击下方菜单快速填入。",
    currentSlotBadge: (index) => `当前第 ${index} 格`,
    sectionShareLink: "分享链接",
    errorNoSchedule: "请至少设置一个未来的日期和时间。",
    errorMinFoods: (min) => `请至少输入 ${min} 个食物选项。`,
    errorInvalidImageUrl:
      "图片 URL 必须以 https:// 开头，并以 .png、.jpg、.webp 等图片扩展名结尾。",
    errorNoQuestion: "请输入主要问题。",
    errorUrlTooLong: "链接太长。请缩短长文案或图片 URL。",
    warningUrlLong: "链接较长。部分应用可能会截断。",
    copyLink: "复制邀请函链接",
    copied: "已复制 💗",
    openInvite: "打开查看",
    previewOpen: "预览",
    previewClose: "关闭预览",
    shareLinkHint: "此链接包含邀请函内容。请勿放入姓名、电话等敏感信息。",
    urlModalTitle: "输入图片地址",
    urlModalHint:
      "请输入图片 URL。必须以 https 开头，并以 .png、.jpg、.webp 等图片扩展名结尾。",
    urlModalFieldLabel: "图片 URL",
    urlModalError: "请输入有效的图片 URL。",
    cancel: "取消",
    apply: "应用",
  },
};

export const RESULT_SHARE_UI: Record<
  InviteLanguage,
  {
    copy: string;
    share: string;
    copied: string;
    failed: string;
    header: string;
    date: string;
    time: string;
    tz: string;
    food: string;
  }
> = {
  ko: {
    copy: "답변 내용 복사하기",
    share: "답변 내용 공유하기",
    copied: "복사했어요!",
    failed: "복사에 실패했어요. 아래 내용을 직접 복사해 주세요.",
    header: "데이트 약속 완료",
    date: "날짜",
    time: "시간",
    tz: "시간대",
    food: "음식",
  },
  en: {
    copy: "Copy answer",
    share: "Share answer",
    copied: "Copied!",
    failed: "Copy failed. Please copy the text below.",
    header: "Date confirmed",
    date: "Date",
    time: "Time",
    tz: "Timezone",
    food: "Food",
  },
  ja: {
    copy: "回答内容をコピーする",
    share: "回答内容を共有する",
    copied: "コピーしました",
    failed: "コピーに失敗しました。下のテキストをコピーしてください。",
    header: "デートの約束完了",
    date: "日付",
    time: "時間",
    tz: "タイムゾーン",
    food: "食べ物",
  },
  zh: {
    copy: "复制回答内容",
    share: "分享回答内容",
    copied: "已复制",
    failed: "复制失败，请复制下面的文本。",
    header: "约会已确认",
    date: "日期",
    time: "时间",
    tz: "时区",
    food: "食物",
  },
};

export const FEEDBACK_UI: Record<InviteLanguage, { label: string }> = {
  ko: { label: "개발자에게 의견 보내기" },
  en: { label: "Send feedback to the developer" },
  ja: { label: "開発者に意見を送る" },
  zh: { label: "向开发者发送意见" },
};

export const FEEDBACK_FORM_URL = "https://naver.me/IDk6Q0Oj";
