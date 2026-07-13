import { FEEDBACK_FORM_URL } from "./invite-i18n";
import type { InviteLanguage } from "./invite-types";
import type { SitePageSlug } from "./paths";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "faq"; q: string; a: string }
  | { type: "link"; href: string; label: string; external?: boolean };

export type SitePageContent = {
  title: string;
  description: string;
  blocks: ContentBlock[];
};

export type SiteChromeLabels = {
  siteName: string;
  home: string;
  backHome: string;
  language: string;
  about: string;
  faq: string;
  privacy: string;
  terms: string;
  contact: string;
};

export const SITE_URL = "https://date-invite.devseung.com";

export const SITE_CHROME: Record<InviteLanguage, SiteChromeLabels> = {
  ko: {
    siteName: "데이트 초대장 메이커",
    home: "홈",
    backHome: "초대장 만들기로 돌아가기",
    language: "언어",
    about: "서비스 소개",
    faq: "자주 묻는 질문",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    contact: "문의",
  },
  en: {
    siteName: "Date Invitation Maker",
    home: "Home",
    backHome: "Back to invitation maker",
    language: "Language",
    about: "About",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contact: "Contact",
  },
  ja: {
    siteName: "デート招待状メーカー",
    home: "ホーム",
    backHome: "招待状作成に戻る",
    language: "言語",
    about: "サービス紹介",
    faq: "よくある質問",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    contact: "お問い合わせ",
  },
  zh: {
    siteName: "约会邀请函制作工具",
    home: "首页",
    backHome: "返回邀请函制作",
    language: "语言",
    about: "服务介绍",
    faq: "常见问题",
    privacy: "隐私政策",
    terms: "使用条款",
    contact: "联系我们",
  },
};

const ABOUT: Record<InviteLanguage, SitePageContent> = {
  ko: {
    title: "서비스 소개",
    description:
      "데이트 초대장 메이커는 링크 하나로 보내는 플레이풀한 데이트 초대장을 만드는 무료 웹 도구입니다.",
    blocks: [
      {
        type: "p",
        text: "데이트 초대장 메이커는 상대에게 보낼 데이트 초대장을 만들고, 하나의 링크로 공유할 수 있는 웹 서비스입니다. 회원가입이나 앱 설치 없이 브라우저에서 바로 사용할 수 있습니다.",
      },
      { type: "h2", text: "이런 분들께 어울립니다" },
      {
        type: "ul",
        items: [
          "특별한 데이트 제안을 가볍고 재미있게 전하고 싶은 분",
          "날짜·시간·음식 선택지를 상대가 고르게 하고 싶은 분",
          "서버에 내용을 저장하지 않고 링크로만 공유하고 싶은 분",
        ],
      },
      { type: "h2", text: "주요 기능" },
      {
        type: "ul",
        items: [
          "초대장 문구 언어: 한국어, 영어, 일본어, 중국어",
          "대표 이미지 설정(샘플 이미지 또는 HTTPS 이미지 URL)",
          "가능한 날짜와 시간 선택지 설정",
          "점심·오후·저녁 프리셋으로 시간 빠르게 채우기",
          "한 날짜의 시간대를 다른 날짜로 복사",
          "음식 선택지 설정",
          "초대장 링크 생성 및 공유",
          "상대가 최종 선택 결과를 복사·공유해 전달",
        ],
      },
      { type: "h2", text: "데이터가 저장되는 방식" },
      {
        type: "p",
        text: "초대장 내용은 서버 데이터베이스가 아니라 공유 링크(URL) 자체에 포함됩니다. 링크를 가진 사람은 내용을 확인할 수 있으므로, 민감한 개인정보는 입력하지 마세요.",
      },
    ],
  },
  en: {
    title: "About",
    description:
      "Date Invitation Maker is a free web tool for creating playful date invitations you can share with one link.",
    blocks: [
      {
        type: "p",
        text: "Date Invitation Maker lets you create a date invitation and share it with a single link. You can use it in the browser with no sign-up and no app install.",
      },
      { type: "h2", text: "Who it is for" },
      {
        type: "ul",
        items: [
          "People who want to send a light, playful date invitation",
          "People who want their partner to choose among date, time, and food options",
          "People who prefer sharing via a link instead of storing content on a server",
        ],
      },
      { type: "h2", text: "Key features" },
      {
        type: "ul",
        items: [
          "Invitation languages: Korean, English, Japanese, Chinese",
          "Cover image (sample images or an HTTPS image URL)",
          "Date and time options",
          "Quick time presets (Lunch / Afternoon / Evening)",
          "Copy selected times from one date to other dates",
          "Food options",
          "Generate and share one invitation link",
          "Let your partner copy or share the final choices back to you",
        ],
      },
      { type: "h2", text: "How data is stored" },
      {
        type: "p",
        text: "Invitation content is embedded in the share link (URL), not in a server database. Anyone with the link can read that content, so do not include sensitive personal information.",
      },
    ],
  },
  ja: {
    title: "サービス紹介",
    description:
      "デート招待状メーカーは、1つのリンクで送れる遊び心のあるデート招待状を作る無料のWebツールです。",
    blocks: [
      {
        type: "p",
        text: "デート招待状メーカーは、デートの招待状を作成し、1つのリンクで共有できるWebサービスです。会員登録やアプリのインストールなしで、ブラウザからすぐ使えます。",
      },
      { type: "h2", text: "こんな方におすすめ" },
      {
        type: "ul",
        items: [
          "特別なデートの誘いを、軽やかで楽しく伝えたい方",
          "日付・時間・食べ物の候補を相手に選んでもらいたい方",
          "サーバーに保存せず、リンクだけで共有したい方",
        ],
      },
      { type: "h2", text: "主な機能" },
      {
        type: "ul",
        items: [
          "招待状の言語: 韓国語、英語、日本語、中国語",
          "カバー画像の設定（サンプル画像またはHTTPS画像URL）",
          "候補の日付と時間の設定",
          "ランチ・午後・夜のプリセットで時間を素早く入力",
          "ある日付で選んだ時間帯を他の日付へコピー",
          "食べ物の候補設定",
          "招待状リンクの生成と共有",
          "相手が最終選択結果をコピー・共有して伝えられる",
        ],
      },
      { type: "h2", text: "データの保存方法" },
      {
        type: "p",
        text: "招待状の内容はサーバーのデータベースではなく、共有リンク（URL）自体に含まれます。リンクを持つ人は内容を確認できるため、機密性の高い個人情報は入力しないでください。",
      },
    ],
  },
  zh: {
    title: "服务介绍",
    description:
      "约会邀请函制作工具是一款免费网页工具，可用一个链接分享有趣的约会邀请函。",
    blocks: [
      {
        type: "p",
        text: "约会邀请函制作工具可帮助你创建约会邀请函，并通过一个链接分享。无需注册或安装应用，在浏览器中即可使用。",
      },
      { type: "h2", text: "适合谁使用" },
      {
        type: "ul",
        items: [
          "想以轻松有趣的方式发出特别约会邀请的人",
          "希望对方从日期、时间和食物选项中选择的人",
          "希望不把内容存到服务器、仅通过链接分享的人",
        ],
      },
      { type: "h2", text: "主要功能" },
      {
        type: "ul",
        items: [
          "邀请函语言：韩语、英语、日语、中文",
          "封面图设置（示例图片或 HTTPS 图片 URL）",
          "可选日期与时间",
          "用午餐/下午/晚上预设快速填入时间",
          "将某日所选时段复制到其他日期",
          "食物选项设置",
          "生成并分享邀请链接",
          "对方可复制或分享最终选择结果",
        ],
      },
      { type: "h2", text: "数据如何保存" },
      {
        type: "p",
        text: "邀请函内容包含在分享链接（URL）本身中，而非服务器数据库。持有链接的人可以查看内容，请勿填写敏感个人信息。",
      },
    ],
  },
};

const FAQ: Record<InviteLanguage, SitePageContent> = {
  ko: {
    title: "자주 묻는 질문",
    description:
      "데이트 초대장 메이커의 데이터 저장, 개인정보, 이미지, 링크 길이에 대한 FAQ입니다.",
    blocks: [
      {
        type: "faq",
        q: "회원가입이 필요한가요?",
        a: "아니요. 계정 없이 바로 초대장을 만들고 공유할 수 있습니다.",
      },
      {
        type: "faq",
        q: "초대장 내용은 어디에 저장되나요?",
        a: "서버 데이터베이스가 아니라 공유 링크(URL)에 포함됩니다. 링크를 가진 사람은 내용을 볼 수 있습니다.",
      },
      {
        type: "faq",
        q: "민감한 정보를 넣어도 되나요?",
        a: "권장하지 않습니다. 주소, 전화번호, 주민등록번호 등 민감 정보는 입력하지 마세요.",
      },
      {
        type: "faq",
        q: "이미지는 어떻게 넣나요?",
        a: "제공되는 샘플 이미지를 고르거나, HTTPS로 접근 가능한 이미지 URL을 입력할 수 있습니다. 외부 URL은 해당 서버의 가용성과 저작권을 확인하세요.",
      },
      {
        type: "faq",
        q: "링크가 너무 길면 어떻게 되나요?",
        a: "초대장에 문구·일정·음식을 많이 넣으면 URL이 길어질 수 있습니다. 에디터에서 경고가 보이면 내용을 줄여 주세요. 일부 메신저는 긴 링크를 잘라 초대장 열기에 실패할 수 있습니다.",
      },
      {
        type: "faq",
        q: "거절(싫어) 버튼이 움직이는 이유는 무엇인가요?",
        a: "플레이풀한 초대장 연출을 위한 기능입니다. 일정 횟수 이후에는 선택할 수 있습니다.",
      },
      {
        type: "faq",
        q: "문의는 어디로 하나요?",
        a: "문의·개발자 정보 페이지의 피드백 폼으로 의견을 보내 주세요.",
      },
    ],
  },
  en: {
    title: "FAQ",
    description:
      "FAQ about data storage, privacy, images, and link length for Date Invitation Maker.",
    blocks: [
      {
        type: "faq",
        q: "Do I need an account?",
        a: "No. You can create and share invitations without signing up.",
      },
      {
        type: "faq",
        q: "Where is invitation content stored?",
        a: "It is embedded in the share link (URL), not in a server database. Anyone with the link can read it.",
      },
      {
        type: "faq",
        q: "Can I include sensitive information?",
        a: "Please do not. Avoid addresses, phone numbers, national IDs, or other sensitive personal data.",
      },
      {
        type: "faq",
        q: "How do images work?",
        a: "Choose a sample image or enter an HTTPS image URL. For external URLs, check availability and copyright of the source.",
      },
      {
        type: "faq",
        q: "What if the link is too long?",
        a: "Long text, schedules, and food options make the URL longer. If the editor shows a warning, shorten the content. Some messengers may truncate long links and break the invitation.",
      },
      {
        type: "faq",
        q: "Why does the “No” button move away?",
        a: "It is a playful interaction. After a few escapes, it becomes selectable.",
      },
      {
        type: "faq",
        q: "How can I contact you?",
        a: "Use the feedback form on the Contact page.",
      },
    ],
  },
  ja: {
    title: "よくある質問",
    description:
      "デート招待状メーカーのデータ保存、プライバシー、画像、リンクの長さに関するFAQです。",
    blocks: [
      {
        type: "faq",
        q: "会員登録は必要ですか？",
        a: "いいえ。アカウントなしですぐに招待状を作成・共有できます。",
      },
      {
        type: "faq",
        q: "招待状の内容はどこに保存されますか？",
        a: "サーバーのデータベースではなく、共有リンク（URL）に含まれます。リンクを持つ人は内容を確認できます。",
      },
      {
        type: "faq",
        q: "機密情報を入れて大丈夫ですか？",
        a: "おすすめしません。住所、電話番号、個人識別番号などの機密情報は入力しないでください。",
      },
      {
        type: "faq",
        q: "画像はどう設定しますか？",
        a: "サンプル画像を選ぶか、HTTPSでアクセスできる画像URLを入力できます。外部URLは可用性や著作権を確認してください。",
      },
      {
        type: "faq",
        q: "リンクが長すぎる場合は？",
        a: "文言・日程・食べ物を多く入れるとURLが長くなります。エディタに警告が出たら内容を短くしてください。一部のメッセンジャーは長いリンクを切ってしまい、招待状が開けなくなることがあります。",
      },
      {
        type: "faq",
        q: "「嫌だ」ボタンが動くのはなぜですか？",
        a: "遊び心のある演出です。一定回数逃げるとその後選択できます。",
      },
      {
        type: "faq",
        q: "問い合わせはどこですか？",
        a: "お問い合わせページのフィードバックフォームからご連絡ください。",
      },
    ],
  },
  zh: {
    title: "常见问题",
    description: "关于约会邀请函制作工具的数据存储、隐私、图片与链接长度的常见问题。",
    blocks: [
      {
        type: "faq",
        q: "需要注册账号吗？",
        a: "不需要。无需账号即可创建并分享邀请函。",
      },
      {
        type: "faq",
        q: "邀请函内容存在哪里？",
        a: "包含在分享链接（URL）中，而不是服务器数据库。持有链接的人可以查看内容。",
      },
      {
        type: "faq",
        q: "可以填写敏感信息吗？",
        a: "不建议。请勿填写地址、电话号码、证件号等敏感个人信息。",
      },
      {
        type: "faq",
        q: "图片如何设置？",
        a: "可选择示例图片，或输入可通过 HTTPS 访问的图片 URL。使用外部 URL 时请确认可用性与版权。",
      },
      {
        type: "faq",
        q: "链接太长怎么办？",
        a: "文案、日程和食物选项越多，URL 越长。若编辑器出现警告，请精简内容。部分即时通讯软件可能截断长链接，导致邀请函无法打开。",
      },
      {
        type: "faq",
        q: "为什么“不喜欢”按钮会躲开？",
        a: "这是趣味互动。躲开若干次后即可选择。",
      },
      {
        type: "faq",
        q: "如何联系？",
        a: "请通过联系页面的反馈表单留言。",
      },
    ],
  },
};

const PRIVACY: Record<InviteLanguage, SitePageContent> = {
  ko: {
    title: "개인정보처리방침",
    description:
      "데이트 초대장 메이커의 개인정보 수집·이용·보관에 관한 안내입니다.",
    blocks: [
      {
        type: "p",
        text: "본 방침은 date-invite.devseung.com(이하 “서비스”)에서 개인정보를 어떻게 다루는지 설명합니다. 서비스는 계정을 만들지 않으며, 초대장 본문을 서버에 저장하지 않습니다.",
      },
      { type: "h2", text: "1. 수집하는 정보" },
      {
        type: "ul",
        items: [
          "초대장 내용: 사용자가 입력한 문구·일정·음식·이미지 설정은 공유 URL에만 포함되며, 서비스 운영자 서버에 저장되지 않습니다.",
          "이용 통계: Google Analytics를 통해 방문 페이지, 대략적 지역·기기 정보, 브라우저 정보 등 일반적인 웹 분석 데이터가 수집될 수 있습니다.",
          "광고(해당 시): Google AdSense 등 광고 파트너가 쿠키·광고 ID를 사용해 관심사 기반 광고를 표시할 수 있습니다.",
          "문의: 피드백 폼을 통해 사용자가 자발적으로 보낸 내용은 해당 폼 제공자(네이버 폼)의 정책에 따라 처리됩니다.",
        ],
      },
      { type: "h2", text: "2. 이용 목적" },
      {
        type: "ul",
        items: [
          "서비스 제공 및 개선",
          "방문·이용 현황 파악",
          "문의 응대",
          "관련 법규 준수",
        ],
      },
      { type: "h2", text: "3. 보관 및 제3자" },
      {
        type: "p",
        text: "초대장 URL 데이터는 사용자의 기기·메신저·브라우저에 남으며, 서비스가 별도로 보관하지 않습니다. 분석·광고·문의 폼은 각 제공자(Google, 네이버 등)의 서버에서 처리될 수 있습니다.",
      },
      { type: "h2", text: "4. 쿠키" },
      {
        type: "p",
        text: "브라우저에서 쿠키를 차단하거나 삭제할 수 있습니다. 다만 일부 분석·광고 기능이 제한될 수 있습니다.",
      },
      { type: "h2", text: "5. 외부 이미지 URL" },
      {
        type: "p",
        text: "사용자가 입력한 외부 이미지 URL은 해당 외부 서버에서 불러옵니다. 그 서버의 개인정보·보안 정책은 본 서비스와 무관합니다.",
      },
      { type: "h2", text: "6. 문의" },
      {
        type: "p",
        text: "개인정보 관련 문의는 문의 페이지의 피드백 폼으로 보내 주세요.",
      },
      {
        type: "p",
        text: "본 방침은 서비스 변경에 따라 업데이트될 수 있으며, 중요한 변경 시 이 페이지에 게시합니다.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    description:
      "How Date Invitation Maker collects, uses, and handles information.",
    blocks: [
      {
        type: "p",
        text: "This policy explains how date-invite.devseung.com (the “Service”) handles information. The Service does not create user accounts and does not store invitation content on its servers.",
      },
      { type: "h2", text: "1. Information we collect" },
      {
        type: "ul",
        items: [
          "Invitation content: Text, schedules, food options, and image settings you enter are embedded only in the share URL and are not stored on the operator’s servers.",
          "Usage analytics: Google Analytics may collect standard web analytics such as pages visited, approximate region/device, and browser information.",
          "Advertising (when enabled): Partners such as Google AdSense may use cookies or advertising IDs to show interest-based ads.",
          "Feedback: Messages you voluntarily submit via the feedback form are handled under that form provider’s (Naver Form) policies.",
        ],
      },
      { type: "h2", text: "2. Purposes of use" },
      {
        type: "ul",
        items: [
          "Providing and improving the Service",
          "Understanding traffic and usage",
          "Responding to inquiries",
          "Complying with applicable laws",
        ],
      },
      { type: "h2", text: "3. Retention and third parties" },
      {
        type: "p",
        text: "Invitation URL data remains on your devices, messengers, and browsers; the Service does not keep a separate copy. Analytics, ads, and the feedback form may be processed on providers’ servers (such as Google or Naver).",
      },
      { type: "h2", text: "4. Cookies" },
      {
        type: "p",
        text: "You can block or delete cookies in your browser. Some analytics or advertising features may then be limited.",
      },
      { type: "h2", text: "5. External image URLs" },
      {
        type: "p",
        text: "External image URLs you enter are loaded from those third-party servers. Their privacy and security practices are outside this Service.",
      },
      { type: "h2", text: "6. Contact" },
      {
        type: "p",
        text: "For privacy questions, use the feedback form on the Contact page.",
      },
      {
        type: "p",
        text: "This policy may be updated as the Service changes. Material updates will be posted on this page.",
      },
    ],
  },
  ja: {
    title: "プライバシーポリシー",
    description:
      "デート招待状メーカーにおける情報の収集・利用・取り扱いに関する説明です。",
    blocks: [
      {
        type: "p",
        text: "本ポリシーは date-invite.devseung.com（以下「本サービス」）における情報の取り扱いを説明します。本サービスはアカウントを作成せず、招待状本文をサーバーに保存しません。",
      },
      { type: "h2", text: "1. 収集する情報" },
      {
        type: "ul",
        items: [
          "招待状の内容: 入力した文言・日程・食べ物・画像設定は共有URLにのみ含まれ、運営者サーバーには保存されません。",
          "利用統計: Google Analyticsにより、訪問ページ、おおよその地域・端末、ブラウザ情報などの一般的なウェブ分析データが収集されることがあります。",
          "広告（該当する場合）: Google AdSenseなどの広告パートナーがCookieや広告IDを使い、興味関心に基づく広告を表示することがあります。",
          "お問い合わせ: フィードバックフォームへ任意で送った内容は、当該フォーム提供者（Naverフォーム）の方針に従って処理されます。",
        ],
      },
      { type: "h2", text: "2. 利用目的" },
      {
        type: "ul",
        items: [
          "サービスの提供と改善",
          "アクセス・利用状況の把握",
          "お問い合わせへの対応",
          "関連法令の遵守",
        ],
      },
      { type: "h2", text: "3. 保管と第三者" },
      {
        type: "p",
        text: "招待状URLのデータはユーザーの端末・メッセンジャー・ブラウザに残り、本サービスが別途保管することはありません。分析・広告・問い合わせフォームは各提供者（Google、Naverなど）のサーバーで処理されることがあります。",
      },
      { type: "h2", text: "4. Cookie" },
      {
        type: "p",
        text: "ブラウザでCookieをブロックまたは削除できます。その場合、一部の分析・広告機能が制限されることがあります。",
      },
      { type: "h2", text: "5. 外部画像URL" },
      {
        type: "p",
        text: "入力した外部画像URLは当該外部サーバーから読み込まれます。そのサーバーのプライバシー・セキュリティ方針は本サービスとは無関係です。",
      },
      { type: "h2", text: "6. お問い合わせ" },
      {
        type: "p",
        text: "プライバシーに関するお問い合わせは、お問い合わせページのフィードバックフォームからご連絡ください。",
      },
      {
        type: "p",
        text: "本ポリシーはサービスの変更に応じて更新されることがあり、重要な変更はこのページに掲載します。",
      },
    ],
  },
  zh: {
    title: "隐私政策",
    description: "约会邀请函制作工具如何收集、使用与处理信息的说明。",
    blocks: [
      {
        type: "p",
        text: "本政策说明 date-invite.devseung.com（下称“本服务”）如何处理信息。本服务不创建账号，也不会将邀请函正文保存在服务器上。",
      },
      { type: "h2", text: "1. 收集的信息" },
      {
        type: "ul",
        items: [
          "邀请函内容：您输入的文案、日程、食物与图片设置仅包含在分享 URL 中，不会保存在运营者服务器。",
          "使用统计：Google Analytics 可能收集访问页面、大致地区/设备、浏览器信息等常规网站分析数据。",
          "广告（如启用）：Google AdSense 等广告合作方可使用 Cookie 或广告 ID 展示兴趣定向广告。",
          "反馈：您通过反馈表单自愿提交的内容，按该表单提供方（Naver 表单）的政策处理。",
        ],
      },
      { type: "h2", text: "2. 使用目的" },
      {
        type: "ul",
        items: [
          "提供并改进服务",
          "了解访问与使用情况",
          "回复咨询",
          "遵守适用法律法规",
        ],
      },
      { type: "h2", text: "3. 保存与第三方" },
      {
        type: "p",
        text: "邀请 URL 数据留存在您的设备、即时通讯软件与浏览器中；本服务不另行存档。分析、广告与反馈表单可能在提供方（如 Google、Naver）服务器上处理。",
      },
      { type: "h2", text: "4. Cookie" },
      {
        type: "p",
        text: "您可在浏览器中阻止或删除 Cookie。届时部分分析或广告功能可能受限。",
      },
      { type: "h2", text: "5. 外部图片 URL" },
      {
        type: "p",
        text: "您输入的外部图片 URL 由相应外部服务器加载。其隐私与安全政策与本服务无关。",
      },
      { type: "h2", text: "6. 联系" },
      {
        type: "p",
        text: "隐私相关问题请通过联系页面的反馈表单留言。",
      },
      {
        type: "p",
        text: "本政策可能随服务变更更新；重大变更将发布在本页。",
      },
    ],
  },
};

const TERMS: Record<InviteLanguage, SitePageContent> = {
  ko: {
    title: "이용약관",
    description: "데이트 초대장 메이커 이용에 관한 기본 약관입니다.",
    blocks: [
      {
        type: "p",
        text: "본 약관은 date-invite.devseung.com(이하 “서비스”) 이용에 적용됩니다. 서비스를 사용하면 본 약관에 동의한 것으로 간주합니다.",
      },
      { type: "h2", text: "1. 서비스 성격" },
      {
        type: "p",
        text: "서비스는 개인이 플레이풀한 데이트 초대장을 만들어 링크로 공유하도록 돕는 웹 도구입니다. 계정 기능 없이 제공되며, 초대장 내용은 URL에 포함됩니다.",
      },
      { type: "h2", text: "2. 이용자 책임" },
      {
        type: "ul",
        items: [
          "민감한 개인정보·불법·혐오·타인 권리를 침해하는 내용을 입력·공유하지 않습니다.",
          "외부 이미지 URL 사용 시 저작권·초상권·이용 권한을 스스로 확인합니다.",
          "공유 링크를 받은 사람이 내용을 볼 수 있음을 이해하고 링크 관리에 주의합니다.",
        ],
      },
      { type: "h2", text: "3. 금지 행위" },
      {
        type: "ul",
        items: [
          "서비스의 정상적인 운영을 방해하는 행위",
          "스팸·사기·불법 목적의 이용",
          "자동화 도구로 과도한 부하를 주는 행위",
        ],
      },
      { type: "h2", text: "4. 면책" },
      {
        type: "p",
        text: "서비스는 “있는 그대로” 제공됩니다. 링크 유출, 외부 이미지 장애, 메신저의 긴 URL 절단, 분석·광고 제3자 서비스로 인한 문제에 대해 법령이 허용하는 범위에서 책임을 제한합니다.",
      },
      { type: "h2", text: "5. 약관 변경" },
      {
        type: "p",
        text: "필요 시 약관을 변경할 수 있으며, 변경 내용은 이 페이지에 게시합니다.",
      },
    ],
  },
  en: {
    title: "Terms of Use",
    description: "Basic terms for using Date Invitation Maker.",
    blocks: [
      {
        type: "p",
        text: "These terms apply to date-invite.devseung.com (the “Service”). By using the Service, you agree to these terms.",
      },
      { type: "h2", text: "1. Nature of the Service" },
      {
        type: "p",
        text: "The Service is a web tool that helps individuals create playful date invitations and share them via a link. It is provided without accounts, and invitation content is embedded in the URL.",
      },
      { type: "h2", text: "2. Your responsibilities" },
      {
        type: "ul",
        items: [
          "Do not enter or share sensitive personal data, illegal content, hate, or material that infringes others’ rights.",
          "When using external image URLs, ensure you have the rights (copyright, likeness, license).",
          "Understand that anyone with the share link can read the content, and manage links carefully.",
        ],
      },
      { type: "h2", text: "3. Prohibited uses" },
      {
        type: "ul",
        items: [
          "Interfering with normal operation of the Service",
          "Spam, fraud, or other illegal purposes",
          "Placing excessive load through automated tools",
        ],
      },
      { type: "h2", text: "4. Disclaimer" },
      {
        type: "p",
        text: "The Service is provided “as is.” To the extent permitted by law, liability is limited for issues such as leaked links, third-party image failures, messengers truncating long URLs, and third-party analytics or advertising services.",
      },
      { type: "h2", text: "5. Changes" },
      {
        type: "p",
        text: "These terms may be updated when needed. Updates will be posted on this page.",
      },
    ],
  },
  ja: {
    title: "利用規約",
    description: "デート招待状メーカー利用に関する基本規約です。",
    blocks: [
      {
        type: "p",
        text: "本規約は date-invite.devseung.com（以下「本サービス」）の利用に適用されます。本サービスを利用することで、本規約に同意したものとみなします。",
      },
      { type: "h2", text: "1. サービスの性質" },
      {
        type: "p",
        text: "本サービスは、個人が遊び心のあるデート招待状を作り、リンクで共有するためのWebツールです。アカウントなしで提供され、招待状の内容はURLに含まれます。",
      },
      { type: "h2", text: "2. 利用者の責任" },
      {
        type: "ul",
        items: [
          "機密性の高い個人情報、違法・憎悪・他者の権利を侵害する内容を入力・共有しないこと。",
          "外部画像URLを使う場合、著作権・肖像権・利用権限を自ら確認すること。",
          "共有リンクを持つ人が内容を見られることを理解し、リンク管理に注意すること。",
        ],
      },
      { type: "h2", text: "3. 禁止事項" },
      {
        type: "ul",
        items: [
          "本サービスの正常な運営を妨げる行為",
          "スパム・詐欺・その他違法目的での利用",
          "自動化ツールによる過度な負荷",
        ],
      },
      { type: "h2", text: "4. 免責" },
      {
        type: "p",
        text: "本サービスは「現状のまま」提供されます。リンクの漏洩、外部画像の障害、メッセンジャーによる長いURLの切断、分析・広告など第三者サービスに起因する問題について、法令が認める範囲で責任を制限します。",
      },
      { type: "h2", text: "5. 規約の変更" },
      {
        type: "p",
        text: "必要に応じて規約を変更でき、変更内容はこのページに掲載します。",
      },
    ],
  },
  zh: {
    title: "使用条款",
    description: "约会邀请函制作工具的基本使用条款。",
    blocks: [
      {
        type: "p",
        text: "本条款适用于 date-invite.devseung.com（下称“本服务”）。使用本服务即表示您同意本条款。",
      },
      { type: "h2", text: "1. 服务性质" },
      {
        type: "p",
        text: "本服务是帮助个人创建有趣约会邀请函并通过链接分享的网页工具。无需账号，邀请函内容包含在 URL 中。",
      },
      { type: "h2", text: "2. 用户责任" },
      {
        type: "ul",
        items: [
          "请勿输入或分享敏感个人信息、违法、仇恨或侵犯他人权利的内容。",
          "使用外部图片 URL 时，请自行确认版权、肖像权与使用权限。",
          "理解持有分享链接的人可以查看内容，并谨慎管理链接。",
        ],
      },
      { type: "h2", text: "3. 禁止行为" },
      {
        type: "ul",
        items: [
          "干扰本服务正常运行",
          "用于垃圾信息、欺诈或其他非法目的",
          "通过自动化工具造成过度负载",
        ],
      },
      { type: "h2", text: "4. 免责声明" },
      {
        type: "p",
        text: "本服务按“现状”提供。在法律允许范围内，对于链接泄露、外部图片故障、即时通讯软件截断长 URL，以及分析/广告等第三方服务导致的问题，责任予以限制。",
      },
      { type: "h2", text: "5. 条款变更" },
      {
        type: "p",
        text: "必要时可更新本条款，变更内容将发布在本页。",
      },
    ],
  },
};

const CONTACT: Record<InviteLanguage, SitePageContent> = {
  ko: {
    title: "문의 · 개발자 정보",
    description:
      "데이트 초대장 메이커에 대한 의견 보내기와 서비스 안내입니다.",
    blocks: [
      {
        type: "p",
        text: "데이트 초대장 메이커는 개인 개발 프로젝트로 운영되는 무료 웹 도구입니다. 버그 제보, 기능 제안, 기타 의견은 아래 피드백 폼으로 보내 주세요.",
      },
      { type: "h2", text: "피드백 보내기" },
      {
        type: "link",
        href: FEEDBACK_FORM_URL,
        label: "피드백 폼 열기",
        external: true,
      },
    ],
  },
  en: {
    title: "Contact · Developer",
    description:
      "Send feedback about Date Invitation Maker and find service information.",
    blocks: [
      {
        type: "p",
        text: "Date Invitation Maker is a free web tool run as an independent developer project. For bug reports, feature ideas, or other feedback, please use the form below.",
      },
      { type: "h2", text: "Send feedback" },
      {
        type: "link",
        href: FEEDBACK_FORM_URL,
        label: "Open feedback form",
        external: true,
      },
    ],
  },
  ja: {
    title: "お問い合わせ・開発者情報",
    description:
      "デート招待状メーカーへの意見送信とサービス案内です。",
    blocks: [
      {
        type: "p",
        text: "デート招待状メーカーは個人開発プロジェクトとして運営される無料のWebツールです。不具合報告、機能提案、その他のご意見は下のフィードバックフォームからお送りください。",
      },
      { type: "h2", text: "フィードバックを送る" },
      {
        type: "link",
        href: FEEDBACK_FORM_URL,
        label: "フィードバックフォームを開く",
        external: true,
      },
    ],
  },
  zh: {
    title: "联系 · 开发者信息",
    description: "向约会邀请函制作工具发送意见并查看服务信息。",
    blocks: [
      {
        type: "p",
        text: "约会邀请函制作工具是由个人开发者运营的免费网页工具。如需报告问题、提出功能建议或其他意见，请使用下方反馈表单。",
      },
      { type: "h2", text: "发送反馈" },
      {
        type: "link",
        href: FEEDBACK_FORM_URL,
        label: "打开反馈表单",
        external: true,
      },
    ],
  },
};

export const SITE_PAGES: Record<
  SitePageSlug,
  Record<InviteLanguage, SitePageContent>
> = {
  about: ABOUT,
  faq: FAQ,
  privacy: PRIVACY,
  terms: TERMS,
  contact: CONTACT,
};

export function getSitePage(
  slug: SitePageSlug,
  lang: InviteLanguage,
): SitePageContent {
  return SITE_PAGES[slug][lang];
}
