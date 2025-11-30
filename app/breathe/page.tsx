// app/breathe/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "done";

export default function Breathe478Page() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);

  const inhale = 4;
  const hold = 7;
  const exhale = 8;
  const cycles = 3;

  const start = () => {
    setRunning(true);
    setCycle(1);
    setPhase("inhale");
  };

  useEffect(() => {
    if (!running) return;

    let timer: NodeJS.Timeout;

    if (phase === "inhale") {
      timer = setTimeout(() => setPhase("hold"), inhale * 1000);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("exhale"), hold * 1000);
    } else if (phase === "exhale") {
      timer = setTimeout(() => {
        if (cycle >= cycles) {
          setPhase("done");
          setRunning(false);
        } else {
          setCycle((c) => c + 1);
          setPhase("inhale");
        }
      }, exhale * 1000);
    }

    return () => clearTimeout(timer);
  }, [phase, running, cycle]);

  const getLabel = () => {
    if (phase === "inhale") return `吸って（${inhale}秒）`;
    if (phase === "hold") return `止めて（${hold}秒）`;
    if (phase === "exhale") return `吐いて（${exhale}秒）`;
    if (phase === "done") return "完了しました";
    return "準備OK";
  };

 // 丸のスケール（5：1 に変更）
let circleTransform = "scale(0.8)";
let circleTransition = "transform 0.3s ease-in-out";

if (phase === "inhale") {
  circleTransform = "scale(1.8)";        // 最大
  circleTransition = `transform ${inhale}s ease-in-out`;
} else if (phase === "hold") {
  circleTransform = "scale(1.8)";        // 保持
  circleTransition = "transform 0.3s ease-in-out";
} else if (phase === "exhale") {
  circleTransform = "scale(0.8)";        // 最小
  circleTransition = `transform ${exhale}s ease-in-out`;
} else if (phase === "done") {
  circleTransform = "scale(1.2)";
  circleTransition = "transform 0.5s ease-out";
}


  // 外側の光
  let outerScale = 1.3;
  let outerOpacity = 0.45;

  if (phase === "inhale") {
    outerScale = 1.45;
    outerOpacity = 0.7;
  } else if (phase === "hold") {
    outerScale = 1.5;
    outerOpacity = 0.75;
  } else if (phase === "exhale") {
    outerScale = 1.2;
    outerOpacity = 0.4;
  } else if (phase === "done") {
    outerScale = 1.6;
    outerOpacity = 0.8;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* 背景 */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-sky-100/80 via-slate-50 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-6 md:py-10 fade-in">
        {/* ヘッダー */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            ← ホームにもどる
          </Link>
          <p className="text-xs font-medium text-slate-400">4-7-8 呼吸法</p>
        </header>

        {/* メイン：左説明 / 右アニメ */}
        <section className="flex flex-1 flex-col gap-8 py-4 md:flex-row md:items-center">
          {/* 左：説明 */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100">
                呼吸のペースを整えるモード
              </p>
              <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
                🌿 4-7-8 呼吸法とは？
              </h1>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p>
                4-7-8呼吸法は、アメリカの医師 アンドルー・ワイル（Andrew Weil） が広めた
「ゆっくり吸って、長く吐く」リズムで落ち着きを取り戻す呼吸法です。

4秒吸う → 7秒止める → 8秒吐く をゆっくり行うことで、
心拍が整い、筋肉のこわばりがゆるみ、
不安・緊張・焦りがすっと下がりやすくなります。

正確に合わせなくても大丈夫。
“ゆっくり深く、長く吐く” という流れに乗るだけで効果があります。
              </p>
              <ul className="list-disc space-y-1 pl-4 text-xs text-slate-600">
                <li>まずは 3 サイクル（約1分）を目安に試してみてください。</li>
                <li>息を止めている間に、肩やお腹に余分な力が入っていないかだけ軽く意識します。</li>
                <li>しんどくなったら、途中で中止してかまいません。</li>
              </ul>
            </div>
          </div>

          {/* 右：丸アニメ */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="relative flex h-64 w-64 items-center justify-center">
              {/* 外側の光 */}
              <div
                className="absolute h-56 w-56 rounded-full bg-sky-200/60 blur-2xl"
                style={{
                  transform: `scale(${outerScale})`,
                  opacity: outerOpacity,
                  transition: "transform 1.5s ease-out, opacity 1.5s ease-out",
                }}
              />

              {/* 終了リング */}
              {phase === "done" && (
                <div className="absolute h-60 w-60 rounded-full border-2 border-emerald-300/80 animate-ping" />
              )}

              {/* 本体 */}
              <div
                className="flex h-40 w-40 items-center justify-center rounded-full bg-sky-400/80 shadow-xl"
                style={{
                  transform: circleTransform,
                  transition: circleTransition,
                }}
              >
                <span className="text-sm font-semibold text-white">
                  {getLabel()}
                </span>
              </div>
            </div>

            {(phase === "idle" || phase === "done") && (
              <button
                onClick={start}
                className="rounded-xl bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400"
              >
                {phase === "done" ? "▶ もう一度やる" : "▶ スタート"}
              </button>
            )}

            {running && (
              <p className="text-sm text-slate-700">
                {cycle} / {cycles} サイクル目
              </p>
            )}

            {phase === "done" && (
              <p className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 text-center">
                3サイクル完了しました。おつかれさまです。
              </p>
            )}
          </div>
        </section>

        <p className="mt-2 text-[11px] text-slate-500">
          息苦しさ・めまい・気分の悪さが出たら、無理せずすぐに中止して休んでください。
        </p>
      </div>
    </main>
  );
}
