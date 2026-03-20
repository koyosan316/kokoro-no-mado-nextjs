"use client";

import { useState } from "react";
import Link from "next/link";
import Accordion from "../components/Accordion";

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>("mental");

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-32 text-slate-800 selection:bg-sky-100">
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-sky-600 transition-colors">
            ← HOME / TOP
          </Link>
          <div className="text-[10px] font-bold tracking-widest text-slate-300 uppercase italic">Detailed Knowledge Archive</div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-24">
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl border-l-4 border-slate-900 pl-6">
            こころを守る知恵のしおり
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-slate-500 max-w-2xl">
            提供されたすべての知識を、一文字も無駄にせず整理しました。
            「LGBTQ」の正しい理解から、家庭や学校、法律の知識まで、あなたを守るためのアーカイブです。
          </p>
        </header>

        <div className="space-y-40">
          
         {/* 01. いじめの構成：四層構造（図解デザイン） */}
          <section id="structure" className="mb-20">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">01</span>
              いじめの構成：四層構造
            </h2>
            
            <div className="relative flex flex-col items-center space-y-4 py-10 bg-slate-50/50 rounded-[40px] border border-slate-100">
              
              {/* 中心：被害者と加害者 */}
              <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-lg px-6">
                <div className="p-6 bg-white border-2 border-slate-200 rounded-3xl shadow-sm text-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Target</div>
                  <h4 className="font-bold text-slate-800 mb-2">被害者</h4>
                  <p className="text-[10px] leading-relaxed text-slate-500">
                    攻撃や排除を受けている人。<br/>落ち度は一切ありません。
                  </p>
                </div>
                <div className="p-6 bg-white border-2 border-red-200 rounded-3xl shadow-sm text-center">
                  <div className="text-[10px] font-black text-red-400 uppercase mb-2">Actor</div>
                  <h4 className="font-bold text-red-700 mb-2">加害者</h4>
                  <p className="text-[10px] leading-relaxed text-slate-500">
                    直接手を下す人。<br/>「ノリ」で正当化しがちです。
                  </p>
                </div>
                {/* 対立・攻撃の矢印イメージ（装飾） */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 font-black">
                  ⇄
                </div>
              </div>

              {/* 第二層：観衆（はやし立てる） */}
              <div className="relative w-full max-w-xl px-4">
                <div className="p-6 bg-orange-50/50 border border-orange-200 rounded-[32px] text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                    <h4 className="font-bold text-orange-700">観衆（はやし立てる人）</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-orange-800/70">
                    面白がって見ている。加害者に「自分は正しい・面白い」という誤った自信を与えてしまう層。
                  </p>
                </div>
                {/* 接続線 */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-orange-200"></div>
              </div>

              {/* 第三層：傍観者（見て見ぬふり） */}
              <div className="relative w-full max-w-2xl px-4">
                <div className="p-8 bg-amber-50/30 border border-amber-100 rounded-[40px] text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                    <h4 className="font-bold text-amber-700">傍観者（見て見ぬふりをする人）</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800/60">
                    「自分も標的になりたくない」と沈黙する。この「無反応」がいじめを継続させる土壌になります。
                  </p>
                </div>
                {/* 接続線 */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-4 bg-amber-100"></div>
              </div>

              {/* 注釈 */}
              <p className="pt-4 text-[10px] text-slate-400 font-medium">
                ※ いじめは、この「空気」を壊すことで止めることができます
              </p>
            </div>
          </section>
          {/* 02. LGBTQ：詳細版 */}
          <section id="lgbtq">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">02</span>
              LGBTQ：多様な性と自分らしさ
            </h2>
            <div className="p-10 bg-white border border-slate-200 rounded-3xl space-y-8 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 border-b pb-2">LGBTQとは？</h4>
                <p>
                  性的マイノリティ（性的少数者）を表す言葉の頭文字です。
                  心の性、好きになる性、表現する性は人それぞれであり、特定の枠に無理に当てはめる必要はありません。 [cite: 38, 39]
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
                  <li className="bg-slate-50 p-3 rounded-lg"><b>L（レズビアン）</b>：女性を好きになる女性</li>
                  <li className="bg-slate-50 p-3 rounded-lg"><b>G（ゲイ）</b>：男性を好きになる男性</li>
                  <li className="bg-slate-50 p-3 rounded-lg"><b>B（バイセクシュアル）</b>：男女両方を好きになる人</li>
                  <li className="bg-slate-50 p-3 rounded-lg"><b>T（トランスジェンダー）</b>：身体と心の性が異なる人</li>
                  <li className="bg-slate-50 p-3 rounded-lg"><b>Q（クィア/クエスチョニング）</b>：決めない、または迷っている人</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-700 text-xs mb-2">⚠ アウティングの禁止</h4>
                <p className="text-[11px] text-slate-600">
                  本人の許可なく、性的指向や性自認を第三者に言いふらす行為は「アウティング」と呼ばれ、重大な人権侵害です。 [cite: 55]
                </p>
              </div>
            </div>
          </section>

          {/* 03. 虐待と安全 */}
          <section id="abuse">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">03</span>
              家庭の中の安全（虐待の定義）
            </h2>
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm space-y-10 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">心理的虐待と面前DV</h4>
                <p>
                  言葉による否定、無視、存在を認めない態度は心に深い傷を残します。 [cite: 43, 44]
                  また、親が精神的に不安定（うつ・依存症等）で、子が常に顔色を伺い感情を押し殺す環境や、子供の前で家族に暴力を振るう「面前DV」も重大な心理的虐待です。 [cite: 101, 102]
                </p>
              </div>
              <div className="space-y-4 border-t border-slate-50 pt-8">
                <h4 className="font-bold text-slate-800">ネグレクトと生活環境</h4>
                <p>
                  食事を与えない、病気でも病院に連れて行かない、家を著しく不潔にする、学校に行かせないなどの行為です。 [cite: 47, 48]
                  「家のことを外に言うな」という強い圧力がある家庭でも、あなたの安全は最優先されるべきものです。 [cite: 116]
                </p>
              </div>
            </div>
          </section>

          {/* 04. ヤングケアラー */}
          <section id="young-carer">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">04</span>
              ヤングケアラー：背負わされている役割
            </h2>
            <div className="p-10 bg-white border border-slate-200 rounded-3xl space-y-8 text-sm text-slate-600 leading-relaxed">
              <p>本来大人が担うべき家事、介護、家族の世話を、日常的に担っている状態です。 [cite: 46, 98]</p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4 p-6 bg-sky-50 rounded-2xl">
                  <h5 className="font-bold text-sky-900 text-xs">● 具体的な生活負担</h5>
                  <ul className="text-[11px] text-sky-800 space-y-2 list-disc ml-4">
                    <li>障がいや病気のある家族の介助。 [cite: 47, 99]</li>
                    <li>毎日の買い物・洗濯・掃除・料理。 [cite: 47, 99]</li>
                    <li>幼いきょうだいの世話（送迎・食事・入浴）。 [cite: 47, 108]</li>
                  </ul>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl text-[11px]">
                  自分の予定が後回しになり、勉強や睡眠、友人と過ごす時間が奪われているなら、それは社会的な支援が必要です。 [cite: 48, 109, 110]
                </div>
              </div>
            </div>
          </section>

          {/* 05. 障害・特性と配慮 */}
          <section id="disability">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">05</span>
              特性と合理的配慮
            </h2>
            <div className="p-10 bg-white border border-slate-200 rounded-3xl space-y-8 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">HSP（刺激に非常に敏感な気質）</h4>
                <p>
                  強い光、大きな音、人混み、他人の機嫌の変化に非常に敏感なタイプ。病気ではなく「生まれ持った気質」です。 [cite: 38, 39, 40]
                </p>
              </div>
              <div className="space-y-4 border-t border-slate-50 pt-8">
                <h4 className="font-bold text-slate-800">合理的配慮（法的義務）</h4>
                <p>
                  障害や特性がある人が、周囲と同じように活動できるよう、学校や周囲が工夫（指示の文書化、音の調整など）を行うことです。これは不平等を解消するための法的義務です。 [cite: 51, 132]
                </p>
              </div>
            </div>
          </section>

         {/* 05. 基礎編：いま、知っておきたいこと */}
          <section id="basic" className="pt-10 mb-20">
            <h2 className="mb-10 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs italic">06</span>
              基礎編：いま、知っておきたいこと
            </h2>
            
            {/* grid-cols-1に固定し、flex-colで縦並びを保証 */}
            <div className="flex flex-col gap-3">
              <Accordion title="🔵 自分がいじめられていると感じたら">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>気持ちを無理に隠さなくていい。</li>
                    <li>事実をメモやスクショで記録（広めず保管）。</li>
                    <li>信頼できる人・窓口・サービスに共有してもよい。</li>
                    <li>「相談＝弱さ」ではなく「自分を守る行動」。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="🟢 誰かがいじめられているのを見たら">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>見て見ぬふりは、結果的に加担になることもある。</li>
                    <li>一人で止めようとせず、自分の安全を優先する。</li>
                    <li>できること：周囲の大人に知らせる／相談窓口に伝える／一緒にいて支える。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="🟡 自分がいじめてしまっているかも？と思ったら">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>冗談でも、相手に長く残る傷になることがある。</li>
                    <li>相手の表情を思い出す（本当に笑っていたか・困っていなかったか）。</li>
                    <li>「ごめん」と伝えるのは負けではなく、関係を修復するための行動。</li>
                    <li>習慣的なからかいや、グループノリの中での言動を振り返ってみる。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="🟠 相談するのに勇気がいるとき">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>「話す＝弱い」ではなく、「これ以上悪化させないための行動」。</li>
                    <li>直接話すのが難しいときは、メモ・チャット・匿名フォームも選択肢。</li>
                    <li>一度で全部話さなくても、「一言だけ」伝えるところからでOK。</li>
                    <li>「一緒にいてほしい」と他の人にお願いしてから相談する方法もある。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="⚪ 広げないためにできること">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>噂を面白がって広めない・ネタにしない。</li>
                    <li>晒し・拡散に参加しない／「見ても反応しない」選択も力になる。</li>
                    <li>加害側のチャットやグループから距離を置くことも自分を守る方法。</li>
                    <li>小さな「やめようよ」という一言が、空気を変えるきっかけになることもある。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="🟦 いじめについての基本">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li><strong>言葉の攻撃：</strong>悪口・からかい・あだ名付け など。</li>
                    <li><strong>排除：</strong>無視・仲間外れ・グループから外す。</li>
                    <li><strong>ネット：</strong>晒し・拡散・なりすまし・不適切画像の送受信。</li>
                    <li><strong>身体・物：</strong>叩く・蹴る・物を壊す・隠す など。</li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="🟧 対処とセルフケアのヒント">
                <div className="p-6 text-sm leading-relaxed text-slate-600">
                  <ul className="list-disc ml-4 space-y-2">
                    <li>深呼吸・睡眠・食事など、基本的な生活リズムをできる範囲で整える。</li>
                    <li>感情や出来事をノートに書き出して、頭の中を整理する。</li>
                    <li>信頼できる人に「今日あったことを一つだけ話す」ところから始めてもよい。</li>
                    <li>匿名相談・公的な相談窓口を利用することも、一つの大事な選択肢。</li>
                  </ul>
                </div>
              </Accordion>
            </div>
          </section>
          {/* 06. 用語辞典：41項目すべて網羅 */}
          <section id="dictionary" className="pt-10">
            <h2 className="mb-6 text-lg font-bold flex items-center gap-3 text-slate-900">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs italic">07</span>
              用語辞典：全41項目
            </h2>
            <p className="mb-8 text-sm text-slate-500 leading-relaxed bg-slate-100 p-4 rounded-xl">
              ニュースや解説でよく出てくる言葉を、「自分や身近な人に関係するかもしれない」 という視点で、ざっくり説明しています。ここに書かれていることは医療や法律の 診断・判断ではなく、「考えるきっかけ」として使ってください。
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                {id:"mental", label:"🧠 メンタル"},
                {id:"school", label:"🏫 学校・家庭"},
                {id:"internet", label:"💻 ネット"},
                {id:"law", label:"⚖️ 法律"}
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-2xl text-[11px] font-black transition-all ${activeCategory === cat.id ? "bg-slate-900 text-white shadow-lg" : "bg-white border border-slate-200 text-slate-400"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="space-y-3 min-h-[600px]">
              {/* --- 🧠 メンタルカテゴリ（7項目） --- */}
              {activeCategory === "mental" && (
                <>
                  <Accordion title="🧠 フラッシュバックとは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>フラッシュバックは、過去のつらい出来事が、目の前でまた起きているように 「急に強くよみがえる」現象のことです。映像・音・感覚がリアルに戻ってくるように 感じることがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>きっかけ：似た場所・におい・音、ニュースなど。</li>
                        <li>起きている時間は短くても、体や心の疲れが強く残ることがある。</li>
                        <li>「自分がおかしい」のではなく、強いストレスやトラウマに対する反応の一つ。</li>
                        <li>対処としては、深呼吸・今の場所を確認する・安心できる人に話す、などが挙げられます。頻度が高いときや日常生活に支障が出るときは、専門機関への相談が推奨されます。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🌀 解離（かいり）って？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>解離は、強いストレスの中で「現実感が遠くなる」「自分じゃないみたいに感じる」 といった状態が一時的に起こる現象です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>周りの音が遠く聞こえる・色が薄く見える感覚。</li>
                        <li>自分の身体を外側から見ているような感覚。</li>
                        <li>時間が飛んだように感じる・記憶があいまいになることも。</li>
                        <li>これは「弱さ」ではなく、心が自分を守ろうとしている反応だと説明されることもあります。ただし頻繁に起こる場合は、専門家と一緒に安全な対処方法を考えることが大切です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="⚡ 過覚醒（かかくせい）って？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>過覚醒は、体と心が「常に戦闘モード」のようになっている状態です。 ちょっとした音や気配に過敏に反応してしまうことがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>些細な物音にもびくっと驚いてしまう。</li>
                        <li>眠りが浅い／寝つきが悪い／悪夢をよく見る。</li>
                        <li>体がこわばりやすい・肩こり・頭痛などが増える。</li>
                        <li>強いストレスに長くさらされているときに出やすい反応の一つです。深呼吸・ストレッチ・安全な場所での休息などで少しずつ和らげることがあります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🌫 トラウマ反応って？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>トラウマ反応は、命の危険や強い恐怖につながる出来事のあとに現れる、 心と体のさまざまな変化の総称です。PTSD（心的外傷後ストレス障害）という言葉で 語られることもあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>強い不安・怒り・罪悪感が続く。</li>
                        <li>フラッシュバックや悪夢が頻繁に起こる。</li>
                        <li>関連する場所や話題を避けたくなる。</li>
                        <li>こうした反応は「弱さ」ではなく、とても強い出来事にさらされた人に出やすい自然な反応です。 日常生活に支障が出ている場合は、専門機関での支援が重要になります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="😥 社交不安（人前が極端にこわい感覚）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>社交不安は、「人前で失敗したらどうしよう」「変に見られないかな」といった不安が強く、 人前で話す・発表する・雑談する場面がとてもつらく感じられる状態です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>授業で当てられるのが極端にこわい。</li>
                        <li>人前で手が震える・声がうわずる・顔が赤くなるなどの症状。</li>
                        <li>「行きたいのに不安で行けない」場面が増える。</li>
                        <li>多くの人が、程度の差はあっても似た不安を持っています。 日常生活が大きく制限されていると感じたときは、心の専門家に相談することで、 具体的な対処法を一緒に考えられることがあります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="♻️ 強迫症（きょうはくしょう）って？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>強迫症は、「頭では分かっていても、不安を抑えるために同じ確認や行動を何度も 繰り返してしまう」状態が続くものです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>戸締まり・鍵・スイッチなどを何度も確認してしまう。</li>
                        <li>汚れやばい菌が気になりすぎて、手洗いや確認をやめられない。</li>
                        <li>「やらないと悪いことが起きる気がする」と感じてしまう。</li>
                        <li>本人も「やりすぎかも」と自覚していることが多いですが、不安が強くやめにくいことがあります。 一人で責めすぎず、専門家と一緒に少しずつ楽になる方法を探していくことが大切です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🌱 HSP（ひとの気持ちや刺激に敏感な気質）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>HSP は「Highly Sensitive Person」の略で、音・光・におい・人の表情などに対して とても敏感な気質を指す言葉として広く使われています。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>人の機謙の変化にすぐ気づいてしまう。</li>
                        <li>にぎやかな場所に長くいると、どっと疲れやすい。</li>
                        <li>ドラマやニュースを見て感情移入しすぎてしまう。</li>
                        <li>HSP は病名ではなく、「刺激や感情に敏感なタイプ」を説明するための概念です。 生きづらさを感じるときは、刺激を減らす工夫や、安心できる人とのつながりが助けになることがあります。</li>
                      </ul>
                    </div>
                  </Accordion>
                </>
              )}

              {/* --- 🏫 学校・家庭カテゴリ（11項目） --- */}
              {activeCategory === "school" && (
                <>
                  <Accordion title="🏫 スクールカーストって？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>スクールカーストという言葉は、クラスの中で「人気グループ」「目立たないグループ」 などの見えない序列ができている状態を指すことが多いです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>特定のグループが「中心」にいて、周りが気をつかってしまう。</li>
                        <li>グループの外にいる人が、意見を出しづらくなる。</li>
                        <li>序列を利用したいじめやマウントが起きやすくなることも。</li>
                        <li>序列そのものよりも、「下に見られた人が尊重されにくくなる」ことが問題です。 安心して話せる人間関係を少しずつ増やしていくことが大切になります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🧩 モラハラ的な友達関係">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>モラルハラスメント（モラハラ）は、本来パートナー関係などで使われる言葉ですが、 友達関係の中でも「見えにくい支配・コントロール」として現れることがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>冗談のように見せかけて、いつも見下す・バカにする。</li>
                        <li>機嫌が悪いとき、相手が黙り込んで空気を支配する。</li>
                        <li>「他の友達と仲良くするな」など、行動を制限しようとする。</li>
                        <li>「自分が悪いのかな」と思い込まされやすい関係です。 少し距離をとったり、別の友達や大人に状況を話してみることも大切です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="👥 同調圧力（空気を読まなきゃ、のプレッシャー）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>同調圧力は、「みんなと同じでいないといけない」「浮いたらまずい」と感じて、 本当の気持ちとは違う行動を選んでしまうような、目に見えにくいプレッシャーです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>本当は嫌だけど、ノリに合わせて笑ってしまう。</li>
                        <li>いじめを止めたいのに、「自分が標的になるかも」と動けない。</li>
                        <li>意見を言う前から、「どうせ浮く」とあきらめてしまう。</li>
                        <li>同調圧力を感じるのは、ごく自然なことです。 ただし、それによって誰かが強く傷ついている場合は、大人や第三者の力を借りることも重要になります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="📏 先生の指導とハラスメントの境目">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>指導とハラスメントの境目は分かりにくいですが、「相手の成長のため」かどうかだけでなく、 言い方・頻度・他の人の前かどうか、なども重要なポイントになります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>ミスの内容ではなく、人柄そのものを否定する発言が続く。</li>
                        <li>必要以上に怒鳴る・人格否定・暴力を伴う。</li>
                        <li>相談しても変わらない・他の生徒も同じように苦しんでいる。</li>
                        <li>「先生だから何でも許される」ということはありません。 複数の先生・スクールカウンセラー・外部相談窓口など、別のルートに話すことも選択肢です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🧸 ヤングケアラーの生活負担">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>ヤングケアラーは、本来大人が担うことが多い介護・家事・家族のサポートを、 学校に通う年代の子どもが日常的に行っている状態を指します。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>病気・障害のある家族の介助や見守り。</li>
                        <li>兄弟の世話（送り迎え・ご飯・宿題など）。</li>
                        <li>料理・掃除・洗濯などの家事をほぼ毎日こなす。</li>
                        <li>「家族だから頑張りたい」という優しさがあっても、負担が重すぎると 心や体に疲れがたまり、学校生活に影響が出ることがあります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="💭 親の精神的な不調が子に与える影響">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>親がうつ・不安障害・依存症などで苦しんでいる場合、子どもが 家の空気を読んで行動し続けることで、大きなストレスを抱えることがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>親が落ち込んでいると、自分まで気を張り続けてしまう。</li>
                        <li>家の「機嫌」を常に見ながら生活する。</li>
                        <li>自分の気持ちは後回しにしてしまいがち。</li>
                        <li>これは「弱い」「ワガママ」ではなく、家庭環境の影響です。 学校の先生・養護教諭・相談窓口などに話してよいテーマです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🤝 家族依存（家族の感情に振り回される状態）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>家族依存とは、「家族がどう思うか」を最優先しすぎて、 自分の気持ちや行動がとても制限されてしまう状態です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>親の機嫌が悪いと全部自分のせいのように感じる。</li>
                        <li>家族が求める役割を、断れず背負い続ける。</li>
                        <li>学校や友達関係にも影響が出る。</li>
                        <li>家族を大切に思う気持ち自体は良いものですが、「自分が無理をしてまで」 合わせる状況はサポートが必要なサインのひとつです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🧒 兄弟の面倒を見すぎて疲れるとき">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>年下のきょうだいの世話をすることは自然なことですが、 「日常のほとんどを担っている」「自分の時間がない」と感じる場合、 負担が大きいことがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>宿題・食事・お風呂・寝かしつけなどを毎日一人でやっている。</li>
                        <li>自分の予定が後回しになる。</li>
                        <li>疲れても誰にも言えない。</li>
                        <li>親が知らないうちに負担が大きくなっているケースも多いです。 先生や相談窓口に状況を共有することで、学校側が気づくきっかけになります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="📉 家庭のストレスが学校生活に影響する理由">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>家庭のストレスは、学校での集中力・体調・人間関係に強く影響します。 これは本人の努力の問題ではなく、環境の影響が大きいと言われています。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>夜眠れず、朝起きるのがつらくなる。</li>
                        <li>学校でイライラしやすくなる。</li>
                        <li>気持ちの余裕が減り、友達づきあいが難しくなる。</li>
                        <li>「甘え」ではなく、環境による心身の負荷です。 身近な大人に相談していいテーマです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🔍 相談しにくい家庭の特徴">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>家のことは外に言いにくい、というのはよくある感覚ですが、 特に以下のような家庭では相談が難しくなることがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>家庭内のルールが厳しすぎる。</li>
                        <li>親が感情的で、気分次第で対応が変わる。</li>
                        <li>「家のことを外に言うな」と強く言われている。</li>
                        <li>自分の感覚を守るためにも、「信用できる大人」に小さく話すところから始めてもOKです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🧩 小さなSOSが出しにくい理由">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>家庭の空気を壊したくない・迷惑をかけたくないという思いが強いと、 「助けてほしい」が言えなくなりやすいです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>頑張り屋の子ほど、限界まで我慢してしまう。</li>
                        <li>本音を言うと責められることが多かった。</li>
                        <li>「言っても無駄」と感じる体験をしてきた。</li>
                        <li>小さなSOSでも、言って良いし、気持ちは軽くなることがあります。 安全な場所に一言だけ残すのも立派な行動です。</li>
                      </ul>
                    </div>
                  </Accordion>
                </>
              )}

              {/* --- 💻 ネットカテゴリ（13項目） --- */}
              {activeCategory === "internet" && (
                <>
                  <Accordion title="📱 スクショ晒し文化とは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>SNS やチャットでの会話を、相手に許可なくスクリーンショットして 他の人に見せたり、晒したりする行為のことです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>相手のプライバシーを勝手に共有してしまう。</li>
                        <li>誤解されやすい部分だけ切り取られる危険。</li>
                        <li>悪意がなくても、人間関係が壊れやすい。</li>
                        <li>晒した側が「冗談だった」と思っても、受け取る側は深く傷つく場合があります。 許可のない公開は法律的にも問題になりやすいです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🕶️ なりすまし（偽アカウント）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>まるで本人かのように名前やアイコンを似せて作られるアカウントのこと。 SNS やゲーム内で発生しやすいトラブルです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>本人のフリをして嫌がらせをする。</li>
                        <li>仲間を装って情報を引き出す。</li>
                        <li>勝手に写真や名前を使用される。</li>
                        <li>証拠をスクショして保存し、早めにサービス側へ通報することが重要です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="📡 デジタルタトゥーとは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>ネットに一度アップされた情報は「完全には消えにくい」ことを指す言葉。 悪意がなくても軽い投稿が長く残ってしまうこともあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>拡散・保存されると削除しても残る。</li>
                        <li>画像・動画・言葉がずっと人に届いてしまう。</li>
                        <li>後から見返してつらくなる場合もある。</li>
                        <li>だからこそ、投稿前に「本当に載せていいかな？」と一秒考えるのが大事と言われています。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="💬 誹謗中傷が悪化しやすい理由">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>ネットでは顔が見えないため、相手の反応や気持ちが想像しづらく、 言葉が強くなりがちです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>匿名だと罪悪感が薄れやすい。</li>
                        <li>他人の攻撃に便乗してしまう（群集心理）。</li>
                        <li>「正義」を理由に攻撃が正当化されてしまう。</li>
                        <li>しかし、匿名でも法的な責任は問われることがあります。 見かけたらスクショを残し、大人や窓口へ相談するのが安全です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🧷 リベンジポルノ（やわらかい説明）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>個人的な画像や動画を、本人の同意なくネットに出されたり、 出すと脅されることを指します。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>学校でも起こる深刻なトラブルのひとつ。</li>
                        <li>脅し・支配の材料に使われることがある。</li>
                        <li>強い恐怖や不安が続くことが多い。</li>
                        <li>被害に遭った人は絶対に悪くありません。 相談先は学校・家族だけでなく、警察や専門窓口も利用できます。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="📱 スマホ疲れ（SNSでしんどくなる理由）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>SNS の通知・比較・返信プレッシャーなどで、心が慢性的に疲れる状態のことです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>通知が来るたび緊張する。</li>
                        <li>人の投稿と自分を比べて落ち込む。</li>
                        <li>返事しないといけない気がして休めない。</li>
                        <li>一時的にアプリを閉じる・通知を切るなどの「デジタル休憩」が役立ちます。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="✉ DMでの脅し・要求">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>DM（ダイレクトメッセージ）で、無理な要求・写真要求・脅しが送られるケースです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>断ると怒る／晒すと脅す。</li>
                        <li>返信しないと不安にさせられる。</li>
                        <li>「言うことを聞かないと悪いことが起こる」と圧をかける。</li>
                        <li>相手の言うとおりにする必要は絶対にありません。 証拠保存 → ブロック → 大人・窓口に相談 が基本的な流れです。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🟢 ネットいじめについて">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>ネットいじめは、SNSやチャット等を介して起こる嫌がらせのことです。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>スクショ晒し・陰口・悪口を書き込む。</li>
                        <li>なりすましアカウントで投稿する。</li>
                        <li>グループチャットからの締め出し・無視。</li>
                        <li>危険を感じる内容は、自分だけで対処せずに証拠を記録し共有するのが安全です。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🛡️ ミュート・ブロック">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">不快な情報を遮断することは「逃げ」ではなく、心の安全を保つための必須スキルです。SNSの機能を活用して自分の環境を整えましょう。</p>
                  </Accordion>
                  <Accordion title="🚨 通報機能（レポート）">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">嫌がらせを受けた際、プラットフォーム運営側に不適切な投稿やアカウントを報告する仕組みです。多くのSNSに標準装備されています。</p>
                  </Accordion>
                  <Accordion title="🔍 検索エンジンの削除依頼">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">検索結果に表示される自分の名前や中傷記事を消すよう、Google等に依頼できる制度です。デジタルタトゥー対策として有効です。</p>
                  </Accordion>
                  <Accordion title="🕶 プライバシー設定">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">SNSで情報を公開する範囲を制限し、知らない人からの接触を防ぐ設定。自分の身を守る第一歩です。</p>
                  </Accordion>
                  <Accordion title="📵 インターネット依存">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">ネットがやめられず、睡眠不足や生活習慣に支障が出ている状態。専門的な相談機関や治療が必要な場合もあります。</p>
                  </Accordion>
                </>
              )}

              {/* --- ⚖️ 法律カテゴリ（10項目） --- */}
              {activeCategory === "law" && (
                <>
                  <Accordion title="⚖️ 名誉毀損（めいよきそん）って何？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>名誉毀損は、事実であってもなくても「相手の社会的な評価を下げる内容」を広める行為のこと。 SNS での晒し・悪口・デマの拡散などが該当します。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>「◯◯が○○したらしい」など具体的な内容を書いて広める。</li>
                        <li>スクショや写真を悪意ある文脈で拡散する。</li>
                        <li>事実だったとしても、公開し方で法的問題になることがある。</li>
                        <li>SNS では「正義感」であっても名誉毀損になるケースがあります。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🗯️ 侮辱罪（ぶじょくざい）とは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>侮辱罪は、事実を書かなくても相手を侮辱する発言を広めると成立する可能性がある罪。 2022年に厳罰化され、SNSで大きな話題になりました。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>「きもい」「氏ね」などの短い悪口でも成立し得る。</li>
                        <li>投稿・DM・リプライ・ストーリーなども対象。</li>
                        <li>匿名でも警察が調べられるケースが増えている。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🕶 プライバシー侵害とは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>プライバシー侵害は、本人の許可なく「その人の私生活情報」を勝手に公開する行為。 SNSでの晒しや暴露で起こりやすい問題です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>住所・学校・個人情報・家の写真を勝手に載せる。</li>
                        <li>個人的な会話のスクショを許可なく公開する。</li>
                        <li>本人の顔写真や動画を勝手に使う。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🟠 いじめ防止対策推進法って？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>いじめ防止対策推進法は、学校などが「いじめを防ぎ、見つけたら対応する責任がある」 ことを定めた法律です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>学校はいじめの相談や情報を「なかったこと」にしてはいけない。</li>
                        <li>いじめの疑いがあれば、事実関係を調べるよう努力する必要がある。</li>
                        <li>いじめ防止・早期発見のための取り組み（アンケートなど）を行うことが求められる。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="💼 労働施策総合推進法（パワハラ防止法）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>職場のパワハラを防ぐための法律で、企業に防止措置を義務づけています。 バイト先や職場でのトラブルにも関係があります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>暴言・無視・過度な叱責はパワハラに該当しやすい。</li>
                        <li>必要以上の仕事の押しつけ／逆に全く仕事を与えない。</li>
                        <li>相談を妨害する行為も禁止されている。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🙅‍♀️ 男女雇用機会均等法（セクハラ防止）">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>セクシャルハラスメント（セクハラ）を防止するため、 企業や学校にも対策を求めている法律です。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>性的な発言・画像送信・接触の要求はセクハラ。</li>
                        <li>「ノリ」「冗談」でも相手が嫌なら成立し得る。</li>
                        <li>相談した人が不利益を受けないように守られている。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🚨 警察に相談するタイミング">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>いじめ・暴力・ネットの脅しなどが「自分や他人の安全に関わる」と感じたら、 警察への相談が必要になるケースがあります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>暴力・脅迫・恐喝・強いネット上の脅し。</li>
                        <li>ストーカー的な行為やつきまとい。</li>
                        <li>性的な要求・画像要求など。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="🏢 児童相談所ってどんなところ？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>児童相談所（児相）は、子どもや家庭の問題について相談できる専門の機関。 虐待やネグレクトだけでなく、家の事情や心の不調など幅広く対応します。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>学校に言いづらいことも相談できる。</li>
                        <li>親に知られたくない場合も、相談できるケースがある。</li>
                        <li>緊急時には、子どもの安全を守るため動くこともある。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="⚖️ 法務局の人権相談とは？">
                    <div className="p-6 text-sm leading-relaxed text-slate-600 space-y-3">
                      <p>法務局では、差別・いじめ・家庭の問題などについて相談できる「人権相談」があります。</p>
                      <ul className="list-disc ml-4 text-xs text-slate-500 space-y-1">
                        <li>ネット中傷やいじめの相談も受け付けている。</li>
                        <li>第三者の立場からアドバイスしてくれる。</li>
                        <li>必要に応じて関係機関につないでくれる。</li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion title="📄 証拠保存（スクショ等）の重要性">
                    <p className="p-6 text-sm leading-relaxed text-slate-600">被害に遭った際、日時・相手・内容を記録しておくことは、解決に向けた最も強い武器になります。感情的にならず、静かに記録を溜めることが自分を守ります。</p>
                  </Accordion>
                </>
              )}
            </div>
          </section>
             </div>

        {/* 07. フッター：相談窓口への誘導 */}
        <footer className="mt-48 pt-10 border-t border-slate-100 text-center">
          {/* href を "/consult" から "/support" に変更 */}
          <Link 
            href="/support" 
            className="inline-block bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-2xl"
          >
            相談窓口へ →
          </Link>
          <p className="mt-12 text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase italic">
            Correct Knowledge is your Strength.
          </p>
        </footer>
      </div>
    </main>
  );
}