// app/check/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckPage() {
  const router = useRouter();

  const initialQuestions = [
    "最近の出来事が頭から離れず、夢に見ることがある",
    "その出来事を思い出す場面や場所を避けてしまう",
    "似た出来事やニュースを連想すると強い不安を感じる",
    "小さな音や刺激で強く驚いたり過敏に反応する",
    "特定のにおいや音が過去の記憶をよみがえらせる",
    "強い罪悪感や恥の感情が続いている",
    "自分のせいだと繰り返し考えてしまう",
    "イライラや怒りが抑えにくい",
    "無力感や絶望感を感じることが多い",
    "ぼーっとする/現実感がない感覚になることがある",
    "頭痛・腹痛・吐き気・動悸など体の不調が増えた",
    "寝つきが悪い/夜中に目が覚める/悪夢を見る",
    "集中しづらい/物事を忘れやすい",
    "人付き合いやSNSを避けるようになった",
    "以前楽しめたことを楽しめなくなった",
    "学業や仕事のパフォーマンスに影響が出ている",
    "「消えてしまいたい」と感じることがある",
    "加害した人や出来事に強い怒り・復讐心を抱く",
    "他人を信頼しにくくなった",
    "些細な刺激で心拍が上がる・汗ばむなどの反応が出る",
    "急に当時の場面がフラッシュバックすることがある",
    "睡眠や食事など生活リズムが乱れている",
  ];

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const shuffled = [...initialQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const updateAnswer = (questionText: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionText]: value }));
    if (showResult) setShowResult(false);
  };

  const score = Object.values(answers).reduce((a, b) => a + b, 0);

  // --- 結果エリア専用の色設定 ---
  const getResultStyle = () => {
    if (score <= 6) {
      return {
        bg: "bg-blue-50 border-blue-200",
        tag: "bg-blue-500",
        text: "text-blue-800",
        label: "落ち着いている状態",
        msg: `比較的落ち着いている様子です。ただし、点数が低くても「気になること」が続く場合は、早めに信頼できる大人や専門機関に相談しても大丈夫です。`
      };
    }
    if (score <= 14) {
      return {
        bg: "bg-green-50 border-green-200",
        tag: "bg-green-600",
        text: "text-green-800",
        label: "少しお疲れの状態",
        msg: `軽めのストレス反応がみられるかもしれません。休めるときにしっかり休んだり、安心できる人に少し話してみると楽になる場合があります。`
      };
    }
    if (score <= 22) {
      return {
        bg: "bg-yellow-50 border-yellow-200",
        tag: "bg-yellow-600",
        text: "text-yellow-800",
        label: "注意が必要な状態",
        msg: `中くらいのストレス反応が続いている可能性があります。一人で抱え込まず、学校・家族・相談窓口などに状況を共有していくことを検討してみてください。`
      };
    }
    if (score <= 30) {
      return {
        bg: "bg-orange-50 border-orange-200",
        tag: "bg-orange-600",
        text: "text-orange-800",
        label: "つらい状態",
        msg: `やや強いストレス/トラウマ反応が出ているかもしれません。なるべく早めに、専門機関や信頼できる大人へ相談することをおすすめします。`
      };
    }
    return {
      bg: "bg-red-50 border-red-200",
      tag: "bg-red-600",
      text: "text-red-800",
      label: "非常に深刻な状態",
      msg: `かなり強いストレス/トラウマ反応の可能性があります。無理をしすぎず、学校の相談窓口・医療機関・公的な相談ダイヤルなど、専門的な支援につながる場所に早めに相談してみてください。`
    };
  };

  const resultStyle = getResultStyle();

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={() => router.push('/')}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            ← ホームにもどる
          </button>
          <p className="text-xs text-slate-400 font-bold">セルフチェック</p>
        </header>

        <section className="mt-8 grid gap-8 md:grid-cols-[1fr_350px]">
          
          {/* 左側：質問リスト（回答ボタンの色は青に固定） */}
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {questions.map((q, i) => (
              <div key={q} className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
                <p className="text-sm font-bold text-slate-800 mb-4">{i + 1}. {q}</p>
                <div className="flex gap-2">
                  {["いいえ", "少しある", "よくある"].map((label, val) => (
                    <button
                      key={label}
                      onClick={() => updateAnswer(q, val)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                        answers[q] === val
                          ? "bg-sky-600 border-sky-600 text-white shadow-md"
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 右側：固定カラーのスコアパネル ＋ 色が変わる結果エリア */}
          <div className="space-y-4">
            {/* スコアパネル（黒で固定） */}
            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">現在の合計点数</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-6xl font-black italic">{score}</span>
                <span className="text-sm font-bold text-slate-500">/ 44 点</span>
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="w-full rounded-2xl bg-emerald-500 py-4 text-sm font-black text-white shadow-lg hover:bg-emerald-600 transition-all"
            >
              🩺 結果を詳しく確認する
            </button>

            {/* 結果エリア（ここだけスコアに応じて色が変わる） */}
            <div className={`rounded-[2rem] border-2 p-6 transition-all duration-500 ${showResult ? resultStyle.bg : "bg-white border-slate-100"}`}>
              {showResult ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black text-white ${resultStyle.tag}`}>
                    判定：{resultStyle.label}
                  </div>
                  <p className={`text-sm font-bold leading-relaxed ${resultStyle.text}`}>
                    {resultStyle.msg}
                  </p>
                  <div className="mt-6 space-y-2">
                    <Link href="/support" className="block w-full rounded-xl bg-slate-900 py-3 text-center text-xs font-black text-white">相談窓口をさがす →</Link>
                    <Link href="/breathe" className="block w-full rounded-xl border border-slate-200 bg-white py-3 text-center text-xs font-black text-slate-600">深呼吸してみる →</Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs font-bold text-slate-300 leading-relaxed">
                    回答をすべて選んだあと、<br/>上のボタンを押すとここに結果が出ます。
                  </p>
                </div>
              )}
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}