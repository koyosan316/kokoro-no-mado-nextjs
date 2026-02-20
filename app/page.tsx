import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcf9f7] text-slate-800 font-sans">
      {/* ヘッダー：清潔感と安心感 */}
      <header className="sticky top-0 z-10 border-b border-slate-200/60 bg-[#fcf9f7]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-sm">
                <span className="text-lg">☻</span>
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight">こころのまど</h1>
                <p className="hidden text-[10px] text-slate-500 sm:block">
                  こころを落ち着けるためのWebサイト（テスト版）
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium text-emerald-700 border border-emerald-100">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                プライバシー保護中
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* メインヒーロー：優しく包み込むようなエリア */}
        <section className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm sm:p-12">
          {/* 背景の装飾（リラックスさせる視覚効果） */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-50/50 blur-3xl text-sky-200" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-50/50 blur-3xl text-emerald-200" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
            <div className="space-y-6">
              
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                <br className="sm:hidden" />
                こころのまど
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                相談していいか分からなくても大丈夫です。まずは自分を守るところから。このサイトは、情報を一切保存しません。入力内容はだれも確認できませんので安心してご使用ください。
              </p>
            </div>

            <div className="grid gap-4">
              <Link
                href="/learn"
                className="group flex items-center gap-4 rounded-2xl border border-sky-100 bg-sky-50/50 p-5 transition-all hover:bg-sky-50 hover:shadow-md active:scale-[0.98]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm transition-transform group-hover:scale-110">
                  📖
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sky-900 leading-none">学ぶ</p>
                  <p className="mt-1.5 text-xs text-sky-700/70">自分を大切にするヒント</p>
                </div>
                <span className="text-sky-300 transition-transform group-hover:translate-x-1">›</span>
              </Link>

              <Link
                href="/support"
                className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 transition-all hover:bg-emerald-50 hover:shadow-md active:scale-[0.98]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm transition-transform group-hover:scale-110">
                  🔍
                </div>
                <div className="flex-1">
                  <p className="font-bold text-emerald-900 leading-none">相談先を探したい</p>
                  <p className="mt-1.5 text-xs text-emerald-700/70">あなたに合う窓口をご案内</p>
                </div>
                <span className="text-emerald-300 transition-transform group-hover:translate-x-1">›</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ツールセクション */}
        <section className="mt-16">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">このページでできること</h3>
              <p className="mt-1 text-sm text-slate-500">あなたのペースで使ってください</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "今すぐ落ち着く", desc: "深呼吸ガイド", href: "/breathe", icon: "🧘" },
              { title: "相談メモを作る", desc: "状況を整理する", href: "/form", icon: "📝" },
              { title: "セルフチェック", desc: "心の反応を確認", href: "/check", icon: "📋" },
              { title: "クイズ", desc: "理解を深める", href: "/quiz", icon: "💡" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm active:bg-slate-50"
              >
                <div className="mb-4 text-2xl group-hover:animate-bounce">{item.icon}</div>
                <p className="font-bold text-slate-800">{item.title}</p>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 外部相談リンク */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all hover:bg-slate-50"
          >
            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
              🏛 文科省 いじめ相談
            </span>
            <span className="text-slate-400">↗</span>
          </a>
          <a
            href="https://www.mhlw.go.jp/mamorouyokokoro/soudan/tel/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all hover:bg-slate-50"
          >
            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
              ☎ よりそいホットライン
            </span>
            <span className="text-slate-400">↗</span>
          </a>
        </div>
      </div>

      {/* フッター：緊急情報を整理 */}
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <p className="font-bold text-slate-800">こころのまど</p>
              <p className="text-xs leading-relaxed text-slate-500">
                このサイトは、つらい思いを抱えている方が相談への第一歩を踏み出せるように作られた案内サイトです。
              </p>
            </div>
            
            <div className="rounded-2xl bg-amber-50 p-6 border border-amber-100">
              <p className="flex items-center gap-2 text-sm font-bold text-amber-900">
                ⚠️ 緊急のとき
              </p>
              <p className="mt-3 text-xs leading-relaxed text-amber-800/80">
                自分や周りの人の身に危険があるときは、迷わず以下の番号へ連絡してください。
              </p>
              <p className="mt-4 flex flex-wrap gap-2 font-mono text-sm font-bold text-amber-700">
                <span>110</span> <span>119</span> <span>189</span> <span>#9110</span>
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-500">
              <p className="font-bold text-slate-800">プライバシーについて</p>
              <p>
                入力データはブラウザを閉じると消去されます。サーバーへ送信されることはありません。
              </p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-slate-100 pt-8 text-center text-[10px] text-slate-400">
            © Kokoro no Mado / Prototype
          </div>
        </div>
      </footer>
    </main>
  );
}