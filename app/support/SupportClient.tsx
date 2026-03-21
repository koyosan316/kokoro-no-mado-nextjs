"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";

// --- 型定義・データ・ロジック（ここから下は内容は一切変えていません） ---

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
  text = text.replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
  text = text.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const smallMap: Record<string, string> = { "ぁ": "あ", "ぃ": "い", "ぅ": "う", "ぇ": "え", "ぉ": "お", "ゃ": "や", "ゅ": "ゆ", "ょ": "よ", "っ": "つ" };
  text = text.replace(/[ぁぃぅぇぉゃゅょっ]/g, (c) => smallMap[c] ?? c);
  text = text.replace(/ー/g, "");
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

const HOTLINES: Hotline[] = [
  { id: "sos-24h", name: "24時間子供SOSダイヤル（文科省）", description: "いじめ・学校・友達など、子どもや保護者が24時間相談できる窓口。", phone: "0120-0-78310", hours: "24時間 / 通話料無料（IP電話は一部つながらない場合あり）", target: "小学生〜高校生くらいの子ども・保護者など", methods: ["電話"], tags: ["子ども・いじめ", "学校", "こころ全般", "全国", "24時間"], url: "https://www.mext.go.jp/a_menu/shotou/seitoshidou/1306988.htm" },
  { id: "childline", name: "チャイルドライン", description: "18歳までの子ども専用の電話・チャット相談。どんな内容でもOKで、名前を言わなくても相談できます。", phone: "0120-99-7777", hours: "毎日 16:00〜21:00 / 通話料無料", target: "18歳までの子ども", methods: ["電話", "チャット"], tags: ["子ども・いじめ", "学校", "こころ全般", "全国", "チャット"], url: "https://childline.or.jp/" },
  { id: "jinken-kodomo", name: "子どもの人権110番（法務省）", description: "いじめや虐待など、子どもの人権に関する相談を受け付ける窓口です。", phone: "0120-007-110", hours: "平日 8:30〜17:15 / 通話料無料", target: "子ども・保護者など", methods: ["電話"], tags: ["子ども・いじめ", "人権", "家庭", "全国"], url: "https://www.moj.go.jp/JINKEN/index.html" },
  { id: "jinken-110", name: "みんなの人権110番（全国共通人権相談ダイヤル）", description: "差別・ハラスメント・ネット中傷など、さまざまな人権問題の相談ができる電話窓口です。", phone: "0570-003-110", hours: "平日 8:30〜17:15（祝日・年末年始を除く）", target: "年齢問わず", methods: ["電話"], tags: ["人権", "ハラスメント", "ネット", "全国"], url: "https://www.moj.go.jp/JINKEN/index.html" },
  { id: "yorisoi", name: "よりそいホットライン", description: "孤独感、家族のこと、性のこと、お金、仕事、こころの悩みなど、テーマを問わず24時間相談できる窓口です。", phone: "0120-279-338", hours: "24時間 / 通話料無料（IP電話などは別番号あり）", target: "どなたでも", methods: ["電話"], tags: ["こころ全般", "家庭", "性のこと", "全国", "24時間"], url: "https://www.mhlw.go.jp/mamorouyokokoro/" },
  { id: "inochi", name: "いのちの電話（地域ごとの窓口）", description: "死にたい気持ち・生きづらさなどについて話を聞いてもらえる電話相談です。", hours: "地域によって時間は異なる（多くは夜間〜深夜帯）", target: "どなたでも", methods: ["電話"], tags: ["こころ全般", "自殺予防", "全国"], url: "https://www.inochinodenwa.org/" },
  { id: "net-jinken", name: "インターネット人権相談窓口", description: "ネットでの晒し・中傷・なりすましなど、人権侵害が疑われる内容の相談用フォームです。", hours: "24時間受付（Webフォーム）", target: "どなたでも", methods: ["Webフォーム"], tags: ["ネット", "人権", "全国"], url: "https://www.jinken-net.jp/" },
  { id: "child-abuse-189", name: "児童相談所虐待対応ダイヤル「189」", description: "虐待かも、と思ったときに子ども本人・周囲の人が通報や相談ができる番号です。", phone: "189", hours: "原則24時間", target: "子ども・周囲の大人", methods: ["電話"], tags: ["家庭", "虐待", "子ども・いじめ", "全国", "24時間"], url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/dv/" },
  { id: "one-stop-sex", name: "性暴力ワンストップ支援センター", description: "性被害・性的な無理な要求・画像のことで困っている人のための相談窓口です。", hours: "センターによる（多くは24時間電話受付）", target: "性被害を受けた本人・周囲の人", methods: ["電話", "対面", "メール"], tags: ["性のこと", "こころ全般", "全国"], url: "https://www.npa.go.jp/higai/sexual/index.html" },
];

function scoreHotlines(input: string): { results: ScoredHotline[]; hasEmergencySignal: boolean } {
  const norm = normalizeJa(input);
  if (!norm) return { results: HOTLINES.map((h) => ({ ...h, score: 0 })), hasEmergencySignal: false };
  const emergencyWords = ["しにたい", "しにた", "きえたい", "じさつ", "りすか", "もうむり", "いきてるいみ"];
  const schoolWords = ["いじめ", "いじ", "虐め", "がっこう", "学校", "くらす", "クラス", "きょうしつ", "教室", "せんせい", "先生", "ぶかつ", "部活", "せんぱい", "先輩", "こうはい", "後輩", "はぶ", "無視", "なかまはずれ", "仲間外れ"];
  const schoolStrongWords = ["登校しづらい", "とうこうしづらい", "がっこういきたくない", "学校行きたくない", "がっこうこわい", "学校こわい", "学校つらい", "ふとうこう", "不登校"];
  const familyWords = ["おや", "親", "かてい", "家庭", "どな", "怒鳴", "なぐら", "殴", "dv", "虐待", "ぎゃくたい", "家にいたくない"];
  const netWords = ["sns", "x", "インスタ", "tiktok", "dm", "さらさ", "誹謗中傷", "なりすまし", "アカウント"];
  const mentalWords = ["つらい", "しんどい", "ふあん", "不安", "落ち込", "憂鬱", "眠れない", "怖い", "気分", "やる気が出ない"];
  const sexWords = ["エロ", "はだか", "裸", "写真送れ", "性的", "体触ら", "いやらしいこと"];
  const hasEmergencySignal = emergencyWords.some((w) => norm.includes(w));
  const results: ScoredHotline[] = HOTLINES.map((h) => {
    let score = 0;
    if (h.tags.includes("全国")) score += 1;
    if (h.tags.includes("24時間")) score += 2;
    if (h.tags.includes("子ども・いじめ")) score += 1;
    if (schoolWords.some(w => norm.includes(w)) && h.tags.includes("学校")) score += 5;
    if (schoolStrongWords.some(w => norm.includes(w)) && h.tags.includes("学校")) score += 8;
    if (familyWords.some(w => norm.includes(w)) && h.tags.includes("家庭")) score += 6;
    if (netWords.some(w => norm.includes(w)) && h.tags.includes("ネット")) score += 7;
    if (mentalWords.some(w => norm.includes(w)) && h.tags.includes("こころ全般")) score += 6;
    if (sexWords.some(w => norm.includes(w)) && h.tags.includes("性のこと")) score += 9;
    if (hasEmergencySignal && h.tags.includes("24時間")) score += 10;
    return { ...h, score };
  });
  results.sort((a, b) => b.score - a.score);
  return { results, hasEmergencySignal };
}

// --- 画面パーツ ---

function SupportSearchInner() {
 const [text, setText] = useState("");

useEffect(() => {
  const saved = sessionStorage.getItem("supportDraft") ?? "";
  if (saved) setText(saved);
}, []);
  const [results, setResults] = useState<ScoredHotline[] | null>(null);
  const [hasEmergencySignal, setHasEmergencySignal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 安全チェック
  const safetyCheck = useMemo(() => {
    const norm = normalizeJa(text);
    const attackWords = ["ころす", "しね", "なぐる", "ふくしゅう", "のろう"]; // ひらがな判定用
    const rawText = text.toLowerCase();
    const attackWordsRaw = ["殺す", "死ね", "殴る", "復讐", "呪う", "ぶっ殺す"];
    const privacyPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+|id:|@\w+/i;

    if (attackWordsRaw.some(w => rawText.includes(w)) || attackWords.some(w => norm.includes(w))) {
      return { level: "ATTACK", msg: "⚠️ 入力された内容に、少し強い言葉が含まれているようです。相談の際は、起きた出来事を落ち着いて伝えるとサポートが受けやすくなります。" };
    }
    if (privacyPattern.test(rawText)) {
      return { level: "PRIVACY", msg: "🔒 安全のために、SNSのIDや連絡先、URLは入力しないでください。" };
    }
    return null;
  }, [text]);

  const handleAnalyze = () => {
    if (safetyCheck) return;
    const { results, hasEmergencySignal } = scoreHotlines(text);
    setResults(results);
    setHasEmergencySignal(hasEmergencySignal);
    setShowAll(false);
    setHasSearched(true);
  };

  const topResults = results ? results.slice(0, 3) : [];

  return (
    <main className={`relative min-h-screen transition-colors duration-500 ${safetyCheck ? 'bg-rose-50/50' : 'bg-transparent'}`}>
      {/* 背景の光 */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-sky-100/80 via-transparent to-transparent blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-4 py-12">
        <header className="flex items-center justify-between mb-10">
          <Link href="/" className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white group-hover:border-slate-400">←</span>
            もどる
          </Link>
          <span className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Counseling Guide</span>
        </header>

        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 md:text-3xl">いまの状況から相談窓口をさがす</h1>
          <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
            いじめ・人間関係・家庭のこと・こころの不調などについて、「いまの状況」や「気持ち」を一文で書くと、相談先として合いそうな窓口を提案します。
          </p>
          <div className="inline-block rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[11px] font-bold text-amber-800 leading-relaxed">
              <span className="mr-1">⚠</span> 緊急の危険があるときは、110番や119番などの緊急通報が最優先になります。
            </p>
          </div>
        </section>

        {/* 入力エリア */}
        <section className="mb-12">
  <div
    className={`relative overflow-hidden rounded-[2rem] border-2 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all duration-300 ${
      safetyCheck ? "border-rose-400 ring-4 ring-rose-100" : "border-slate-100"
    }`}
  >
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      rows={4}
      className="w-full resize-none border-none bg-transparent p-2 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
      placeholder="ここにいまの状況を書いてください（例：学校に行くのがこわい、SNSで悪口を書かれた...）"
    />

    {safetyCheck && (
      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-rose-50 p-4 text-xs font-black text-rose-600 animate-in slide-in-from-top-2">
        <span>{safetyCheck.msg}</span>
      </div>
    )}

    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-50 pt-6">
      <button
        onClick={handleAnalyze}
        disabled={!text.trim() || !!safetyCheck}
        className="rounded-full bg-slate-900 px-8 py-3 text-xs font-black text-white shadow-lg transition-all hover:bg-black hover:scale-105 active:scale-95 disabled:opacity-20 disabled:hover:scale-100"
      >
        相談先の候補を表示する
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("supportDraft");
            setText("");
            setResults(null);
            setHasSearched(false);
            setHasEmergencySignal(false);
          }}
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-[11px] font-black text-slate-500 hover:bg-slate-50"
        >
          入力をクリア
        </button>

        <Link
          href="/form"
          className="text-[11px] font-bold text-slate-400 underline underline-offset-4 hover:text-violet-600"
        >
          言葉が出てこない時は「悩みを整理するページ」へ
        </Link>
      </div>
    </div>
  </div>
  <div className="mt-4 rounded-2xl border border-slate-200 bg-white/60 px-4 py-3">
      <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
        ※ 受付時間・番号・対応方法は変更される場合があります。最新情報は各窓口の公式サイトでご確認ください。
      </p>
    </div>
</section>
        {/* 結果表示 */}
        {hasSearched && results && (
          <div className="space-y-8 fade-in">
            {hasEmergencySignal && (
              <div className="rounded-3xl border-2 border-rose-100 bg-rose-50/50 p-6 text-rose-900">
                <p className="text-sm font-black mb-1">⚠ とてもつらい気持ちのサインが含まれています</p>
                <p className="text-xs font-bold opacity-80">一人で抱え込まず、信頼できる大人や24時間対応の窓口にもつながってみてください。</p>
              </div>
            )}

            <div className="grid gap-6">
              {topResults.map((h) => (
                <article key={h.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {h.tags.map(t => <span key={t} className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-black text-slate-400">{t}</span>)}
                      </div>
                      <h3 className="text-lg font-black text-slate-800">{h.name}</h3>
                    </div>
                  </div>
                  <p className="mb-6 text-xs font-bold leading-relaxed text-slate-500">{h.description}</p>
                  
                  <div className="grid gap-2 mb-8 text-[11px] font-black">
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="w-16 text-slate-300">受付時間</span>
                      <span>{h.hours}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600">
                      <span className="w-16 text-slate-300">対象窓口</span>
                      <span>{h.target}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {h.phone && (
                      <a href={`tel:${h.phone.replace(/-/g, "")}`} className="rounded-2xl bg-emerald-500 px-6 py-3 text-[11px] font-black text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600">
                        電話で相談する
                      </a>
                    )}
                    {h.url && (
                      <a href={h.url} target="_blank" rel="noreferrer" className="rounded-2xl bg-slate-50 px-6 py-3 text-[11px] font-black text-slate-600 transition-all hover:bg-slate-100">
                        公式サイト
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SupportClient() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-black text-slate-200">LOADING...</div>}>
      <SupportSearchInner />
    </Suspense>
  );
}