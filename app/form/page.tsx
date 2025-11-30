// app/form/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function FormPage() {
  const router = useRouter();
  const [role, setRole] = useState<
    "被害を受けている（かもしれない）" | "いじめてしまっている（かもしれない）" | "目撃した"
  >("被害を受けている（かもしれない）");

  const [age, setAge] = useState("");
  const [whenStart, setWhenStart] = useState("");
  const [freq, setFreq] = useState("");
  const [where, setWhere] = useState("");
  const [victim, setVictim] = useState("自分");
  const [offender, setOffender] = useState("不明");
  const [nPeople, setNPeople] = useState("");
  const [what, setWhat] = useState<string[]>([]);
  const [whatFree, setWhatFree] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [impact, setImpact] = useState<string[]>([]);
  const [wish, setWish] = useState("");
  const [selfReflect, setSelfReflect] = useState("");

  const [missingMessage, setMissingMessage] = useState("");
  const [resultText, setResultText] = useState("");

  // チェックボックス用のトグル
  const toggleInArray = (value: string, array: string[], setter: (v: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter((x) => x !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleGenerate = () => {
    const missing: string[] = [];

    if (!age) missing.push("年齢層");
    if (!whenStart) missing.push("開始時期");
    if (!freq) missing.push("頻度");
    if (!where) missing.push("場所");
    if (!nPeople) missing.push("加害側の人数");
    if (!wish) missing.push("今の希望");

    if (missing.length > 0) {
      setMissingMessage("未選択の項目があります：" + missing.join("、"));
      setResultText("");
      return;
    }

    setMissingMessage("");

    const whatText = what.length > 0 ? what.join("、") : "不明";
    const feelingsText = feelings.length > 0 ? feelings.join("、") : "（未記入）";
    const impactText = impact.length > 0 ? impact.join("、") : "（未記入）";

    let roleLine = "";

    if (role === "被害を受けている（かもしれない）") {
      roleLine = `私は${age}です。${whenStart}から${freq}、${where}で${offender}（${nPeople}）に、${whatText}ことが続いています。`;
    } else if (role === "いじめてしまっている（かもしれない）") {
      roleLine = `私は${age}です。${whenStart}から${freq}、${where}で${victim}に対して、${whatText}行為をしてしまっている可能性があります。`;
    } else {
      roleLine = `私は${age}です。${whenStart}から${freq}、${where}で、${offender}（${nPeople}）が${victim}に対して${whatText}様子を目撃しました。`;
    }

    const detailLine = selfReflect.trim()
      ? `詳細：${selfReflect.trim()}`
      : "";
    const feelingsLine = `そのときの気持ち：${feelingsText}。影響：${impactText}。`;
    const wishLine = `現在の希望：${wish}。`;
    const cautionLine = "※この文書には個人が特定できる情報を含めていません。";

    const sentence = [roleLine, detailLine, feelingsLine, wishLine, cautionLine]
      .filter((line) => line !== "")
      .join("\n");

    setResultText(sentence);
  };

  // チェックボックスの選択肢
  const WHAT_OPTIONS = [
    "悪口・からかい・ひどいあだ名で呼ばれる",
    "無視・仲間外れ・連絡から外される",
    "持ち物を隠される/壊される/取られる",
    "叩く/蹴る/物を投げられるなどの暴力",
    "ネットで晒される/なりすまし/拡散される",
    "不適切な画像/動画を送られる・送ってしまう",
    "しつこい要求/脅し/誘導",
    "その他（自由入力で補足）",
  ];

  const FEELINGS_OPTIONS = [
    "悲しい",
    "怖い",
    "不安",
    "怒り",
    "恥ずかしい",
    "動揺した",
    "つらい",
    "無感覚",
    "分からない",
  ];

  const IMPACT_OPTIONS = [
    "学業/仕事に支障",
    "欠席・遅刻が増えた",
    "体調不良",
    "人間関係が不安",
    "外出やSNSが怖い",
    "その他/不明",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* 背景の光 */}
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
          <p className="text-xs font-medium text-slate-400">
            悩みを整理するフォーム（匿名）
          </p>
        </header>

        {/* コンテンツ */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)]">
          {/* 左：説明＋フォーム上部 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-lg font-bold text-slate-900 md:text-xl">
                状況と気持ちを「相談用メモ」に整理するフォーム
              </h1>
              <p className="text-xs text-slate-600">
                ※ 個人が特定できる情報（実名・住所・アカウントID・URLなど）は書かないでください。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 space-y-4">
              {/* 立場 */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">
                  あなたの立場
                </label>
                <div className="flex flex-col gap-2 text-xs text-slate-700">
                  {[
                    "被害を受けている（かもしれない）",
                    "いじめてしまっている（かもしれない）",
                    "目撃した",
                  ].map((v) => (
                    <label key={v} className="flex items-center gap-2">
                      <input
                        type="radio"
                        className="h-3 w-3"
                        checked={role === v}
                        onChange={() =>
                          setRole(
                            v as
                              | "被害を受けている（かもしれない）"
                              | "いじめてしまっている（かもしれない）"
                              | "目撃した"
                          )
                        }
                      />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 年齢層・開始時期など */}
              <div className="grid gap-3 text-xs text-slate-700 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-semibold">年齢層</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <option value="">選んでください</option>
                    <option>小学生</option>
                    <option>中学生</option>
                    <option>高校生</option>
                    <option>大学生/専門</option>
                    <option>大人/社会人</option>
                    <option>不明</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">いつから？</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                    value={whenStart}
                    onChange={(e) => setWhenStart(e.target.value)}
                  >
                    <option value="">選んでください</option>
                    <option>今日</option>
                    <option>昨日</option>
                    <option>先週から</option>
                    <option>数週間前から</option>
                    <option>数か月前から</option>
                    <option>1年以上前から</option>
                    <option>不明</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">どのくらいの頻度？</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                  >
                    <option value="">選んでください</option>
                    <option>一度だけ</option>
                    <option>ときどき</option>
                    <option>ほぼ毎日</option>
                    <option>不明</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">どこで？</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                  >
                    <option value="">選んでください</option>
                    <option>学校</option>
                    <option>部活/サークル</option>
                    <option>職場/バイト</option>
                    <option>家・近所</option>
                    <option>オンライン(SNS/ゲーム/DM)</option>
                    <option>その他/不明</option>
                  </select>
                </div>
              </div>

              {/* 登場人物 */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-700">
                  登場人物（具体名は書かない）
                </p>
                <div className="grid gap-3 text-xs md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-semibold">誰が（被害者側）？</label>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                      value={victim}
                      onChange={(e) => setVictim(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold">誰が（加害者側）？</label>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                      value={offender}
                      onChange={(e) => setOffender(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <label className="font-semibold">加害側の人数</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                    value={nPeople}
                    onChange={(e) => setNPeople(e.target.value)}
                  >
                    <option value="">選んでください</option>
                    <option>1人</option>
                    <option>2〜3人</option>
                    <option>4人以上</option>
                    <option>不明</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 右：何があったか／気持ち・影響 */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 space-y-4 text-xs text-slate-700">
              {/* 何があった？ */}
              <div className="space-y-2">
                <p className="font-semibold">何があった？（複数選択可）</p>
                <div className="flex flex-col gap-1">
                  {WHAT_OPTIONS.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-3 w-3"
                        checked={what.includes(opt)}
                        onChange={() => toggleInArray(opt, what, setWhat)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <textarea
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                  rows={3}
                  placeholder="上にないこと・補足（具体名・URLは書かないでください）"
                  value={whatFree}
                  onChange={(e) => setWhatFree(e.target.value)}
                />
              </div>

              {/* 気持ち / 影響 */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="font-semibold">そのときの気持ち（複数選択可）</p>
                  <div className="flex flex-wrap gap-2">
                    {FEELINGS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInArray(opt, feelings, setFeelings)}
                        className={
                          "rounded-full px-3 py-1 text-[11px] ring-1 transition " +
                          (feelings.includes(opt)
                            ? "bg-sky-500 text-white ring-sky-500"
                            : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")
                        }
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-semibold">影響（複数選択可）</p>
                  <div className="flex flex-wrap gap-2">
                    {IMPACT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInArray(opt, impact, setImpact)}
                        className={
                          "rounded-full px-3 py-1 text-[11px] ring-1 transition " +
                          (impact.includes(opt)
                            ? "bg-emerald-500 text-white ring-emerald-500"
                            : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")
                        }
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 今の希望 */}
              <div className="space-y-1">
                <label className="font-semibold">今の希望</label>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                >
                  <option value="">選んでください</option>
                  <option>まず整理したい</option>
                  <option>アドバイスが欲しい</option>
                  <option>専門窓口に繋がりたい</option>
                  <option>分からない/未定</option>
                </select>
              </div>

              {/* 自由記入（立場ごとに説明を変える） */}
              <div className="space-y-2">
                {role === "いじめてしまっている（かもしれない）" ? (
                  <p className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                    ※「相手が嫌がっているかも」と感じたら、まずは距離を置いて専門家の助言を受けることが大切です。
                  </p>
                ) : null}

                <label className="text-xs font-semibold text-slate-700">
                  {role === "いじめてしまっている（かもしれない）"
                    ? "何をしてしまったか・理由だと思うこと（書ける範囲で）"
                    : role === "目撃した"
                    ? "見た/聞いた内容（日時・場所・様子など、書ける範囲で）"
                    : "詳細（いつ/どこ/だれ/何を/その後どうなった、を書ける範囲で）"}
                </label>
                <textarea
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1"
                  rows={4}
                  placeholder={
                    role === "目撃した"
                      ? "例：○月○日○時ごろ、昇降口で…"
                      : "書ける範囲でOKです。"
                  }
                  value={selfReflect}
                  onChange={(e) => setSelfReflect(e.target.value)}
                />
              </div>

              {/* エラー表示 */}
              {missingMessage && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                  {missingMessage}
                </p>
              )}

              {/* 生成ボタン */}
              <button
                type="button"
                onClick={handleGenerate}
                className="mt-2 w-full rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400"
              >
                📝 整理文をつくる
              </button>
            </div>
          </div>
        </section>

        {/* 下：生成された整理文の表示 */}
        {resultText && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-800">
              整理された文章（相談で見せられるメモ）
            </h2>
            <div className="whitespace-pre-wrap rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-slate-800">
              {resultText}
            </div>
            <p className="text-[11px] text-slate-500">
              必要であれば、この文章をコピーしてメモアプリなどに保存してください。
            </p>
             <button
      type="button"
      onClick={() => {
        const text = resultText.trim();
        if (!text) return;
      router.push(`/support?text=${encodeURIComponent(text)}`);
      }}
      className="mt-3 inline-flex items-center rounded-full bg-violet-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-violet-700"
    >
      この内容で相談窓口をさがす
    </button>
          </section>
        )}
      </div>
    </main>
  );
}
