"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Role = "victim" | "watcher" | "unsure" | "maybeHurt";
type Severity = "low" | "mid" | "high" | "veryHigh";
type Talk = "canTalk" | "hardToTalk";
type Need = "calm" | "organize" | "support" | "learn";

type Answers = {
  role: Role | "";
  severity: Severity | "";
  talk: Talk | "";
  need: Need | "";
};

type Option<T extends string> = {
  value: T;
  label: string;
  sub?: string;
};

type AdviceResult = {
  summary: string[];
  firstStep: string[];
  dontPush: string[];
};

const roleOptions: Option<Role>[] = [
  {
    value: "victim",
    label: "つらいことを受けている",
    sub: "自分が傷ついたり、しんどい思いをしている",
  },
  {
    value: "watcher",
    label: "見ていて苦しい",
    sub: "誰かのことが気になるけど、どうすればいいか迷う",
  },
  {
    value: "unsure",
    label: "どう動けばいいか分からない",
    sub: "何が正解か分からず、立ち止まっている",
  },
  {
    value: "maybeHurt",
    label: "誰かを傷つけてしまったかもしれない",
    sub: "自分の言動が気になっている",
  },
];

const severityOptions: Option<Severity>[] = [
  { value: "low", label: "少し気になる", sub: "まだ整理できそう" },
  { value: "mid", label: "しんどさがある", sub: "少し抱え込み始めている" },
  { value: "high", label: "かなりつらい", sub: "無理をしすぎているかもしれない" },
  { value: "veryHigh", label: "限界に近い", sub: "今すぐ落ち着くことが大事そう" },
];

const talkOptions: Option<Talk>[] = [
  { value: "canTalk", label: "話せそう", sub: "少しなら言葉にできそう" },
  { value: "hardToTalk", label: "まだ話しにくい", sub: "今は言葉にするのがむずかしい" },
];

const needOptions: Option<Need>[] = [
  { value: "calm", label: "気持ちを落ち着けたい", sub: "まずは少し楽になりたい" },
  { value: "organize", label: "状況を整理したい", sub: "何がつらいのか見えやすくしたい" },
  { value: "support", label: "誰かに相談したい", sub: "一人で抱えず、助けにつながりたい" },
  { value: "learn", label: "まず知りたい", sub: "考え方や見方を知ってから進みたい" },
];

const roleMessages: Record<Role, string> = {
  victim: "つらいと感じていること自体が、大切なサインです。",
  watcher: "見ていて苦しいと感じるのは、自然なことです。",
  unsure: "どう動けばいいか迷うのは、おかしいことではありません。",
  maybeHurt: "立ち止まって考えようとしていること自体が、大切です。",
};

const severityMessages: Record<Severity, string> = {
  low: "今のうちに少し整理しておくと、あとで楽になることがあります。",
  mid: "一人で抱え込みすぎないようにすることが大切そうです。",
  high: "今は無理に頑張るより、自分を守ることを優先して大丈夫です。",
  veryHigh:
    "今はかなりしんどい状態かもしれません。まずは落ち着くことを優先してください。",
};

const needMessages: Record<Need, string> = {
  calm: "今は、気持ちを落ち着けることから始めるのがよさそうです。",
  organize: "今は、起きていることを整理するのが役に立ちそうです。",
  support: "今は、一人で抱えず、相談先につながることが大切そうです。",
  learn: "今は、見方や考え方を知ることが助けになるかもしれません。",
};

const firstStepBase: Record<Role, string> = {
  victim:
    "まずは、自分がつらいと感じていることを軽く扱わないことが大切です。",
  watcher:
    "まずは、見ていて苦しいと感じている自分の反応を、そのまま大事にして大丈夫です。",
  unsure:
    "まずは、すぐに正解を出そうとせず、迷っている状態のまま整理していくことから始めて大丈夫です。",
  maybeHurt:
    "まずは、自分を全部否定するのではなく、立ち止まって振り返ろうとしていることを大切にしてください。",
};

const firstStepBySeverity: Record<Severity, string> = {
  low: "今のうちに少し言葉にしておくと、あとで状況を整理しやすくなることがあります。",
  mid: "しんどさが続いているなら、無理に一人で抱え込まず、少しずつ外に出していくことが役立つかもしれません。",
  high: "今は頑張って全部整理しきろうとするより、少しでも負担を減らす動きを優先して大丈夫です。",
  veryHigh: "今は深く考え込みすぎるより、まず落ち着ける行動をひとつ選ぶことが大切そうです。",
};

const firstStepByTalk: Record<Talk, string> = {
  canTalk:
    "話せそうな相手がいるなら、全部をきれいに説明しようとせず、短くてもいいので一言だけ伝えてみるのがおすすめです。",
  hardToTalk:
    "まだ話しにくいなら、すぐに相談しようとしなくて大丈夫です。まずはメモにしたり、気持ちを整理するだけでも十分意味があります。",
};

const firstStepByNeed: Record<Need, string> = {
  calm: "今のあなたには、まず気持ちを落ち着ける時間をつくることが合っていそうです。",
  organize: "今のあなたには、起きていることを順番に整理してみるのが合っていそうです。",
  support:
    "今のあなたには、一人で抱えず、相談先や信頼できる人につながる準備をするのが合っていそうです。",
  learn:
    "今のあなたには、まず見方や考え方を知ってから進むのが合っていそうです。",
};

const roleDontPush: Record<Role, string> = {
  victim: "「これくらい我慢しないと」と無理に自分を納得させなくて大丈夫です。",
  watcher: "一人で全部なんとかしようとしなくて大丈夫です。",
  unsure: "すぐに正解を出そうとしなくて大丈夫です。",
  maybeHurt: "一回で完璧に言葉にしようとしなくて大丈夫です。",
};

const severityDontPush: Record<Severity, string> = {
  low: "今すぐ結論を出さなくても大丈夫です。",
  mid: "一人で全部整理しきろうとしなくて大丈夫です。",
  high: "無理に普段どおり振る舞わなくても大丈夫です。",
  veryHigh: "今は頑張って考え続けなくても大丈夫です。",
};

function getNextLink(need: Need) {
  switch (need) {
    case "calm":
      return { href: "/breathe", label: "深呼吸ページを見る" };
    case "organize":
      return { href: "/form", label: "相談メモを作る" };
    case "support":
      return { href: "/support", label: "相談先を探す" };
    case "learn":
      return { href: "/learn", label: "学ぶページを見る" };
    default:
      return { href: "/", label: "ホームに戻る" };
  }
}

function scrollTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function buildAdvice(
  role: Role,
  severity: Severity,
  talk: Talk,
  need: Need
): AdviceResult {
  return {
    summary: [
      roleMessages[role],
      severityMessages[severity],
      needMessages[need],
    ],
    firstStep: [
      firstStepBase[role],
      firstStepBySeverity[severity],
      firstStepByTalk[talk],
      firstStepByNeed[need],
    ],
    dontPush: [roleDontPush[role], severityDontPush[severity]],
  };
}

function StepBadge({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
      <span>Step</span>
      <span className="text-slate-600">
        {current}/{total}
      </span>
    </div>
  );
}

type QuestionBlockProps<T extends string> = {
  title: string;
  desc: string;
  options: Option<T>[];
  selected: T | "";
  onSelect: (value: T) => void;
};

function QuestionBlock<T extends string>({
  title,
  desc,
  options,
  selected,
  onSelect,
}: QuestionBlockProps<T>) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{desc}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-[1.5rem] border p-5 text-left transition ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="block text-base font-semibold text-slate-900">
                {option.label}
              </span>
              {option.sub && (
                <span className="mt-2 block text-sm leading-6 text-slate-500">
                  {option.sub}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ScanPage() {
  const totalSteps = 5;

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    role: "",
    severity: "",
    talk: "",
    need: "",
  });

  const canGoNext =
    (step === 1 && answers.role) ||
    (step === 2 && answers.severity) ||
    (step === 3 && answers.talk) ||
    (step === 4 && answers.need);

  const result = useMemo(() => {
    if (!answers.role || !answers.severity || !answers.talk || !answers.need) {
      return null;
    }

    return buildAdvice(
      answers.role,
      answers.severity,
      answers.talk,
      answers.need
    );
  }, [answers]);

  const nextLink = useMemo(() => {
    if (!answers.need) return null;
    return getNextLink(answers.need);
  }, [answers.need]);

  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps && canGoNext) {
      setStep((prev) => prev + 1);
      scrollTop();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      scrollTop();
    }
  };

  const reset = () => {
    setAnswers({
      role: "",
      severity: "",
      talk: "",
      need: "",
    });
    setStep(1);
    scrollTop();
  };

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-600 antialiased">
      <header className="flex items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-xs font-bold text-slate-400 transition-colors hover:text-slate-600"
        >
          ← もどる
        </Link>

        <div className="rounded-full border border-white/60 bg-white/40 px-3 py-1 backdrop-blur-md">
          <span className="text-[10px] font-bold tracking-wider text-slate-400">
            状況スキャン
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold text-indigo-600">SCAN</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            状況スキャン
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            今の状況や気持ちを整理して、次の一歩を考えるためのページです。
            正確じゃなくても大丈夫です。いちばん近いものを選んでください。
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <StepBadge current={step} total={totalSteps} />
          <span className="text-sm text-slate-400">
            ゆっくり進めて大丈夫です
          </span>
        </div>

        <div className="mb-8 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <QuestionBlock<Role>
              title="今の状況に近いものを選んでください"
              desc="正確に決めなくて大丈夫です。いちばん近いものを選べば大丈夫です。"
              options={roleOptions}
              selected={answers.role}
              onSelect={(value) =>
                setAnswers((prev) => ({ ...prev, role: value }))
              }
            />
          )}

          {step === 2 && (
            <QuestionBlock<Severity>
              title="今のしんどさに近いものを選んでください"
              desc="今の気持ちに近いものを選んでください。途中で変えても大丈夫です。"
              options={severityOptions}
              selected={answers.severity}
              onSelect={(value) =>
                setAnswers((prev) => ({ ...prev, severity: value }))
              }
            />
          )}

          {step === 3 && (
            <QuestionBlock<Talk>
              title="今、誰かに話せそうですか？"
              desc="すぐに話せなくても大丈夫です。今の気持ちに近い方を選んでください。"
              options={talkOptions}
              selected={answers.talk}
              onSelect={(value) =>
                setAnswers((prev) => ({ ...prev, talk: value }))
              }
            />
          )}

          {step === 4 && (
            <QuestionBlock<Need>
              title="今、いちばん近い気持ちはどれですか？"
              desc="このあと、まず何をしたいかに近いものを選んでください。"
              options={needOptions}
              selected={answers.need}
              onSelect={(value) =>
                setAnswers((prev) => ({ ...prev, need: value }))
              }
            />
          )}

          {step === 5 && result && nextLink && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-indigo-600">RESULT</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  整理した結果
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  今の答えをもとに、次の一歩を考えやすい形にまとめました。
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-indigo-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  今の状態について
                </h3>
                <div className="mt-3 space-y-3">
                  {result.summary.map((text, index) => (
                    <p key={index} className="leading-7 text-slate-700">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  最初にしていいこと
                </h3>
                <div className="mt-3 space-y-3">
                  {result.firstStep.map((text, index) => (
                    <p key={index} className="leading-7 text-slate-700">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  無理にしなくていいこと
                </h3>
                <div className="mt-3 space-y-3">
                  {result.dontPush.map((text, index) => (
                    <p key={index} className="leading-7 text-slate-600">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  次に進むなら
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  今のあなたには、まずこのページが使いやすそうです。
                </p>

                <div className="mt-5 space-y-3">
                  <Link
                    href={nextLink.href}
                    className="block w-full rounded-2xl bg-slate-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                  >
                    {nextLink.label}
                  </Link>

                  <button
                    type="button"
                    onClick={reset}
                    className="block w-full rounded-2xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    もう一度やる
                  </button>
                </div>
              </div>
            </div>
          )}

          {step < totalSteps && (
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                戻る
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!canGoNext}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                次へ
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}