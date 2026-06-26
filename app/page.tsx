"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const tools = [
  { title: "今すぐ落ち着く", desc: "深呼吸ガイド", href: "/breathe" },
  { title: "相談メモを作る", desc: "状況を整理する", href: "/form" },
  { title: "セルフチェック", desc: "心の反応を確認", href: "/check" },
  { title: "クイズ", desc: "理解を深める", href: "/quiz" },
  { title: "スキャン", desc: "次の行動を考える", href: "/scan" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("hasVisited") !== "true";
  });

  useEffect(() => {
    if (!isLoading) return;

    const randomTime = Math.floor(Math.random() * 1501) + 500;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("hasVisited", "true");
      setIsLoading(false);
    }, randomTime);

    return () => window.clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBFAF9]">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-100 border-t-blue-300" />
          <div className="space-y-2 text-center">
            <p className="animate-pulse text-[12px] font-bold uppercase tracking-[0.4em] text-slate-400">
              Kokoro no Mado
            </p>
            <p className="text-[10px] font-medium text-slate-300">扉をひらいています...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fade-in min-h-screen bg-[#FBFAF9] text-[#4A4A4A] antialiased">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#FBFAF9]/60 px-5 py-5 backdrop-blur-md sm:px-8 sm:py-8">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-orange-200 to-blue-200 shadow-inner" />
          <div className="flex flex-col">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500">Kokoro no Mado</span>
            <span className="text-[9px] font-medium tracking-wider text-slate-400">個人製作サイト</span>
          </div>
        </div>
        <div className="rounded-full border border-white bg-white/60 px-3 py-2 shadow-sm sm:px-5">
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-emerald-600 sm:text-[11px]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Privacy Protected
          </span>
        </div>
      </header>

      <section className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute left-[10%] top-[20%] -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] -z-10 h-96 w-96 rounded-full bg-orange-100/30 blur-[120px]" />

        <div className="max-w-3xl space-y-12">
          <h1 className="text-4xl font-bold leading-[1.3] tracking-tight text-slate-800 sm:text-6xl">こころのまど</h1>
          <div className="mx-auto h-[2px] w-12 rounded-full bg-slate-200" />
          <p className="mx-auto max-w-2xl px-4 text-lg font-medium leading-[2.4] text-slate-600 sm:text-xl">
            相談していいか分からなくても大丈夫です。<br className="hidden sm:block" />
            まずは自分を守るところから。<br />
            このサイトは、情報を一切保存しません。<br />
            入力内容はブラウザを閉じると消去されます。
          </p>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-3 text-slate-300">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Scroll</p>
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-24 px-6 pb-32">
        <section className="grid gap-8 sm:grid-cols-2">
          <Link href="/learn" className="group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-10 text-left shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] sm:p-14">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50/50 transition-transform duration-700 group-hover:scale-110" />
            <span className="text-[12px] font-bold uppercase italic tracking-[0.2em] text-blue-400">01 / Understand</span>
            <p className="mb-3 mt-6 text-3xl font-bold text-slate-800">学ぶ</p>
            <p className="text-base font-medium text-slate-400">自分を大切にするための知識</p>
          </Link>

          <Link href="/support" className="group relative overflow-hidden rounded-[3rem] border border-slate-100 bg-white p-10 text-left shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] sm:p-14">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-50/50 transition-transform duration-700 group-hover:scale-110" />
            <span className="text-[12px] font-bold uppercase italic tracking-[0.2em] text-emerald-400">02 / Connection</span>
            <p className="mb-3 mt-6 text-3xl font-bold text-slate-800">相談先を探したい</p>
            <p className="text-base font-medium text-slate-400">あなたに合う窓口をご案内</p>
          </Link>
        </section>

        <section className="border-y border-slate-100 py-10 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-rose-400">Quiet guide</p>
            <h2 className="mt-3 text-xl font-bold text-slate-800">少しだけ、気持ちを言葉にしたいとき</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">ブラウザの中だけで動く、無料のこころ整理ナビです。</p>
          </div>
          <Link href="/counselor" className="mt-5 inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-bold text-rose-600 shadow-sm transition hover:bg-rose-50 sm:mt-0">
            こころ整理ナビをひらく
          </Link>
        </section>

        <section className="space-y-10">
          <h2 className="flex items-center justify-center gap-6 text-center text-[12px] font-bold uppercase tracking-[0.5em] text-slate-300">
            <span className="h-px w-8 bg-slate-100" />
            Utility Tools
            <span className="h-px w-8 bg-slate-100" />
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((item) => (
              <Link key={item.title} href={item.href} className="group flex items-center justify-between rounded-[2rem] border border-transparent bg-white/60 p-8 shadow-sm transition-all hover:border-slate-100 hover:bg-white">
                <div className="flex items-center gap-8">
                  <div className="h-2 w-2 rounded-full bg-slate-200 transition-colors group-hover:bg-slate-800" />
                  <div>
                    <p className="text-lg font-bold text-slate-700 transition-colors group-hover:text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm font-medium text-slate-400">{item.desc}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="pr-2 text-2xl text-slate-200 transition-colors group-hover:text-slate-800">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-10">
          <h2 className="text-center text-[12px] font-bold uppercase tracking-[0.5em] text-slate-300">Official Helplines</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <a href="https://www.mhlw.go.jp/mamorouyokokoro/soudan/tel/" target="_blank" rel="noopener noreferrer" className="rounded-[2.5rem] border border-orange-100/50 bg-orange-50/30 p-10 shadow-sm transition-all hover:bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">MHLW / 厚生労働省 (外部サイト)</span>
              <p className="mt-3 text-xl font-bold text-slate-700">まもろうよ こころ</p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">電話やSNSでの相談窓口がまとめられています。</p>
            </a>
            <a href="https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm" target="_blank" rel="noopener noreferrer" className="rounded-[2.5rem] border border-blue-100/50 bg-blue-50/30 p-10 shadow-sm transition-all hover:bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">MEXT / 文部科学省 (外部サイト)</span>
              <p className="mt-3 text-xl font-bold text-slate-700">24時間子供SOSダイヤル</p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">夜間や休日も、いつでも相談できる窓口です。</p>
            </a>
          </div>
        </section>

        <section className="border-t border-slate-100 py-10 text-center">
          <h2 className="text-xl font-bold text-slate-800">「こころのまど」をより良くするために</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">感想や改善してほしいところを、匿名で送ることができます。</p>
          <a href="https://forms.gle/rRiWypp3ZfJoZWgj7" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md">
            フィードバックを送る
          </a>
        </section>

        <footer className="border-t border-slate-200 pt-16">
          <div className="mb-16 grid gap-12 sm:grid-cols-2">
            <div className="rounded-[3rem] bg-[#1e293b] p-10 text-white shadow-2xl sm:p-12">
              <p className="mb-6 text-[12px] font-bold uppercase tracking-[0.3em] text-blue-300/80">Emergency</p>
              <p className="mb-8 text-base font-medium leading-relaxed opacity-90">自分や周りの身に危険があるときは、迷わず以下の番号へ連絡してください。</p>
              <div className="grid gap-3 text-sm font-bold text-blue-100 sm:grid-cols-3">
                <a href="tel:110">110 警察</a>
                <a href="tel:119">119 消防・救急</a>
                <a href="tel:189">189 児童相談所</a>
              </div>
            </div>
            <div className="flex flex-col justify-center p-4 sm:p-10">
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500">Privacy &amp; Info</p>
              <p className="text-sm font-medium leading-relaxed text-slate-500 sm:text-base">本サイトは個人による製作・運営サイトです。入力した内容はブラウザを閉じると消去され、サーバー等に保存されることはありません。</p>
            </div>
          </div>
          <p className="pb-10 text-center text-[10px] font-bold uppercase tracking-[0.6em] text-slate-300">© Kokoro no Mado</p>
        </footer>
      </div>
    </main>
  );
}
