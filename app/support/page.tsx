// app/support/page.tsx
"use client";

import { useState } from "react";
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
  tags: string[]; // ["子ども・いじめ","学校","こころ全般","全国","24時間",...]
  url?: string;
};

type ScoredHotline = Hotline & { score: number };

/* -------------------------
   日本語テキスト正規化
-------------------------- */
function normalizeJa(raw: string): string {
  if (!raw) return "";
  let text = raw.toLowerCase();

  // 全角→半角
  text = text.replace(/[！-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

  // カタカナ→ひらがな
  text = text.replace(/[\u30a1-\u30f6]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0x60)
  );

  // 小書き文字を通常に
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

  // 伸ばし棒を削る（「こわーい」→「こわい」）
  text = text.replace(/ー/g, "");

  // 余計な空白まとめ
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

/* -------------------------
   相談窓口データ（必要に応じて増やせるように）
-------------------------- */

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

/* -------------------------
   スコアリング関数
-------------------------- */

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

  // キーワード群
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

    // ベース加点
    if (h.tags.includes("全国")) score += 1;
    if (h.tags.includes("24時間")) score += 2;
    if (h.tags.includes("子ども・いじめ")) score += 1;

    // 学校・不登校
    if (hasSchool && h.tags.includes("学校")) score += 5;
    if (hasSchool && h.tags.includes("子ども・いじめ")) score += 3;
    if (hasSchoolStrong && h.tags.includes("学校")) score += 8;
    if (hasSchoolStrong && h.id === "sos-24h") score += 2; // SOSを少し優遇

    // 家庭・虐待
    if (hasFamily && h.tags.includes("家庭")) score += 6;
    if (hasFamily && h.tags.includes("人権")) score += 3;
    if (hasFamily && h.id === "child-abuse-189") score += 5;

    // ネットトラブル
    if (hasNet && h.tags.includes("ネット")) score += 7;
    if (hasNet && h.tags.includes("人権")) score += 3;

    // メンタル・こころ
    if (hasMental && h.tags.includes("こころ全般")) score += 6;
    if (hasMental && h.tags.includes("自殺予防")) score += 4;

    // 性的なトラブル
    if (hasSex && h.tags.includes("性のこと")) score += 9;
    if (hasSex && h.tags.includes("人権")) score += 3;

    // 緊急サイン
    if (hasEmergencySignal && h.tags.includes("24時間")) score += 10;
    if (hasEmergencySignal && h.id === "yorisoi") score += 4;
    if (hasEmergencySignal && h.id === "inochi") score += 8;

    return { ...h, score };
  });

  results.sort((a, b) => b.score - a.score);

  return { results, hasEmergencySignal };
}

/* -------------------------
   ページコンポーネント
-------------------------- */

export default function SupportSearchPage() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("text") ?? "";

  const [text, setText] = useState(initial);
  const [results, setResults] = useState<ScoredHotline[] | null>(null);
  const [hasEmergencySignal, setHasEmergencySignal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const trimmed = text.trim();
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

  const topResults = results ? results.slice(0, 3) : [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-900">
      {/* 背景の光 */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-sky-100/80 via-slate-50 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-8 fade-in">
        {/* ヘッダー */}
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            ← ホームにもどる
          </Link>
          <p className="text-xs text-slate-400">相談窓口をさがす</p>
        </header>

        {/* タイトル＋注意書き */}
        <section className="mt-6 space-y-3">
          <h1 className="text-xl font-bold md:text-2xl">
            いまの状況から相談窓口をさがす
          </h1>
          <p className="text-sm text-slate-700">
            いじめ・人間関係・家庭のこと・こころの不調などについて、
            「いまの状況」や「気持ち」を一文で書くと、
            相談先として合いそうな窓口をアプリ内で提案します。
          </p>
          <div className="space-y-1 rounded-xl border border-amber-200 bg-amber-50/80 p-3">
            <p className="text-xs font-semibold text-amber-900">
              ⚠ 緊急の危険があるとき
            </p>
            <p className="text-[11px] text-amber-900/90">
              いのちや安全に関わる緊急の状況では、
              110番や119番などの緊急通報サービスの利用が最優先になります。
              このサイトの情報は、診断や緊急対応の代わりにはなりません。
            </p>
          </div>
        </section>

        {/* 入力フォーム */}
        <section className="mt-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
            <label className="block text-xs font-medium text-slate-600">
              いまの状況や気持ちを、一文でも短い言葉でもいいので書いてください。
            </label>
            <p className="mt-1 text-[11px] text-slate-500">
              例）「親に毎日怒鳴られていてつらい」
              「いじめか分からないけどクラスで浮いている気がする」
              「SNSで晒されていて怖い」 など
            </p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm outline-none ring-sky-100 focus:border-sky-400 focus:ring"
              placeholder="思いつく範囲で、てきとうで大丈夫です。"
            />

            {/* 言葉が出てこないとき → フォームへ */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAnalyze}
                className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                disabled={trimmed.length === 0}
              >
                相談先の候補を表示する
              </button>
              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-slate-500 underline underline-offset-2 hover:text-slate-700"
                >
                  入力した言葉でGoogle検索結果も見てみる
                </a>
              )}
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5">
              <span className="text-[11px] text-violet-800">
                言葉が出てこないときは
              </span>
              <Link
                href="/form"
                className="text-[11px] font-semibold text-violet-800 underline underline-offset-2"
              >
                悩みを整理するページ
              </Link>
              <span className="text-[11px] text-violet-800">
                を使っても大丈夫です。
              </span>
            </div>
          </div>

          {/* 結果表示 */}
          <div className="space-y-4">
            {hasSearched && results && (
              <>
                {hasEmergencySignal && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-4">
                    <p className="text-xs font-semibold text-rose-800">
                      ⚠ とてもつらい気持ちのサインが含まれているようです
                    </p>
                    <p className="mt-1 text-[11px] text-rose-900/90">
                      「死にたい」「消えたい」などの気持ちが続いているとき、
                      一人で抱え続ける必要はありません。できれば信頼できる大人
                      （家族・先生・スクールカウンセラーなど）や、
                      24時間対応の相談窓口にもつながってみてください。
                    </p>
                  </div>
                )}

                <section className="space-y-2">
                  <h2 className="text-xs font-semibold text-slate-700">
                    いまの内容から、次の相談窓口が合いそうです
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    ここに出てこない窓口が合わない、という意味ではありません。
                    「話しやすそう」「ここなら大丈夫そう」と感じるところを選んで大丈夫です。
                  </p>

                  <div className="space-y-3">
                    {topResults.map((h) => (
                      <article
                        key={h.id}
                        className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-sm font-semibold text-slate-900">
                            {h.name}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {h.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] text-slate-600"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-slate-700">
                          {h.description}
                        </p>

                        <dl className="mt-3 space-y-1 text-[11px] text-slate-600">
                          {h.phone && (
                            <div className="flex gap-2">
                              <dt className="w-16 shrink-0 text-slate-500">
                                電話
                              </dt>
                              <dd className="font-mono text-slate-800">
                                {h.phone}
                              </dd>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <dt className="w-16 shrink-0 text-slate-500">
                              受付時間
                            </dt>
                            <dd>{h.hours}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="w-16 shrink-0 text-slate-500">
                              対象
                            </dt>
                            <dd>{h.target}</dd>
                          </div>
                          <div className="flex gap-2">
                            <dt className="w-16 shrink-0 text-slate-500">
                              方法
                            </dt>
                            <dd>{h.methods.join(" / ")}</dd>
                          </div>
                        </dl>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {h.phone && (
                            <a
                              href={`tel:${h.phone.replace(/-/g, "")}`}
                              className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-700"
                            >
                              この番号に電話してみる
                            </a>
                          )}
                          {h.url && (
                            <a
                              href={h.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
                            >
                              公式サイトを開く
                            </a>
                          )}
                        </div>
                      </article>
                    ))}

                    {topResults.length === 0 && (
                      <p className="text-[11px] text-slate-500">
                        条件に合いそうな窓口がうまく選べませんでした。
                        それでも、下の「すべての相談窓口を見る」から
                        気になるところを選んで相談しても大丈夫です。
                      </p>
                    )}
                  </div>
                </section>

                {/* すべて表示 */}
                <section className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowAll((v) => !v)}
                    className="text-[11px] text-sky-700 underline underline-offset-2 hover:text-sky-900"
                  >
                    {showAll
                      ? "すべての相談窓口一覧を閉じる"
                      : "登録されている相談窓口をすべて見る"}
                  </button>

                  {showAll && (
                    <div className="mt-2 space-y-3">
                      {(results || []).map((h) => (
                        <article
                          key={`all-${h.id}`}
                          className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">
                              {h.name}
                            </h3>
                            <div className="flex flex-wrap gap-1">
                              {h.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] text-slate-600"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <p className="mt-2 text-xs text-slate-700">
                            {h.description}
                          </p>

                          <dl className="mt-3 space-y-1 text-[11px] text-slate-600">
                            {h.phone && (
                              <div className="flex gap-2">
                                <dt className="w-16 shrink-0 text-slate-500">
                                  電話
                                </dt>
                                <dd className="font-mono text-slate-800">
                                  {h.phone}
                                </dd>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <dt className="w-16 shrink-0 text-slate-500">
                                受付時間
                              </dt>
                              <dd>{h.hours}</dd>
                            </div>
                            <div className="flex gap-2">
                              <dt className="w-16 shrink-0 text-slate-500">
                                対象
                              </dt>
                              <dd>{h.target}</dd>
                            </div>
                            <div className="flex gap-2">
                              <dt className="w-16 shrink-0 text-slate-500">
                                方法
                              </dt>
                              <dd>{h.methods.join(" / ")}</dd>
                            </div>
                          </dl>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {h.phone && (
                              <a
                                href={`tel:${h.phone.replace(/-/g, "")}`}
                                className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-700"
                              >
                                この番号に電話してみる
                              </a>
                            )}
                            {h.url && (
                              <a
                                href={h.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50"
                              >
                                公式サイトを開く
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}

            {!hasSearched && (
              <p className="text-[11px] text-slate-500">
                入力欄にいまの状況を書いて「相談先の候補を表示する」を押すと、
                ここに相談窓口の候補が表示されます。
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
