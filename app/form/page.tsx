// app/form/page.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; 

export default function FormPage() {
  const router = useRouter();
  type Role = "被害を受けている（かもしれない）" | "いじめてしまっている（かもしれない）" | "目撃した";
  
  // 各種ステート
  const [role, setRole] = useState<Role>("被害を受けている（かもしれない）");
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

  // --- 🛡️ 安全装置：NGワードリスト ---
  const safetyCheck = useMemo(() => {
    const allInput = (whatFree + selfReflect).toLowerCase();
    
    const sosWords = ["死にたい", "消えたい", "殺して", "自殺", "リスカ", "おしまい", "さよなら", "つかれた", "楽になりたい"];
    const attackWords = ["殺す", "ぶっ殺す", "死ね", "殴る", "殴った", "復讐", "呪う", "死んでほしい"];
    const privacyPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+|id:|@\w+/i;

    if (sosWords.some(word => allInput.includes(word))) {
      return { level: "SOS", msg: "💡 とてもつらい気持ちなんだね。一人で抱え込まず、まずは「相談窓口」のボタンからすぐ話せる場所を見てみて。" };
    }
    if (attackWords.some(word => allInput.includes(word))) {
      return { level: "ATTACK", msg: "⚠️ 強い怒りがあるみたいだね。でも、そのままメモに残すとあなたが不利になるかも。少し落ち着いてから書こう。" };
    }
    if (privacyPattern.test(allInput)) {
      return { level: "PRIVACY", msg: "🔒 安全のために、SNSのIDや連絡先、URLは書かないでおこうね。" };
    }
    return null;
  }, [whatFree, selfReflect]);

  const toggleInArray = (value: string, array: string[], setter: (v: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter((x) => x !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleGenerate = () => {
    // 安全チェックでNGが出ている場合は止めちゃう
    if (safetyCheck && safetyCheck.level !== "SOS") {
      setMissingMessage(safetyCheck.msg);
      return;
    }

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

    let roleLine = `私は${age}です。${whenStart}から${freq}、${where}で`;
    if (role === "被害を受けている（かもしれない）") {
      roleLine += `${offender}（${nPeople}）に、${whatText}ことが続いています。`;
    } else if (role === "いじめてしまっている（かもしれない）") {
      roleLine += `${victim}に対して、${whatText}行為をしてしまっている可能性があります。`;
    } else {
      roleLine += `${offender}（${nPeople}）が${victim}に対して${whatText}様子を目撃しました。`;
    }

    const detailLine = selfReflect.trim() ? `詳細：${selfReflect.trim()}` : "";
    const sentence = [roleLine, detailLine, `気持ち：${feelingsText} / 影響：${impactText}`, `希望：${wish}`, "※個人特定情報は含んでいません。"].join("\n");

    setResultText(sentence);
  };

  const WHAT_OPTIONS = ["悪口・からかい", "無視・仲間外れ", "持ち物を隠される", "暴力", "ネットで晒される", "不適切な画像等", "脅し・誘導"];

  return (
    <main className="relative min-h-screen bg-[#faf9f6] text-slate-800 pb-20">
      <div className="relative mx-auto max-w-3xl px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="text-sm font-bold text-slate-400">← もどる</button>
          <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">Safe Form</span>
        </header>

        <section className="space-y-6">
          <div className="rounded-[2.5rem] bg-white p-6 shadow-sm border border-slate-100 space-y-8">
            {/* 1. 立場 */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">あなたの立場は？</label>
              <div className="grid gap-2">
                {(["被害を受けている（かもしれない）", "いじめてしまっている（かもしれない）", "目撃した"] as Role[]).map((v) => (
                  <button key={v} onClick={() => setRole(v)} className={`rounded-2xl py-3 px-4 text-xs font-bold transition-all border-2 ${role === v ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-transparent text-slate-400"}`}>{v}</button>
                ))}
              </div>
            </div>

            {/* 2. セレクト項目（年齢・時期・頻度・場所） */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { label: "年齢層", val: age, set: setAge, opts: ["小学生", "中学生", "高校生", "大学生/専門", "大人", "不明"] },
                { label: "いつから？", val: whenStart, set: setWhenStart, opts: ["今日", "昨日", "先週から", "数か月前から", "1年以上前"] },
                { label: "頻度は？", val: freq, set: setFreq, opts: ["一度だけ", "ときどき", "ほぼ毎日", "不明"] },
                { label: "どこで？", val: where, set: setWhere, opts: ["学校", "職場/バイト", "家・近所", "SNS/ゲーム", "その他"] },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <label className="text-xs font-black text-slate-700">{item.label}</label>
                  <select className="w-full rounded-xl bg-slate-50 border-none p-3 text-xs font-bold" value={item.val} onChange={(e) => item.set(e.target.value)}>
                    <option value="">選んでください</option>
                    {item.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* 3. 人数選択 */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700">加害側の人数</label>
              <select className="w-full rounded-xl bg-slate-50 border-none p-3 text-xs font-bold" value={nPeople} onChange={(e) => setNPeople(e.target.value)}>
                <option value="">選んでください</option>
                <option>1人</option><option>2〜3人</option><option>4人以上</option><option>不明</option>
              </select>
            </div>

            {/* 4. 何があった？（チップ形式） */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">何があった？</label>
              <div className="flex flex-wrap gap-2">
                {WHAT_OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => toggleInArray(opt, what, setWhat)} className={`rounded-xl px-4 py-2 text-[11px] font-bold border-2 ${what.includes(opt) ? "bg-sky-500 border-sky-500 text-white" : "bg-white border-slate-100 text-slate-400"}`}>{opt}</button>
                ))}
              </div>
            </div>

            {/* 5. 自由記述 + 🛡️ リアルタイム警告 */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <label className="block text-sm font-black text-slate-700">自由記入（書ける範囲でOK）</label>
              <textarea 
                className={`w-full rounded-2xl p-4 text-xs font-medium min-h-[120px] transition-all ${safetyCheck ? 'bg-rose-50 ring-2 ring-rose-200' : 'bg-slate-50'}`}
                value={selfReflect} 
                onChange={(e) => setSelfReflect(e.target.value)} 
                placeholder="ここに「死ね」などのワードを書くと警告が出ます..." 
              />
              
              {/* ⚠️ ここが警告表示エリア */}
              {safetyCheck && (
                <div className={`p-4 rounded-2xl text-xs font-bold animate-bounce ${safetyCheck.level === 'SOS' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {safetyCheck.msg}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700">今の希望</label>
                <select className="w-full rounded-xl bg-slate-50 border-none p-3 text-xs font-bold" value={wish} onChange={(e) => setWish(e.target.value)}>
                  <option value="">選んでください</option>
                  <option>まず整理したい</option><option>アドバイスが欲しい</option><option>専門窓口に繋がりたい</option>
                </select>
              </div>
            </div>

            {/* 生成ボタン */}
            <div className="pt-6">
              {missingMessage && <p className="mb-4 text-center text-xs font-bold text-rose-500">{missingMessage}</p>}
              <button 
                onClick={handleGenerate} 
                disabled={!!(safetyCheck && safetyCheck.level !== 'SOS')}
                className={`w-full rounded-[2rem] py-5 text-white font-black shadow-xl transition-all ${safetyCheck && safetyCheck.level !== 'SOS' ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-black'}`}
              >
                📝 整理文をつくる
              </button>
            </div>
          </div>

          {/* 結果表示 */}
{resultText && (
  <div className="rounded-[2.5rem] bg-emerald-50 p-8 border-2 border-emerald-100 space-y-4">
    <div className="bg-white/80 rounded-2xl p-6 text-xs leading-relaxed text-slate-700 font-bold whitespace-pre-wrap shadow-inner">
      {resultText}
    </div>
<button
  onClick={() => {
    sessionStorage.setItem("supportDraft", resultText);
    router.push("/support");
  }}
  className="w-full rounded-2xl bg-emerald-600 py-4 text-white font-black hover:bg-emerald-700"
>
  この内容で相談窓口をさがす
</button>
  </div>
)}
        </section>
      </div>
    </main>
  );
}
