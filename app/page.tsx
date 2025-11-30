// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
   <main className="relative min-h-screen overflow-hidden bg-[#fbf6f3] text-slate-900">

  {/* 上のふわっと光（ピンクベージュ） */}
  <div
    className="pointer-events-none absolute inset-x-0 -top-40 h-72
               bg-gradient-to-b from-[#ffeef3] via-[#fde8e6] to-transparent blur-3xl"
  />

  {/* 右上の光（昔の emerald → ピンクベージュに統一） */}
  <div
    className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full
               bg-[#ffe3ec]/70 blur-3xl"
  />

  {/* 左下の光（昔の sky → ピンクベージュの支え色に統一） */}
  <div
    className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full
               bg-[#f9e3da]/60 blur-3xl"
  />

      {/* コンテンツ */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 md:gap-10 md:py-10 fade-in">
        {/* シンプルなヘッダー */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 text-lg">
              <span className="text-white">💬</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Kokoro no Mado
              </p>
              <p className="text-sm font-semibold text-slate-800">こころのまど</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700 ring-1 ring-amber-200">
              テスト公開中
            </span>
            <span className="hidden text-slate-400 sm:inline">
              ※ 個人情報は入力しないでください
            </span>
          </div>
        </header>

        {/* メイン2カラムレイアウト */}
        <div className="flex flex-1 flex-col gap-10 md:flex-row md:items-center">
          {/* 左側：タイトル / 説明 */}
          <section className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              学習用MVP・匿名で使える案内板
            </span>

            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                こころのまど<br className="hidden sm:block" />
              </h1>
              <p className="text-sm font-medium text-sky-700 sm:text-base">
                安心して立ち寄れる相談窓口を目指して
              </p>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
              ここは、
              <span className="font-semibold">
                「いま感じていること」を整理したり、助けを探すためのスタート地点
              </span>
              です。
              つらさの大きさに関係なく、ひとまず立ち寄って大丈夫な場所をめざしています。
            </p>

            {/* 3ステップ案内 */}
            <div className="grid gap-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg font-semibold text-sky-500">①</span>
                <p>
                  呼吸をととのえて、少しだけ心と体を落ち着かせる
                  <span className="text-slate-400">（深呼吸モード）</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg font-semibold text-sky-500">②</span>
                <p>
                  状況と気持ちを言葉にしてみる
                  <span className="text-slate-400">（整理フォーム）</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-lg font-semibold text-sky-500">③</span>
                <p>
                  自分のストレスや反応の「今の位置」を知る
                  <span className="text-slate-400">（セルフチェック）</span>
                </p>
              </div>
            </div>

           {/* ボタン群 */}
<div className="mt-4 flex flex-wrap gap-3">

  <Link
    href="/breathe"
    className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
  >
    🌌 深呼吸モードへ
  </Link>

  <Link
    href="/form"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
  >
    📝 悩みを整理する
  </Link>

  <Link
    href="/check"
    className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-400 hover:bg-emerald-100"
  >
    📒 セルフチェック
  </Link>

  <Link
    href="/learn"
    className="inline-flex items-center justify-center rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-400 hover:bg-blue-100"
  >
    📚 学ぶ
  </Link>

  <Link
    href="/quiz"
    className="inline-flex items-center justify-center rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:border-violet-400 hover:bg-violet-100"
  >
    🎮 クイズ
  </Link>
  
    <Link
    href="/support"
    className="inline-flex items-center justify-center rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:border-rose-400 hover:bg-rose-100"
  >
    💬 相談窓口をさがす
  </Link>


</div>



            <p className="mt-2 text-xs text-slate-500">
              ※ 深刻な状況や生命に関わる不安があるときは、このサイトだけに頼らず、
              110・189・#9110 などの公式窓口を最優先してください。
            </p>
          </section>

          {/* 右側：カードっぽい UI */}
          <section className="flex-1">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-800">
                  いま、このページでできること
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Prototype
                </span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-800">
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="font-semibold">まずは「ここまで来た自分」を肯定する</p>
                  <p className="mt-1 text-xs text-slate-600">
                    サイトを開いた時点で、もう「ひとりで抱え込まない」方向に一歩進めています。
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="font-semibold">状況をメモとして残せる</p>
                  <p className="mt-1 text-xs text-slate-600">
                    後から相談するときにそのまま見せられるような、
                    「整理されたメモ」をつくることを目指しています。
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <p className="font-semibold">本番の公開に向けて改良中</p>
                  <p className="mt-1 text-xs text-slate-600">
                    デザインや文章、チェック項目などは今後もアップデート予定です。
                    フィードバックも歓迎です。
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                ⚠️ このサイトは個人制作のテスト版です。緊急のときの代わりにはなりません。
                迷ったら、学校・職場の窓口や公式の相談ダイヤルを優先してください。
              </div>

              <p className="mt-3 text-[11px] text-slate-400">
                このページで入力された内容は、今のところサーバー側で自動保存されません。
                必要に応じて、テキストのコピーやメモアプリへの保存も検討してください。
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
