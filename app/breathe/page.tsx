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
    if (phase === "inhale") return "すって...";
    if (phase === "hold") return "とめて...";
    if (phase === "exhale") return "はいて...";
    if (phase === "done") return "おつかれさま";
    return "準備ができたら";
  };

  let circleTransform = "scale(0.9)";
  let circleTransition = "transform 0.6s ease-in-out";

  if (phase === "inhale") {
    circleTransform = "scale(1.6)";
    circleTransition = `transform ${inhale}s ease-out`;
  } else if (phase === "hold") {
    circleTransform = "scale(1.6)";
    circleTransition = "transform 0.4s ease-in-out";
  } else if (phase === "exhale") {
    circleTransform = "scale(0.9)";
    circleTransition = `transform ${exhale}s ease-in-out`;
  }

  // --- 追加：アニメーションの魔法 ---
  const fadeInStyle = `
    @keyframes pageFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-page-in {
      animation: pageFadeIn 1.5s ease-out forwards;
    }
  `;

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-600 antialiased overflow-hidden flex flex-col font-sans">
      {/* スタイルを直接差し込み */}
      <style>{fadeInStyle}</style>

      {/* 背景のふんわりした光 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-orange-50/30 rounded-full blur-[100px]" />
      </div>

      {/* ここから下のコンテンツ全体に .animate-page-in をつけました。
         これでページを開いた時にふわっと出てきます。
      */}
      <div className="relative z-10 flex flex-col min-h-screen animate-page-in">
        {/* ヘッダー */}
        <header className="px-6 py-6 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
            ← もどる
          </Link>
          <div className="px-3 py-1 rounded-full bg-white/40 backdrop-blur-md border border-white/60">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">深呼吸のページ</span>
          </div>
        </header>

        <section className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* 左：丁寧な説明 */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-800">🌿 4-7-8 呼吸法</h2>
                <div className="h-[2px] w-6 bg-slate-200 rounded-full" />
                <div className="text-sm leading-[1.8] text-slate-500 space-y-4">
                  <p className="whitespace-pre-wrap">
                    「ゆっくり吸って、長く吐く」リズムで落ち着きを取り戻す呼吸法です。
                    {"\n\n"}
                    4秒吸う → 7秒止める → 8秒吐く をゆっくり行うことで、
                    心拍が整い、筋肉のこわばりがゆるみ、不安・緊張・焦りがすっと下がりやすくなります。
                    {"\n\n"}
                    正確に合わせなくても大丈夫。
                    “ゆっくり深く、長く吐く” という流れに乗るだけで効果があります。
                  </p>
                  <ul className="space-y-2 text-xs opacity-80">
                    <li>・まずは 3回（約1分）試してみてください。</li>
                    <li>・肩やお腹の力を抜いて、リラックス。</li>
                    <li>・苦しくなったら、いつでもやめて大丈夫ですよ。</li>
                  </ul>
                </div>
              </div>
              
              {!running && phase !== "done" && (
                <button 
                  onClick={start}
                  className="px-8 py-3 rounded-full bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-sm font-bold text-slate-600"
                >
                  はじめる
                </button>
              )}
            </div>

            {/* 右：呼吸のガイド */}
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="relative flex h-64 w-64 items-center justify-center">
                <div 
                  className="absolute inset-4 bg-blue-100/40 rounded-full blur-2xl transition-all duration-1000"
                  style={{ transform: phase === "inhale" || phase === "hold" ? "scale(1.3)" : "scale(0.7)" }}
                />

                <div
                  className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white border border-white shadow-sm transition-all"
                  style={{
                    transform: circleTransform,
                    transition: circleTransition,
                  }}
                >
                  <span className="text-sm font-medium text-slate-400">
                    {getLabel()}
                  </span>
                </div>
              </div>

              {running && (
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-bold tracking-widest text-slate-300">
                    {cycle} / {cycles} CIRCLE
                  </p>
                  <div className="flex gap-1.5">
                    {[...Array(cycles)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 w-6 rounded-full transition-colors duration-500 ${i < cycle ? 'bg-blue-200' : 'bg-slate-100'}`} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {phase === "done" && (
                <div className="text-center space-y-4">
                  <p className="text-xs font-bold text-emerald-500">おつかれさまでした</p>
                  <button 
                    onClick={start}
                    className="text-xs font-bold text-slate-400 border-b border-slate-200 pb-1"
                  >
                    もういちど？
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <footer className="p-6 text-center">
          <p className="text-[10px] text-slate-300">
            正確に合わせなくても大丈夫です。
          </p>
        </footer>
      </div>
    </main>
  );
}