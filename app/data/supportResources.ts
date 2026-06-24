export type SupportResource = {
  id: string;
  name: string;
  description: string;
  phone?: string;
  hours: string;
  target: string;
  methods: string[];
  tags: string[];
  url: string;
  emergency?: boolean;
  featured?: boolean;
};

export const supportResources: SupportResource[] = [
  {
    id: "inochi-sos",
    name: "#いのちSOS",
    description:
      "「死にたい」「消えたい」「生きることに疲れた」などの気持ちを、専門の相談員が受け止めて一緒に整理します。",
    phone: "0120-061-338",
    hours: "毎日 24時間",
    target: "つらい気持ちが強い人、希死念慮がある人",
    methods: ["電話"],
    tags: ["24時間", "こころ", "緊急", "無料"],
    url: "https://www.mhlw.go.jp/mamorouyokokoro/",
    emergency: true,
    featured: true,
  },
  {
    id: "yorisoi",
    name: "よりそいホットライン",
    description:
      "孤独、家庭、仕事、性のこと、外国語相談など、幅広い悩みを電話で相談できます。",
    phone: "0120-279-338",
    hours: "毎日 24時間",
    target: "どなたでも",
    methods: ["電話"],
    tags: ["24時間", "こころ", "生活", "無料"],
    url: "https://www.since2011.net/yorisoi/",
    emergency: true,
    featured: true,
  },
  {
    id: "kokoro-dial",
    name: "こころの健康相談統一ダイヤル",
    description:
      "都道府県・政令指定都市の公的なこころの健康相談につながるナビダイヤルです。",
    phone: "0570-064-556",
    hours: "曜日・時間は地域により異なります",
    target: "こころの不調について相談したい人",
    methods: ["電話", "地域"],
    tags: ["こころ", "公的機関", "地域"],
    url: "https://www.mhlw.go.jp/mamorouyokokoro/",
    featured: true,
  },
  {
    id: "inochi-phone",
    name: "いのちの電話",
    description:
      "つらい気持ちや生きづらさを、匿名で電話相談できます。受付時間は窓口により異なります。",
    phone: "0120-783-556",
    hours: "毎日 16:00-21:00、毎月10日は 8:00-翌8:00 など",
    target: "どなたでも",
    methods: ["電話"],
    tags: ["こころ", "匿名", "無料"],
    url: "https://www.inochinodenwa.org/",
  },
  {
    id: "anata-no-ibasho",
    name: "あなたのいばしょ",
    description:
      "24時間365日、誰でも無料・匿名で使えるチャット相談です。電話が苦手な人にも向いています。",
    hours: "毎日 24時間",
    target: "どなたでも",
    methods: ["チャット", "Web"],
    tags: ["24時間", "匿名", "こころ", "無料"],
    url: "https://talkme.jp/",
    emergency: true,
    featured: true,
  },
  {
    id: "yorisoi-chat",
    name: "生きづらびっと",
    description:
      "LINEなどから、こころのつらさや生きづらさについて相談できるSNS相談窓口です。",
    hours: "受付時間は公式サイトで確認してください",
    target: "SNSで相談したい人",
    methods: ["SNS", "チャット"],
    tags: ["SNS", "こころ", "匿名"],
    url: "https://yorisoi-chat.jp/",
  },
  {
    id: "hot-chat",
    name: "こころのほっとチャット",
    description:
      "LINE、Facebook、Webチャットなどで相談できるオンライン相談窓口です。",
    hours: "受付時間は公式サイトで確認してください",
    target: "年齢・性別を問わず相談したい人",
    methods: ["SNS", "チャット", "Web"],
    tags: ["SNS", "こころ", "チャット"],
    url: "https://www.npo-tms.or.jp/service/sns.html",
  },
  {
    id: "child-sos",
    name: "24時間子供SOSダイヤル",
    description:
      "いじめや学校のことなど、子どもや保護者が24時間相談できる文部科学省の窓口です。",
    phone: "0120-0-78310",
    hours: "毎日 24時間",
    target: "子ども、保護者、学校関係者",
    methods: ["電話"],
    tags: ["24時間", "子ども", "学校", "無料"],
    url: "https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm",
    emergency: true,
    featured: true,
  },
  {
    id: "childline",
    name: "チャイルドライン",
    description:
      "18歳までの子どもが、名前を言わずに電話やチャットで相談できます。",
    phone: "0120-99-7777",
    hours: "電話は毎日 16:00-21:00。チャットは公式サイトで確認してください",
    target: "18歳までの子ども",
    methods: ["電話", "チャット"],
    tags: ["子ども", "学校", "匿名", "無料"],
    url: "https://childline.or.jp/",
  },
  {
    id: "kodomo-jinken",
    name: "子どもの人権110番",
    description:
      "いじめ、虐待、学校や家庭での困りごとなど、子どもの人権について相談できます。",
    phone: "0120-007-110",
    hours: "平日 8:30-17:15",
    target: "子ども、保護者",
    methods: ["電話"],
    tags: ["子ども", "人権", "学校", "家庭", "無料"],
    url: "https://www.moj.go.jp/JINKEN/jinken112.html",
  },
  {
    id: "child-abuse",
    name: "児童相談所虐待対応ダイヤル",
    description:
      "虐待かもしれないと思ったとき、近くの児童相談所につながる全国共通ダイヤルです。",
    phone: "189",
    hours: "毎日 24時間",
    target: "子ども本人、周囲の大人",
    methods: ["電話"],
    tags: ["24時間", "子ども", "虐待", "緊急"],
    url: "https://www.cfa.go.jp/policies/jidougyakutai/gyakutai-taiou-dial",
    emergency: true,
  },
  {
    id: "one-stop-sexual-violence",
    name: "性犯罪・性暴力被害者のためのワンストップ支援センター",
    description:
      "性被害や性的な画像被害などについて、医療、相談、警察への付き添いなどの支援につながれます。",
    phone: "#8891",
    hours: "地域により異なります",
    target: "性被害を受けた本人、周囲の人",
    methods: ["電話", "地域"],
    tags: ["性被害", "緊急", "公的機関"],
    url: "https://www.gender.go.jp/policy/no_violence/seibouryoku/consult.html",
    emergency: true,
  },
  {
    id: "jinken-110",
    name: "みんなの人権110番",
    description:
      "差別、ハラスメント、インターネット上の人権侵害などについて相談できます。",
    phone: "0570-003-110",
    hours: "平日 8:30-17:15",
    target: "どなたでも",
    methods: ["電話"],
    tags: ["人権", "ハラスメント", "ネット"],
    url: "https://www.moj.go.jp/JINKEN/index_soudan.html",
  },
  {
    id: "support-search",
    name: "支援情報検索サイト",
    description:
      "悩み別、方法別、地域別に、相談窓口や支援先を検索できます。どこに相談すればよいか迷うときに使えます。",
    hours: "Webサイトはいつでも閲覧できます",
    target: "相談先を地域や悩みで探したい人",
    methods: ["Web", "地域"],
    tags: ["検索", "地域", "公的機関"],
    url: "https://shienjoho.go.jp/",
    featured: true,
  },
  {
    id: "us-988",
    name: "988 Suicide & Crisis Lifeline",
    description:
      "米国にいる人向けの24時間の自殺・危機相談窓口です。電話、テキスト、チャットでつながれます。",
    phone: "988",
    hours: "毎日 24時間",
    target: "米国にいる人",
    methods: ["電話", "チャット"],
    tags: ["24時間", "こころ", "緊急", "米国"],
    url: "https://988lifeline.org/",
    emergency: true,
  },
];

export const methodOptions = ["すべて", "電話", "チャット", "SNS", "Web", "地域"] as const;

const crisisTerms = [
  "死にたい",
  "しにたい",
  "消えたい",
  "きえたい",
  "自殺",
  "自傷",
  "リスカ",
  "飛び降り",
  "飛びおり",
  "首をつ",
  "薬を大量",
  "生きていたくない",
  "生きたくない",
  "終わりにしたい",
  "明日が来なければ",
  "もう無理",
  "助けて",
  "殺される",
  "暴力",
  "虐待",
  "性被害",
  "性暴力",
  "襲われ",
  "今すぐ危ない",
];

const tagKeywords: Record<string, string[]> = {
  "24時間": ["今すぐ", "夜", "深夜", "休日", "24時間", "すぐ", "急ぎ"],
  子ども: ["子ども", "こども", "小学生", "中学生", "高校生", "学校", "いじめ", "親", "先生"],
  学校: ["学校", "いじめ", "先生", "クラス", "部活", "友だち", "友達", "登校", "教室"],
  家庭: ["家", "家庭", "親", "父", "母", "家族", "怒鳴", "暴力", "虐待"],
  性被害: ["性", "性的", "痴漢", "画像", "裸", "触られ", "被害", "レイプ"],
  ネット: ["ネット", "sns", "line", "x", "インスタ", "dm", "悪口", "晒し", "さらし"],
  こころ: ["つらい", "辛い", "不安", "眠れない", "消えたい", "疲れた", "しんどい", "孤独"],
  地域: ["地域", "近く", "自治体", "病院", "県", "市", "相談所"],
  人権: ["差別", "嫌がらせ", "ハラスメント", "人権", "ネット"],
};

export function hasCrisisSignal(text: string) {
  const normalized = text.toLowerCase().replace(/\s+/g, "");
  return crisisTerms.some((term) => normalized.includes(term));
}

export function rankSupportResources(query: string, method = "すべて") {
  const normalized = query.toLowerCase();

  return supportResources
    .map((resource) => {
      let score = resource.featured ? 2 : 0;

      if (resource.emergency && hasCrisisSignal(query)) score += 12;
      if (method !== "すべて" && resource.methods.includes(method)) score += 8;
      if (normalized && resource.name.toLowerCase().includes(normalized)) score += 6;
      if (normalized && resource.description.toLowerCase().includes(normalized)) score += 4;

      resource.tags.forEach((tag) => {
        if (normalized.includes(tag.toLowerCase())) score += 4;
        const keywords = tagKeywords[tag] ?? [];
        if (keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))) {
          score += 5;
        }
      });

      return { ...resource, score };
    })
    .filter((resource) => method === "すべて" || resource.methods.includes(method))
    .sort((a, b) => b.score - a.score);
}
