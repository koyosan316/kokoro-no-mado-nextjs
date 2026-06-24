"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("hasVisited") !== "true";
  });

  useEffect(() => {
    if (!isLoading) return;

    // 💡 ブラウザのセッションに「訪問済み」の記録があるか確認
    const randomTime = Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
    const timer = setTimeout(() => {
      sessionStorage.setItem("hasVisited", "true"); // 訪問済みを記録
      setIsLoading(false);
    }, randomTime);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // ⏳ 1. 初回のみ表示される読み込み画面
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBFAF9]">
        <div className="relative flex flex-col items-center gap-6">
          {/* シンプルで清潔感のあるローディングアニメーション */}
          <div className="h-12 w-12 rounded-full border-2 border-slate-100 border-t-blue-300 animate-spin" />
          <div className="text-center space-y-2">
            <p className="text-[12px] font-bold text-slate-400 tracking-[0.4em] uppercase animate-pulse">
              Kokoro no Mado
            </p>
            <p className="text-[10px] text-slate-300 font-medium">扉をひらいています...</p>
          </div>
        </div>
      </main>
    );
  }

  // ✅ 2. メインホーム画面（あなたのデザイン完全版）
  return (
    <main className="min-h-screen bg-[#FBFAF9] text-[#4A4A4A] antialiased animate-in fade-in duration-700">
      
      {/* --- ヘッダー --- */}
      <header className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center bg-[#FBFAF9]/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-orange-200 to-blue-200 shadow-inner" />
          <div className="flex flex-col">
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-slate-500">Kokoro no Mado</span>
            <span className="text-[9px] text-slate-400 font-medium tracking-wider">個人製作サイト</span>
          </div>
        </div>
        <div className="px-5 py-2 rounded-full bg-white/60 border border-white shadow-sm">
          <span className="text-[11px] font-bold text-emerald-600 tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Privacy Protected
          </span>
        </div>
      </header>

      {/* --- ヒーローセクション --- */}
      <section className="relative flex min-h-[95vh] flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-orange-100/30 rounded-full blur-[120px] -z-10" />

        <div className="max-w-3xl space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-slate-800 leading-[1.3]">
              こころのまど
            </h2>
          </div>
          <div className="h-[2px] w-12 bg-slate-200 mx-auto rounded-full" />
          <p className="max-w-2xl mx-auto text-slate-600 leading-[2.4] text-lg sm:text-xl font-medium px-4">
            相談していいか分からなくても大丈夫です。<br className="hidden sm:block" />
            まずは自分を守るところから。<br />
            相談メモや検索内容はサイト側で保存しません。<br />
            AI相談では回答生成のため入力内容がAPIへ送られます。
          </p>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-3 text-slate-300">
          <p className="text-[10px] tracking-widest uppercase font-bold opacity-60">Scroll</p>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        </div>
      </section>

      {/* --- メインコンテンツ --- */}
      <div className="mx-auto max-w-5xl px-6 pb-32 space-y-24">
        
        {/* メインの入り口：2つの大きな扉 */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/counselor" className="group relative p-10 sm:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50/70 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <span className="text-[12px] font-bold text-rose-400 tracking-[0.2em] uppercase italic">00 / Talk</span>
            <p className="text-3xl font-bold text-slate-800 mt-6 mb-3">AIに相談する</p>
            <p className="text-base text-slate-400 leading-relaxed font-medium">気持ちを整理し、窓口も探す</p>
          </Link>

          <Link href="/learn" className="group relative p-10 sm:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <span className="text-[12px] font-bold text-blue-400 tracking-[0.2em] uppercase italic">01 / Understand</span>
            <p className="text-3xl font-bold text-slate-800 mt-6 mb-3">学ぶ</p>
            <p className="text-base text-slate-400 leading-relaxed font-medium">自分を大切にするための知識</p>
          </Link>

          <Link href="/support" className="group relative p-10 sm:p-14 rounded-[3rem] bg-white border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
            <span className="text-[12px] font-bold text-emerald-400 tracking-[0.2em] uppercase italic">02 / Connection</span>
            <p className="text-3xl font-bold text-slate-800 mt-6 mb-3">相談先を探したい</p>
            <p className="text-base text-slate-400 leading-relaxed font-medium">あなたに合う窓口をご案内</p>
          </Link>
        </div>

       {/* サブメニュー（Utility Tools） */}
<section className="space-y-10">
  <h4 className="text-[12px] font-bold text-slate-300 tracking-[0.5em] uppercase text-center flex items-center justify-center gap-6">
    <div className="h-px w-8 bg-slate-100" />
    Utility Tools
    <div className="h-px w-8 bg-slate-100" />
  </h4>

  <div className="grid gap-6 sm:grid-cols-2">
    {[
      { title: "今すぐ落ち着く", desc: "深呼吸ガイド", href: "/breathe" },
      { title: "相談メモを作る", desc: "状況を整理する", href: "/form" },
      { title: "セルフチェック", desc: "心の反応を確認", href: "/check" },
      { title: "クイズ", desc: "理解を深める", href: "/quiz" },
      { title: "スキャン", desc: "次の行動を考える", href: "/scan" },
    ].map((item) => (
      <Link
        key={item.title}
        href={item.href}
        className="group flex items-center justify-between p-8 rounded-[2rem] bg-white/60 hover:bg-white border border-transparent hover:border-slate-100 transition-all shadow-sm"
      >
        <div className="flex items-center gap-8">
          <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-slate-800 transition-colors" />
          <div>
            <p className="text-lg font-bold text-slate-700 group-hover:text-slate-900">
              {item.title}
            </p>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              {item.desc}
            </p>
          </div>
        </div>
        <span className="text-2xl text-slate-200 group-hover:text-slate-800 transition-colors pr-2">
          ❯
        </span>
      </Link>
    ))}
  </div>
</section>

        {/* 外部相談窓口 */}
        <section className="space-y-10">
          <h4 className="text-[12px] font-bold text-slate-300 tracking-[0.5em] uppercase text-center">Official Helplines</h4>
          <div className="grid gap-8 sm:grid-cols-2">
            <a href="https://www.mhlw.go.jp/mamorouyokokoro/soudan/tel/" target="_blank" rel="noopener noreferrer" className="group relative p-10 rounded-[2.5rem] bg-orange-50/30 border border-orange-100/50 hover:bg-white transition-all shadow-sm">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-orange-400 tracking-wider uppercase">MHLW / 厚生労働省 (外部サイト ↗)</span>
                <p className="text-xl font-bold text-slate-700">まもろうよ こころ</p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">電話やSNSでの相談窓口がまとめられています。</p>
              </div>
            </a>

            <a href="https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm" target="_blank" rel="noopener noreferrer" className="group relative p-10 rounded-[2.5rem] bg-blue-50/30 border border-blue-100/50 hover:bg-white transition-all shadow-sm">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">MEXT / 文部科学省 (外部サイト ↗)</span>
                <p className="text-xl font-bold text-slate-700">24時間子供SOSダイヤル</p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">夜間や休日も、いつでも相談できる窓口です。</p>
              </div>
            </a>
          </div>
        </section>
{/* --- フィードバックセクション --- */}
<section className="mt-20 py-10 border-t border-slate-100">
  <div className="max-w-2xl mx-auto text-center space-y-6">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-slate-800">「こころのまど」をより良くするために</h3>
    <p className="text-sm text-slate-500 leading-relaxed px-4">
      このサイトを使ってみての感想や、改善してほしいところなど、<br className="hidden sm:block" />
      あなたの声を聞かせてください。匿名で送ることができます。
    </p>
    <a 
      href="https://forms.gle/rRiWypp3ZfJoZWgj7" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-10 py-4 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-sm shadow-sm hover:shadow-md hover:bg-slate-50 transition-all active:scale-95"
    >
      フィードバックを送る
    </a>
  </div>
</section>
        <Link
          href="/counselor"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-4 text-xs font-black text-white shadow-2xl shadow-slate-300/50 transition-all hover:bg-black active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          AI相談
        </Link>
        {/* --- フッター --- */}
        <footer className="pt-24 border-t border-slate-200">
          <div className="grid gap-12 sm:grid-cols-2 mb-20">
            <div className="bg-[#1e293b] rounded-[3rem] p-12 text-white shadow-2xl">
              <p className="text-[12px] font-bold tracking-[0.3em] text-blue-300/80 uppercase mb-6">Emergency</p>
              <p className="text-base leading-relaxed font-medium opacity-90 mb-8">自分や周りの身に危険があるときは、迷わず以下の番号へおかけください。</p>
              <div className="flex gap-8 font-mono text-3xl font-bold text-blue-100">
                <span>110
                  警察本部
                </span>
                <span>119
                  消防指令センター
                </span>
                <span>189
                  虐待対応ダイヤル
                </span>
              </div>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <p className="text-[12px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-4">Privacy & Info</p>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
                本サイトは個人による製作・運営サイトです。入力データはブラウザを閉じると自動的に消去され、サーバー等に保存されることはありません。
              </p>
            </div>
          </div>
          <p className="text-center text-[10px] font-bold tracking-[0.6em] text-slate-300 uppercase pb-10">
            © Kokoro no Mado
          </p>
        </footer>
      </div>
    </main>
    
  );
  
}
