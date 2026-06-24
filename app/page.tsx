"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  HeartPulse,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const mainCards = [
  {
    title: "こころ整理ナビ",
    desc: "ほんわか敬語で気持ちを整理し、合いそうな相談先を案内します。",
    href: "/counselor",
    icon: MessageCircle,
    accent: "text-rose-500 bg-rose-50",
  },
  {
    title: "相談窓口を探す",
    desc: "悩みや相談方法に合わせて、公的な窓口やチャット相談を探せます。",
    href: "/support",
    icon: Search,
    accent: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "相談メモを作る",
    desc: "誰かに伝える前に、状況や気持ちを短くまとめられます。",
    href: "/form",
    icon: ClipboardList,
    accent: "text-blue-600 bg-blue-50",
  },
];

const toolCards = [
  { title: "今すぐ落ち着く", desc: "深呼吸ガイド", href: "/breathe", icon: HeartPulse },
  { title: "セルフチェック", desc: "心の反応を確認", href: "/check", icon: ShieldCheck },
  { title: "学ぶ", desc: "自分を守る知識", href: "/learn", icon: BookOpen },
  { title: "クイズ", desc: "理解を深める", href: "/quiz", icon: Sparkles },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("hasVisited") !== "true";
  });

  useEffect(() => {
    if (!isLoading) return;

    const randomTime = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;
    const timer = setTimeout(() => {
      sessionStorage.setItem("hasVisited", "true");
      setIsLoading(false);
    }, randomTime);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBFAF9]">
        <div className="relative flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-100 border-t-blue-300" />
          <div className="space-y-2 text-center">
            <p className="animate-pulse text-[12px] font-bold uppercase tracking-[0.4em] text-slate-400">
              Kokoro no Mado
            </p>
            <p className="text-[10px] font-medium text-slate-300">窓をひらいています...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-800 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-[#FBFAF9]/90 px-5 py-4 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-blue-100 shadow-inner" />
            <div className="flex flex-col">
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-600">
                Kokoro no Mado
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400">
                こころのまど
              </span>
            </div>
          </Link>
          <div className="hidden items-center gap-2 rounded-lg bg-white px-4 py-2 text-[11px] font-bold text-emerald-700 shadow-sm sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            入力内容は保存しません
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-20">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-[12px] font-black uppercase tracking-[0.35em] text-blue-300">
              Free local guide
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
              こころのまど
            </h1>
            <p className="max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              相談していいかわからないときも、まずは気持ちを少しだけ置ける場所です。
              こころ整理ナビは外部AIに送らず、ブラウザの中だけで言葉を見ながら案内します。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {mainCards.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-lg border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg ${item.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-black text-slate-800">{item.title}</h2>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-slate-500">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-rose-300">
            Emergency
          </p>
          <h2 className="mt-3 text-xl font-black text-slate-900">危険が近いとき</h2>
          <p className="mt-4 text-sm font-bold leading-relaxed text-slate-500">
            自分や誰かの命・身体に危険があるときは、このサイトより先に人につながってください。
          </p>
          <div className="mt-6 grid gap-3">
            {[
              { number: "110", label: "警察" },
              { number: "119", label: "救急・消防" },
              { number: "189", label: "児童相談所" },
            ].map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-black text-slate-700"
              >
                <span className="inline-flex items-center gap-3">
                  <Phone className="h-4 w-4 text-rose-500" />
                  {item.label}
                </span>
                <span className="font-mono text-lg">{item.number}</span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[12px] font-black uppercase tracking-[0.35em] text-slate-300">
            Tools
          </h2>
          <div className="h-px flex-1 bg-slate-100" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-5 shadow-sm transition hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
          <h2 className="text-lg font-black text-slate-800">このサイトについて</h2>
          <p className="mt-3 text-sm font-bold leading-relaxed text-slate-500">
            こころ整理ナビは診断や治療ではありません。入力した内容はページを閉じると消え、サーバーには保存しません。
            相談先の情報は変わることがあるため、利用前に公式サイトも確認してください。
          </p>
        </div>
      </section>

      <Link
        href="/counselor"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-4 text-xs font-black text-white shadow-2xl shadow-slate-300/50 transition-all hover:bg-black active:scale-95"
      >
        <MessageCircle className="h-4 w-4" />
        こころ整理ナビ
      </Link>
    </main>
  );
}
