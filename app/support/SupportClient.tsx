"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Hotline = {
  id: string;
  name: string;
  description: string;
  phone?: string;
  hours: string;
  target: string;
  methods: string[];
  tags: string[];
  url?: string;
};

type ScoredHotline = Hotline & { score: number };

function normalizeJa(raw: string): string {
  if (!raw) return "";
  let text = raw.toLowerCase();

  text = text.replace(/[！-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

  text = text.replace(/[\u30a1-\u30f6]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0x60)
  );

  const smallMap: Record<string, string> = {
    "ぁ": "あ",
    "ぃ": "い",
    "ぅ": "う",
    "ぇ": "え",
    "ぉ": "お",
    "ゃ": "や",
    "ゅ": "ゆ",
    "ょ": "よ",
    "っ": "つ",
  };
  text = text.replace(/[ぁぃぅぇぉゃゅょっ]/g, (c) => smallMap[c] ?? c);

  text = text.replace(/ー/g, "");
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

const HOTLINES: Hotline[] = [
  {
    id: "sos-24h",
    name: "24時間子供SOSダイヤル（文科省）",
    description:
      "いじめ・学校・友達など、子どもや保護者が24時間相談できる窓口。",
    phone: "0120-0-78310",
    hours: "24時間 / 通話料無料（IP電話は一部つながらない場合あり）",
    target: "小学生〜高校生くらいの子ども・保護者など",
    methods: ["電話"],
    tags: ["子ども・いじめ", "学校", "こころ全般", "全国", "24時間"],
    url: "https://www.mext.go.jp/a_menu/shotou/seitoshidou/1306988.htm",
  },
  {
    id: "childline",
    name: "チャイルドライン",
    description:
      "18歳までの子ども専用の電話・チャット相談。どんな内容でもOKで、名前を言わなくても相談できます。",
    phone: "0120-99-7777",
    hours: "毎日 16:00〜21:00 / 通話料無料",
    target: "18歳までの子ども",
    methods: ["電話", "チャット"],
    tags: ["子ども・いじめ", "学校", "こころ全般", "全国", "チャット"],
    url: "https://childline.or.jp/",
  },
  {
    id: "jinken-kodomo",
    name: "子どもの人権110番（法務省）",
    description:
      "いじめや虐待など、子どもの人権に関する相談を受け付ける窓口です。",
    phone: "0120-007-110",
    hours: "平日 8:30〜17:15 / 通話料無料",
    target: "子ども・保護者など",
    methods: ["電話"],
    tags: ["子ども・いじめ", "人権", "家庭", "全国"],
    url: "https://www.moj.go.jp/JINKEN/index.html",
  },
  {
    id: "jinken-110",
    name: "みんなの人権110番（全国共通人権相談ダイヤル）",
    description:
      "差別・ハラスメント・ネット中傷など、さまざまな人権問題の相談ができる電話窓口です。",
    phone: "0570-003-110",
    hours: "平日 8:30〜17:15（祝日・年末年始を除く）",
    target: "年齢問わず",
    methods: ["電話"],
    tags: ["人権", "ハラスメント", "ネット", "全国"],
    url: "https://www.moj.go.jp/JINKEN/index.html",
  },
  {
    id: "yorisoi",
    name: "よりそいホットライン",
    description:
      "孤独感、家族のこと、性のこと、お金、仕事、こころの悩みなど、テーマを問わず24時間相談できる窓口です。",
    phone: "0120-279-338",
    hours: "24時間 / 通話料無料（IP電話などは別番号あり）",
    target: "どなたでも",
    methods: ["電話"],
    tags: ["こころ全般", "家庭", "性のこと", "全国", "24時間"],
    url: "https://www.mhlw.go.jp/mamorouyokokoro/",
  },
  {
    id: "inochi",
    name: "いのちの電話（地域ごとの窓口）",
    description:
      "死にたい気持ち・生きづらさなどについて話を聞いてもらえる電話相談です。",
    hours: "地域によって時間は異なる（多くは夜間〜深夜帯）",
    target: "どなたでも",
    methods: ["電話"],
    tags: ["こころ全般", "自殺予防", "全国"],
    url: "https://www.inochinodenwa.org/",
  },
  {
    id: "net-jinken",
    name: "インターネット人権相談窓口",
    description:
      "ネットでの晒し・中傷・なりすましなど、人権侵害が疑われる内容の相談用フォームです。",
    hours: "24時間受付（Webフォーム）",
    target: "どなたでも",
    methods: ["Webフォーム"],
    tags: ["ネット", "人権", "全国"],
    url: "https://www.jinken-net.jp/",
  },
  {
    id: "child-abuse-189",
    name: "児童相談所虐待対応ダイヤル「189」",
    description:
      "虐待かも、と思ったときに子ども本人・周囲の人が通報や相談ができる番号です。",
    phone: "189",
    hours: "原則24時間",
    target: "子ども・周囲の大人",
    methods: ["電話"],
    tags: ["家庭", "虐待", "子ども・いじめ", "全国", "24時間"],
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/dv/",
  },
  {
    id: "one-stop-sex",
    name: "性暴力ワンストップ支援センター",
    description:
      "性被害・性的な無理な要求・画像のことで困っている人のための相談窓口です。",
    hours: "センターによる（多くは24時間電話受付）",
    target: "性被害を受けた本人・周囲の人",
    methods: ["電話", "対面", "メール"],
    tags: ["性のこと", "こころ全般", "全国"],
    url: "https://www.npa.go.jp/higai/sexual/index.html",
  },
];

function scoreHotlines(
  input: string
): { results: ScoredHotline[]; hasEmergencySignal: boolean } {
  const norm = normalizeJa(input);
  if (!norm) {
    return {
      results: HOTLINES.map((h) => ({ ...h, score: 0 })),
      hasEmergencySignal: false,
    };
  }

  const emergencyWords = [
    "しにたい",
    "しにた",
    "きえたい",
    "じさつ",
    "りすか",
    "もうむり",
    "いきてるいみ",
  ];

  const schoolWords = [
    "いじめ",
    "いじ",
    "虐め",
    "がっこう",
    "学校",
    "くらす",
    "クラス",
    "きょうしつ",
    "教室",
    "せんせい",
    "先生",
    "ぶかつ",
    "部活",
    "せんぱい",
    "先輩",
    "こうはい",
    "後輩",
    "はぶ",
    "無視",
    "なかまはずれ",
    "仲間外れ",
  ];

  const schoolStrongWords = [
    "登校しづらい",
    "登校しずらい",
    "とうこうしづらい",
    "とうこうしずらい",
    "がっこういきたくない",
    "学校行きたくない",
    "学校いきたくない",
    "がっこうこわい",
    "学校こわい",
    "学校がこわい",
    "学校が怖い",
    "教室こわい",
    "教室が怖い",
    "学校つらい",
    "がっこうつらい",
    "ふとうこう",
    "不登校",
  ];

  const familyWords = [
    "おや",
    "親",
    "かてい",
    "家庭",
    "どな",
    "怒鳴",
    "なぐら",
    "殴",
    "dv",
    "虐待",
    "ぎゃくたい",
    "家にいたくない",
    "家かえりたくない",
  ];

  const netWords = [
    "sns",
    "えすえぬえす",
    "x",
    "いんすた",
    "インスタ",
    "tiktok",
    "てぃっくとっく",
    "dm",
    "でぃーえむ",
    "さらさ",
    "晒さ",
    "ばず",
    "バズ",
    "ひぼうちゅうしょう",
    "誹謗中傷",
    "なりすまし",
    "アカウント",
    "あかうんと",
  ];

  const mentalWords = [
    "つらい",
    "しんどい",
    "ふあん",
    "不安",
    "おちこ",
    "落ち込",
    "ゆううつ",
    "憂鬱",
    "ねれない",
    "眠れない",
    "こわい",
    "怖い",
    "きぶん",
    "気分",
    "やる気が出ない",
  ];

  const sexWords = [
    "えろ",
    "エロ",
    "はだか",
    "裸",
    "しゃしんおくれ",
    "写真送れ",
    "えっち",
    "性的",
    "せいてき",
    "体触ら",
    "からださわら",
    "いやらしいこと",
  ];

  const hasEmergencySignal = emergencyWords.some((w) => norm.includes(w));
  const hasSchool = schoolWords.some((w) => norm.includes(w));
  const hasSchoolStrong = schoolStrongWords.some((w) => norm.includes(w));
  const hasFamily = familyWords.some((w) => norm.includes(w));
  const hasNet = netWords.some((w) => norm.includes(w));
  const hasMental = mentalWords.some((w) => norm.includes(w));
  const hasSex = sexWords.some((w) => norm.includes(w));

  const results: ScoredHotline[] = HOTLINES.map((h) => {
    let score = 0;

    if (h.tags.includes("全国")) score += 1;
    if (h.tags.includes("24時間")) score += 2;
    if (h.tags.includes("子ども・いじめ")) score += 1;

    if (hasSchool && h.tags.includes("学校")) score += 5;
    if (hasSchool && h.tags.includes("子ども・いじめ")) score += 3;
    if (hasSchoolStrong && h.tags.includes("学校")) score += 8;
    if (hasSchoolStrong && h.id === "sos-24h") score += 2;

    if (hasFamily && h.tags.includes("家庭")) score += 6;
    if (hasFamily && h.tags.includes("人権")) score += 3;
    if (hasFamily && h.id === "child-abuse-189") score += 5;

    if (hasNet && h.tags.includes("ネット")) score += 7;
    if (hasNet && h.tags.includes("人権")) score += 3;

    if (hasMental && h.tags.includes("こころ全般")) score += 6;
    if (hasMental && h.tags.includes("自殺予防")) score += 4;

    if (hasSex && h.tags.includes("性のこと")) score += 9;
    if (hasSex && h.tags.includes("人権")) score += 3;

    if (hasEmergencySignal && h.tags.includes("24時間")) score += 10;
    if (hasEmergencySignal && h.id === "yorisoi") score += 4;
    if (hasEmergencySignal && h.id === "inochi") score += 8;

    return { ...h, score };
  });

  results.sort((a, b) => b.score - a.score);
  return { results, hasEmergencySignal };
}

function SupportSearchInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("text") ?? "";

  const [text, setText] = useState(initial);
  const [results, setResults] = useState<ScoredHotline[] | null>(null);
  const [hasEmergencySignal, setHasEmergencySignal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const trimmed = text.trim();

  // ✅ ここが重要：バッククォート
  const googleUrl =
    trimmed.length > 0
      ? `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`
      : null;

  const handleAnalyze = () => {
    const { results, hasEmergencySignal } = scoreHotlines(text);
    setResults(results);
    setHasEmergencySignal(hasEmergencySignal);
    setShowAll(false);
    setHasSearched(true);
  };

  // ここから下のJSXは、君の元の超長いreturnをそのまま貼ってOK
  // （ただし tel: と key のテンプレ文字列だけは上の修正どおりに）
  return (
    <main className="p-6">
      <Link href="/" className="underline">
        ← ホームにもどる
      </Link>

      <div className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full border p-2"
        />
        <div className="mt-2 flex gap-2">
          <button onClick={handleAnalyze} className="border px-3 py-1">
            相談先の候補を表示する
          </button>

          {googleUrl && (
            <a href={googleUrl} target="_blank" rel="noreferrer" className="underline">
              入力した言葉でGoogle検索
            </a>
          )}
        </div>

        {hasSearched && results && (
          <pre className="mt-4 whitespace-pre-wrap">
            {JSON.stringify(results.slice(0, 3), null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}

export default function SupportClient() {
  return (
    <Suspense fallback={<div>読み込み中…</div>}>
      <SupportSearchInner />
    </Suspense>
  );
}
