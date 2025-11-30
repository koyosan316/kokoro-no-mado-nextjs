"use client";

import { useState } from "react";
import Link from "next/link";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  topic: string;
};

// 学ぶページ（/learn）の内容を前提にした問題たち
const allQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "フラッシュバックについて、もっとも近い説明はどれ？",
    options: [
      "過去のつらい出来事が、急にリアルによみがえる反応",
      "人前で発表するのが苦手なこと",
      "夜ふかししすぎて眠い状態",
      "SNSで叩かれること",
    ],
    answerIndex: 0,
    explanation:
      "学ぶページの「🧠 フラッシュバックとは？」の項目をもう一度見てみよう。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q2",
    question:
      "強いストレスの中で「現実感が遠くなる」「自分じゃないみたい」と感じる状態を、学ぶページでは何と呼んでいた？",
    options: ["解離（かいり）", "過覚醒（かかくせい）", "HSP", "社交不安"],
    answerIndex: 0,
    explanation:
      "学ぶページの「🌀 解離（かいり）って？」のところに詳しい説明があるよ。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q3",
    question:
      "HSPについて、学ぶページの説明として一番近いものはどれ？",
    options: [
      "必ず病気になる状態のこと",
      "音・光・人の表情などにとても敏感な気質のこと",
      "スマホを長時間使いすぎること",
      "眠たくなりやすい体質のこと",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「🌱 HSP（ひとの気持ちや刺激に敏感な気質）」の項目を見てみてね。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q4",
    question:
      "戸締まりやスイッチを何度も確認してしまうなど、「やりすぎかも」と思ってもやめにくい状態は、どの用語に近い？",
    options: ["強迫症", "過覚醒", "フラッシュバック", "スクショ晒し"],
    answerIndex: 0,
    explanation:
      "学ぶページの「♻️ 強迫症（きょうはくしょう）って？」をチェックしてみよう。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q5",
    question:
      "過覚醒（かかくせい）の特徴として、学ぶページで説明されていたものはどれ？",
    options: [
      "とてもよく眠れる状態",
      "体と心が常に戦闘モードのようになっている状態",
      "ゲームを長時間している状態",
      "お腹がすきやすい状態",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「⚡ 過覚醒（かかくせい）って？」のところに具体例が書いてあるよ。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q6",
    question:
      "「人前で失敗したらどうしよう」「授業で当てられるのが極端にこわい」などの状態を、学ぶページでは何と呼んでいた？",
    options: ["社交不安", "HSP", "解離", "ヤングケアラー"],
    answerIndex: 0,
    explanation:
      "学ぶページの「😥 社交不安（人前が極端にこわい感覚）」を見直してみよう。",
    topic: "🧠 メンタル・心の反応",
  },
  {
    id: "q7",
    question:
      "SNSの会話のスクリーンショットを、相手の許可なく他の人に見せたり晒したりする行為は、学ぶページでは何と説明されていた？",
    options: [
      "スマホ疲れ",
      "スクショ晒し文化",
      "デジタルタトゥー",
      "モラハラ",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「📱 スクショ晒し文化とは？」の部分に説明があるよ。",
    topic: "💻 ネット・SNSトラブル",
  },
  {
    id: "q8",
    question:
      "なりすましアカウントで嫌がらせをしたり、グループチャットから締め出したりするのは、学ぶページではどのカテゴリに入っていた？",
    options: [
      "ネットいじめ・ネットトラブル",
      "パワハラ",
      "スマホ疲れ",
      "プライバシー侵害",
    ],
    answerIndex: 0,
    explanation:
      "学ぶページの「🟢 ネットいじめ・ネットトラブルについて」を見てみよう。",
    topic: "💻 ネット・SNSトラブル",
  },
  {
    id: "q9",
    question:
      "ネット上で、事実かどうかに関係なく「相手の社会的な評価を下げる内容」を広める行為は、学ぶページでは何と説明されていた？",
    options: [
      "名誉毀損（めいよきそん）",
      "侮辱罪",
      "プライバシー侵害",
      "デジタルタトゥー",
    ],
    answerIndex: 0,
    explanation:
      "学ぶページの「⚖️ 名誉毀損（めいよきそん）って何？」の項目に詳しく書いてあるよ。",
    topic: "⚖️ 法律・制度",
  },
  {
    id: "q10",
    question:
      "いじめ防止対策推進法について、学ぶページの説明に近いものはどれ？",
    options: [
      "いじめを子ども同士のトラブルとして扱う法律",
      "学校などが、いじめを防ぎ、見つけたら対応する責任があると定めた法律",
      "いじめの被害をSNSに必ず投稿するように定めた法律",
      "いじめ加害者を全員退学にすることを定めた法律",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「🟠 いじめ防止対策推進法って？」をもう一度読んでみよう。",
    topic: "⚖️ 法律・制度",
  },
  {
    id: "q11",
    question:
      "パワーハラスメント（パワハラ）の例として、学ぶページに書かれていた内容に一番近いものはどれ？",
    options: [
      "必要以上に人前で怒鳴ったり、罵倒を繰り返す",
      "静かな場所で短く注意する",
      "仕事のやり方を優しく教える",
      "勤務時間内に休憩を取るように促す",
    ],
    answerIndex: 0,
    explanation:
      "学ぶページの「🔵 パワハラ（パワーハラスメント）とは？」をチェックしてみてね。",
    topic: "⚖️ 法律・制度／ハラスメント",
  },
  {
    id: "q12",
    question:
      "ヤングケアラーについて、学ぶページの説明として一番近いものはどれ？",
    options: [
      "テスト勉強をたくさんする子ども",
      "家事や介護・きょうだいの世話などを、日常的に担っている子どもや若者",
      "スマホをよく使う子ども",
      "部活で活躍している子ども",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「🟣 ヤングケアラーとは？」や「🧸 ヤングケアラーの生活負担」を見てみよう。",
    topic: "🏠 家庭・ヤングケアラー",
  },
  {
    id: "q13",
    question:
      "スマホ疲れについて、学ぶページで触れられていた内容として一番近いものはどれ？",
    options: [
      "スマホのバッテリーが減ること",
      "通知・比較・返信プレッシャーなどで心が慢性的に疲れる状態",
      "スマホを落として画面が割れた状態",
      "スマホの操作が苦手な状態",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「📱 スマホ疲れ（SNSでしんどくなる理由）」を読んでみてね。",
    topic: "💻 ネット・SNSトラブル",
  },
  {
    id: "q14",
    question:
      "DMでの脅し・無理な要求への基本的な対処として、学ぶページで勧められていた流れに近いものはどれ？",
    options: [
      "とりあえず全て言うことを聞く",
      "証拠を残し、ブロックして、大人や相談窓口に相談する",
      "すぐにアカウントを消して誰にも言わない",
      "友達とのグループチャットだけで共有して終わる",
    ],
    answerIndex: 1,
    explanation:
      "学ぶページの「✉ DMでの脅し・要求」の項目に、基本の流れが書いてあるよ。",
    topic: "💻 ネット・SNSトラブル",
  },
];

// ランダムに count 問取り出して、選択肢の順番もシャッフル
function createRandomQuiz(
  source: QuizQuestion[],
  count: number
): QuizQuestion[] {
  const shuffledQuestions = [...source].sort(() => Math.random() - 0.5);
  const picked = shuffledQuestions.slice(0, count);

  return picked.map((q) => {
    const indices = q.options.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    const newOptions = indices.map((i) => q.options[i]);
    const newAnswerIndex = indices.indexOf(q.answerIndex);

    return {
      ...q,
      options: newOptions,
      answerIndex: newAnswerIndex,
    };
  });
}

type AnswerState = "idle" | "correct" | "wrong";

const QUESTION_COUNT = 10;

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() =>
    createRandomQuiz(allQuestions, QUESTION_COUNT)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = quizQuestions[currentIndex];
  const score = Math.round((correctCount / quizQuestions.length) * 100);

  const handleChoiceSelect = (index: number) => {
    if (answerState !== "idle") return;
    setSelectedIndex(index);
  };

  const handleCheck = () => {
    if (selectedIndex === null || answerState !== "idle") return;
    const isCorrect = selectedIndex === q.answerIndex;
    if (isCorrect) {
      setAnswerState("correct");
      setCorrectCount((prev) => prev + 1);
    } else {
      setAnswerState("wrong");
    }
  };

  const handleNext = () => {
    if (currentIndex === quizQuestions.length - 1) {
      setIsFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setAnswerState("idle");
  };

  const handleRestart = () => {
    const newQuiz = createRandomQuiz(allQuestions, QUESTION_COUNT);
    setQuizQuestions(newQuiz);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswerState("idle");
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-900">
        <div className="relative mx-auto max-w-3xl px-4 py-8 fade-in">
          <header className="flex items-center justify-between border-b border-slate-200 pb-4">
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
            >
              ← ホームにもどる
            </Link>
            <p className="text-xs text-slate-400">クイズ結果</p>
          </header>

          <section className="mt-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                100点中 <span className="text-sky-600">{score}</span> 点
              </h1>
              <p className="mt-1 text-sm text-slate-700">
                全{quizQuestions.length}問中 {correctCount}問 正解でした。
              </p>

              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                間違えたところは、学ぶページの対応する項目を見直すと理解が深まります。
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                >
                  もう一度チャレンジ
                </button>
                <Link
                  href="/learn"
                  className="rounded-full border border-slate-300 bg-white/80 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  学ぶページを読む
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-900">
      <div className="relative mx-auto max-w-3xl px-4 py-8 fade-in">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            ← ホームにもどる
          </Link>
          <p className="text-xs text-slate-400">
            学びのチェッククイズ {currentIndex + 1}/{quizQuestions.length}
          </p>
        </header>

        <section className="mt-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              {q.topic}
            </p>
            <h1 className="mt-1 text-base font-semibold text-slate-900">
              {q.question}
            </h1>

            <div className="mt-4 space-y-2">
              <ul className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedIndex === idx;
                  const isCorrect =
                    answerState !== "idle" && idx === q.answerIndex;
                  const isWrong =
                    answerState === "wrong" &&
                    isSelected &&
                    idx !== q.answerIndex;

                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => handleChoiceSelect(idx)}
                        className={[
                          "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                          isSelected
                            ? "border-sky-500 bg-sky-50"
                            : "border-slate-200 bg-white/70 hover:border-slate-300",
                          isCorrect && "border-emerald-500 bg-emerald-50",
                          isWrong && "border-rose-400 bg-rose-50",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <span className="mr-2 text-[11px] font-semibold text-slate-500">
                          {idx + 1}.
                        </span>
                        {opt}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCheck}
                className="rounded-full bg-sky-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-50"
                disabled={selectedIndex === null || answerState !== "idle"}
              >
                答え合わせ
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="rounded-full border border-slate-300 bg-white/70 px-4 py-1.5 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                disabled={answerState === "idle"}
              >
                {currentIndex === quizQuestions.length - 1
                  ? "結果を見る →"
                  : "次の問題 →"}
              </button>

              {answerState === "correct" && (
                <span className="text-xs font-medium text-emerald-700">
                  ✅ 正解！
                </span>
              )}

              {answerState === "wrong" && (
                <span className="text-xs font-medium text-rose-600">
                  ❌ ざんねん… 該当する学ぶページの項目を見直してみよう
                </span>
              )}
            </div>

            {(answerState === "correct" || answerState === "wrong") && (
              <div className="mt-4 rounded-xl bg-slate-50/80 p-3 text-xs text-slate-700">
                <p className="mb-1 font-semibold text-slate-800">ヒント</p>
                <p>{q.explanation}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
