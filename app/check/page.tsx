// app/check/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckPage() {
  // 22問フル版
  const questions = [
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

  // 回答（0,1,2）を保存する配列
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  // 結果を表示するかどうか
  const [showResult, setShowResult] = useState(false);

  const updateAnswer = (index: number, value: number) => {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);
    // 回答変更したら一旦診断結果は非表示に戻す（再診断を促す）
    if (showResult) {
      setShowResult(false);
    }
  };

  // 合計スコア
  const score = answers.reduce((a, b) => a + b, 0);

   // 結果メッセージ（5段階に分けた版）
  const getResult = () => {
    if (score <= 6) {
      return `合計 ${score} 点：比較的落ち着いている様子です。ただし、点数が低くても「気になること」が続く場合は、早めに信頼できる大人や専門機関に相談しても大丈夫です。`;
    }
    if (score <= 14) {
      return `合計 ${score} 点：軽めのストレス反応がみられるかもしれません。休めるときにしっかり休んだり、安心できる人に少し話してみると楽になる場合があります。`;
    }
    if (score <= 22) {
      return `合計 ${score} 点：中くらいのストレス反応が続いている可能性があります。一人で抱え込まず、学校・家族・相談窓口などに状況を共有していくことを検討してみてください。`;
    }
    if (score <= 30) {
      return `合計 ${score} 点：やや強いストレス/トラウマ反応が出ているかもしれません。なるべく早めに、専門機関や信頼できる大人へ相談することをおすすめします。`;
    }
    return `合計 ${score} 点：かなり強いストレス/トラウマ反応の可能性があります。無理をしすぎず、学校の相談窓口・医療機関・公的な相談ダイヤルなど、専門的な支援につながる場所に早めに相談してみてください。`;
  };


  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* 背景 */}
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
          <p className="text-xs text-slate-400">セルフチェック（ストレス・反応のめやす）</p>
        </header>

        {/* タイトル */}
        <section className="mt-6 space-y-2">
          <h1 className="text-xl font-bold">
            📒 セルフチェック（ストレス・トラウマ反応）
          </h1>
          <p className="text-sm text-slate-600">
            ※ これは医療的な診断ではありません。点数にかかわらず、「苦しい」「しんどい」と感じる場合は、早めに専門機関や信頼できる人に相談してください。
          </p>
        </section>

        {/* 上部：質問リスト＋スコア・診断エリア */}
        <section className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)]">
          {/* 質問リスト */}
          <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
            {questions.map((q, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-sm font-medium text-slate-800">
                  {i + 1}. {q}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => updateAnswer(i, 0)}
                    className={`px-3 py-1 rounded-lg border text-xs md:text-sm ${
                      answers[i] === 0
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    いいえ
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAnswer(i, 1)}
                    className={`px-3 py-1 rounded-lg border text-xs md:text-sm ${
                      answers[i] === 1
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    少しある
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAnswer(i, 2)}
                    className={`px-3 py-1 rounded-lg border text-xs md:text-sm ${
                      answers[i] === 2
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    よくある
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 右側：スコア + 診断ボタン + 結果 */}
          <div className="space-y-4">
            {/* スコアをドーンと出す */}
            <div className="rounded-2xl bg-slate-900 text-slate-50 p-5 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Current Score
              </p>
              <p className="mt-2 text-4xl font-extrabold tabular-nums">
                {score}
                <span className="ml-1 text-sm font-medium text-slate-300">
                  / 44 点
                </span>
              </p>
              <p className="mt-2 text-xs text-slate-300">
                「少しある」= 1点、「よくある」= 2点として計算しています。
              </p>
            </div>

            {/* 診断ボタン */}
            <button
              type="button"
              onClick={() => setShowResult(true)}
              className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-400"
            >
              🩺 このスコアで診断する
            </button>

            {/* 結果表示 */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-slate-800">
              {showResult ? (
                <>
                  <p className="font-semibold text-emerald-900">結果のめやす</p>
                  <p className="mt-2 text-sm leading-relaxed">{getResult()}</p>
                  <p className="mt-3 text-[11px] text-emerald-900/80">
                    ※ 自己チェック用の簡易的な指標です。点数が低くてもつらさが強いと感じれば相談してよいし、点数が高い＝あなたが悪いという意味では決してありません。
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-emerald-900">
                    「🩺 このスコアで診断する」を押すと、ここに結果の目安が表示されます。
                  </p>
                  <p className="mt-2 text-[11px] text-emerald-900/80">
                    すべての質問に答え終わっていなくても押すことはできますが、
                    できるだけ今の状態に近い形でチェックしてみてください。
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
