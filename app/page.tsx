// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf6f3] text-slate-900">
      {/* 右上固定：公式相談リンク */}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        <a
          href="https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 shadow hover:bg-amber-100"
        >
          🏛 文科省 いじめ相談
        </a>
        <a
          href="https://www.mhlw.go.jp/mamorouyokokoro/soudan/tel/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900 shadow hover:bg-emerald-100"
        >
          ☎ よりそいホットライン
        </a>
      </div>

      {/* 背景の光 */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-[#ffeef3] via-[#fde8e6] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-[#ffe3ec]/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-[#f9e3da]/60 blur-3xl" />

      {/* コンテンツ */}
      <div className="relative mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-10">
        {/* ヘッダー */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 text-lg">
              <span className="text-white">💬</span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Kokoro no Mado
              </p>
              <p className="text-sm font-semibold text-slate-800">
                こころのまど
              </p>
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

        {/* イントロ＋右にコンパクトカード */}
<section className="grid gap-6 lg:grid-cols-[5fr_4fr] lg:items-start">
  {/* 左：タイトル・説明・3ステップ */}
  <div className="space-y-4">
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      学習用MVP・匿名で使える案内板
    </span>

   <div className="space-y-2">
  <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
    こころのまど
  </h1>
  <p className="text-sm font-medium text-sky-700 sm:text-base">
    安心して立ち寄れる相談窓口を目指して
  </p>
</div>

<p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-base">
{`ここは、「いま感じていること」を整理したり、助けを探すためのスタート地点です。
つらさの大きさや理由がはっきりしていなくても大丈夫です。
「これって相談していいのかな」「うまく言葉にできないかも」
そんな状態のまま、ひとまず立ち寄ってもらえる場所をめざしています。

深呼吸をしたり、選択肢を眺めたりするだけでも構いません。
ここで何かを決める必要はありません。
今の自分に合いそうなところから、少しずつ進めば大丈夫です。

`}
</p>
  </div>

  {/* 右：コンパクト Prototype */}
 <aside className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-200 backdrop-blur">
  <h2 className="text-sm font-semibold text-slate-800">
    こんなことでも、立ち寄って大丈夫です
  </h2>

  <p className="mt-2 text-sm text-slate-700">
    「相談するほどじゃないかも」と思っている内容でも構いません。
  </p>

  <ul className="mt-4 space-y-2 text-sm text-slate-700">
    <li>・理由ははっきりしないけど、なんとなく落ち着かない</li>
    <li>・学校や人との関わりで、少し気になっていることがある</li>
    <li>・友だちや家族とのことで、どう考えたらいいか分からない</li>
    <li>・SNSやネットのやりとりで、気持ちがざわついた</li>
    <li>・うまく言葉にできないけど、気になる</li>
    <li>・誰かに話すほどじゃない気がして、迷っている</li>
  </ul>

  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
    ⚠️ 緊急の危険があるときは 110・119・189 などの公式窓口を最優先してください。
  </div>

  <p className="mt-3 text-[11px] text-slate-400">
    当てはまらなくても大丈夫です。読むだけ、眺めるだけでも使えます。
  </p>
</aside>

</section>


        {/* できること：縦構成＋2個ずつ左右 */}
        <section className="space-y-6">
          <h2 className="text-sm font-bold tracking-wide text-slate-500">
            このページでできること
          </h2>
          {/* 1段目 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/breathe"
              className="block rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-sky-800">深呼吸モードへ</h3>
              <p className="mt-2 text-sm text-slate-700">
                今すぐ落ち着きたいときの短いガイドです。
              </p>
              <p className="mt-3 text-sm font-semibold text-sky-700">
                ひらく →
              </p>
            </Link>

            <Link
              href="/form"
              className="block rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">言葉が出てこない人はこちら</h3>
              <p className="mt-2 text-sm text-slate-700">
                選ぶだけで相談用のメモを作れます。
              </p>
              <p className="mt-3 text-sm font-semibold">
                ひらく →
              </p>
            </Link>
          </div>

          {/* 2段目 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/check"
              className="block rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-emerald-900">セルフチェック</h3>
              <p className="mt-2 text-sm text-emerald-950/90">
                今のストレス反応を確認します。
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-800">
                ひらく →
              </p>
            </Link>

            <Link
              href="/learn"
              className="block rounded-2xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-blue-900">学ぶ</h3>
              <p className="mt-2 text-sm text-blue-950/90">
                知っておくと自分を守れる情報。
              </p>
              <p className="mt-3 text-sm font-semibold text-blue-800">
                ひらく →
              </p>
            </Link>
          </div>

          {/* 3段目 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/quiz"
              className="block rounded-2xl border border-violet-200 bg-violet-50/70 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-violet-900">クイズ</h3>
              <p className="mt-2 text-sm text-violet-950/90">
                判断力をゲーム感覚で。
              </p>
              <p className="mt-3 text-sm font-semibold text-violet-800">
                ひらく →
              </p>
            </Link>

            <Link
              href="/support"
              className="block rounded-2xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-rose-900">相談窓口をさがす</h3>
              <p className="mt-2 text-sm text-rose-950/90">
                状況に合った相談先を探します。
              </p>
              <p className="mt-3 text-sm font-semibold text-rose-800">
                ひらく →
              </p>
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            ※ 深刻な状況や生命に関わる不安があるときは、このサイトだけに頼らず、
            110・189・#9110 などの公式窓口を最優先してください。
          </p>
        </section>
      </div>
    </main>
  );
}
