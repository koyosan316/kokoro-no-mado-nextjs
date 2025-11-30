// app/learn/page.tsx
import Link from "next/link";
import Accordion from "../components/Accordion";

export default function LearnPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-900">
      {/* 背景の光 */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-gradient-to-b from-sky-100/80 via-slate-50 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-8 fade-in">
        {/* ヘッダー */}
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
          >
            ← ホームにもどる
          </Link>
          <p className="text-xs text-slate-400">学ぶコーナー</p>
        </header>

        {/* タイトル */}
        <section className="mt-6 space-y-2">
          <h1 className="text-xl font-bold md:text-2xl">
            いじめ・ストレスについて「少しだけ」知っておく場所
          </h1>
          <p className="text-sm text-slate-700">
            いじめや強いストレスは、どの年代・どんな場所でも起こりうると言われています。
            ここでは、「自分や誰かが困っているかもしれない」と感じたときのヒントや、
            関連する言葉・制度をコンパクトにまとめています。
          </p>
          <p className="text-[11px] text-slate-500">
            ※ 専門家による診断や法律相談の代わりにはなりません。
            気になる症状や危険な状況がある場合は、早めに専門機関へ相談してください。
          </p>
        </section>

        {/* にょきっと出るガイドブロックたち（基礎編） */}
        <section className="mt-6 space-y-3">
          <Accordion title="🔵 自分がいじめられていると感じたら">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>気持ちを無理に隠さなくていい。</li>
              <li>事実をメモやスクショで記録（広めず保管）。</li>
              <li>信頼できる人・窓口・サービスに共有してもよい。</li>
              <li>「相談＝弱さ」ではなく「自分を守る行動」。</li>
            </ul>
          </Accordion>

          <Accordion title="🟢 誰かがいじめられているのを見たら">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>見て見ぬふりは、結果的に加担になることもある。</li>
              <li>一人で止めようとせず、自分の安全を優先する。</li>
              <li>できること：周囲の大人に知らせる／相談窓口に伝える／一緒にいて支える。</li>
            </ul>
          </Accordion>

          <Accordion title="🟡 自分がいじめてしまっているかも？と思ったら">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>冗談でも、相手に長く残る傷になることがある。</li>
              <li>相手の表情を思い出す（本当に笑っていたか・困っていなかったか）。</li>
              <li>「ごめん」と伝えるのは負けではなく、関係を修復するための行動。</li>
              <li>習慣的なからかいや、グループノリの中での言動を振り返ってみる。</li>
            </ul>
          </Accordion>

          <Accordion title="🟠 相談するのに勇気がいるとき">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>「話す＝弱い」ではなく、「これ以上悪化させないための行動」。</li>
              <li>直接話すのが難しいときは、メモ・チャット・匿名フォームも選択肢。</li>
              <li>一度で全部話さなくても、「一言だけ」伝えるところからでOK。</li>
              <li>「一緒にいてほしい」と他の人にお願いしてから相談する方法もある。</li>
            </ul>
          </Accordion>

          <Accordion title="⚪ 広げないためにできること">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>噂を面白がって広めない・ネタにしない。</li>
              <li>晒し・拡散に参加しない／「見ても反応しない」選択も力になる。</li>
              <li>加害側のチャットやグループから距離を置くことも自分を守る方法。</li>
              <li>小さな「やめようよ」という一言が、空気を変えるきっかけになることもある。</li>
            </ul>
          </Accordion>

          <Accordion title="🟦 いじめについての基本">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>
                <b>言葉の攻撃</b>：悪口・からかい・あだ名付け など。
              </li>
              <li>
                <b>排除</b>：無視・仲間外れ・グループから外す。
              </li>
              <li>
                <b>ネット</b>：晒し・拡散・なりすまし・不適切画像の送受信。
              </li>
              <li>
                <b>身体・物</b>：叩く・蹴る・物を壊す・隠す など。
              </li>
            </ul>
          </Accordion>

          <Accordion title="🟧 対処とセルフケアのヒント">
            <ul className="list-disc ml-4 space-y-1 text-sm">
              <li>深呼吸・睡眠・食事など、基本的な生活リズムをできる範囲で整える。</li>
              <li>感情や出来事をノートに書き出して、頭の中を整理する。</li>
              <li>信頼できる人に「今日あったことを一つだけ話す」ところから始めてもよい。</li>
              <li>匿名相談・公的な相談窓口を利用することも、一つの大事な選択肢。</li>
            </ul>
          </Accordion>
        </section>

        {/* 用語ミニ辞典（詳しく知りたい人向け） */}
        <section className="mt-8 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">
            📚 用語ミニ辞典（もう少し詳しく知りたい人向け）
          </h2>
          <p className="text-[11px] text-slate-600">
            ニュースや解説でよく出てくる言葉を、「自分や身近な人に関係するかもしれない」
            という視点で、ざっくり説明しています。ここに書かれていることは医療や法律の
            診断・判断ではなく、「考えるきっかけ」として使ってください。
          </p>

          {/* 🧠 メンタル・心の反応 */}
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            🧠 メンタル・心の反応
          </h3>

          <Accordion title="🧠 フラッシュバックとは？">
            <div className="space-y-2 text-sm">
              <p>
                フラッシュバックは、過去のつらい出来事が、目の前でまた起きているように
                「急に強くよみがえる」現象のことです。映像・音・感覚がリアルに戻ってくるように
                感じることがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>きっかけ：似た場所・におい・音、ニュースなど。</li>
                <li>起きている時間は短くても、体や心の疲れが強く残ることがある。</li>
                <li>「自分がおかしい」のではなく、強いストレスやトラウマに対する反応の一つ。</li>
              </ul>
              <p className="text-xs text-slate-600">
                対処としては、深呼吸・今の場所を確認する・安心できる人に話す、などが挙げられます。
                頻度が高いときや日常生活に支障が出るときは、専門機関への相談が推奨されます。
              </p>
            </div>
          </Accordion>

          <Accordion title="🌀 解離（かいり）って？">
            <div className="space-y-2 text-sm">
              <p>
                解離は、強いストレスの中で「現実感が遠くなる」「自分じゃないみたいに感じる」
                といった状態が一時的に起こる現象です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>周りの音が遠く聞こえる・色が薄く見える感覚。</li>
                <li>自分の身体を外側から見ているような感覚。</li>
                <li>時間が飛んだように感じる・記憶があいまいになることも。</li>
              </ul>
              <p className="text-xs text-slate-600">
                これは「弱さ」ではなく、心が自分を守ろうとしている反応だと説明されることもあります。
                ただし頻繁に起こる場合は、専門家と一緒に安全な対処方法を考えることが大切です。
              </p>
            </div>
          </Accordion>

          <Accordion title="⚡ 過覚醒（かかくせい）って？">
            <div className="space-y-2 text-sm">
              <p>
                過覚醒は、体と心が「常に戦闘モード」のようになっている状態です。
                ちょっとした音や気配に過敏に反応してしまうことがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>些細な物音にもびくっと驚いてしまう。</li>
                <li>眠りが浅い／寝つきが悪い／悪夢をよく見る。</li>
                <li>体がこわばりやすい・肩こり・頭痛などが増える。</li>
              </ul>
              <p className="text-xs text-slate-600">
                強いストレスに長くさらされているときに出やすい反応の一つです。
                深呼吸・ストレッチ・安全な場所での休息などで少しずつ和らげることがあります。
              </p>
            </div>
          </Accordion>

          <Accordion title="🌫 トラウマ反応って？">
            <div className="space-y-2 text-sm">
              <p>
                トラウマ反応は、命の危険や強い恐怖につながる出来事のあとに現れる、
                心と体のさまざまな変化の総称です。PTSD（心的外傷後ストレス障害）という言葉で
                語られることもあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>強い不安・怒り・罪悪感が続く。</li>
                <li>フラッシュバックや悪夢が頻繁に起こる。</li>
                <li>関連する場所や話題を避けたくなる。</li>
              </ul>
              <p className="text-xs text-slate-600">
                こうした反応は「弱さ」ではなく、とても強い出来事にさらされた人に出やすい自然な反応です。
                日常生活に支障が出ている場合は、専門機関での支援が重要になります。
              </p>
            </div>
          </Accordion>

          <Accordion title="😥 社交不安（人前が極端にこわい感覚）">
            <div className="space-y-2 text-sm">
              <p>
                社交不安は、「人前で失敗したらどうしよう」「変に見られないかな」といった不安が強く、
                人前で話す・発表する・雑談する場面がとてもつらく感じられる状態です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>授業で当てられるのが極端にこわい。</li>
                <li>人前で手が震える・声がうわずる・顔が赤くなるなどの症状。</li>
                <li>「行きたいのに不安で行けない」場面が増える。</li>
              </ul>
              <p className="text-xs text-slate-600">
                多くの人が、程度の差はあっても似た不安を持っています。
                日常生活が大きく制限されていると感じたときは、心の専門家に相談することで、
                具体的な対処法を一緒に考えられることがあります。
              </p>
            </div>
          </Accordion>

          <Accordion title="♻️ 強迫症（きょうはくしょう）って？">
            <div className="space-y-2 text-sm">
              <p>
                強迫症は、「頭では分かっていても、不安を抑えるために同じ確認や行動を何度も
                繰り返してしまう」状態が続くものです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>戸締まり・鍵・スイッチなどを何度も確認してしまう。</li>
                <li>汚れやばい菌が気になりすぎて、手洗いをやめられない。</li>
                <li>「やらないと悪いことが起きる気がする」と感じてしまう。</li>
              </ul>
              <p className="text-xs text-slate-600">
                本人も「やりすぎかも」と自覚していることが多いですが、不安が強くやめにくいことがあります。
                一人で責めすぎず、専門家と一緒に少しずつ楽になる方法を探していくことが大切です。
              </p>
            </div>
          </Accordion>

          <Accordion title="🌱 HSP（ひとの気持ちや刺激に敏感な気質）">
            <div className="space-y-2 text-sm">
              <p>
                HSP は「Highly Sensitive Person」の略で、音・光・におい・人の表情などに対して
                とても敏感な気質を指す言葉として広く使われています。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>人の機嫌の変化にすぐ気づいてしまう。</li>
                <li>にぎやかな場所に長くいると、どっと疲れやすい。</li>
                <li>ドラマやニュースを見て感情移入しすぎてしまう。</li>
              </ul>
              <p className="text-xs text-slate-600">
                HSP は病名ではなく、「刺激や感情に敏感なタイプ」を説明するための概念です。
                生きづらさを感じるときは、刺激を減らす工夫や、安心できる人とのつながりが助けになることがあります。
              </p>
            </div>
          </Accordion>

          {/* ここから前にあったテーマたち（いじめ・ハラスメントなど） */}

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
            ⚖️ いじめ・ハラスメント・ネットトラブル など
          </h3>

          <Accordion title="🔵 パワハラ（パワーハラスメント）とは？">
            <div className="space-y-2 text-sm">
              <p>
                パワーハラスメント（パワハラ）は、立場や力の差を利用して、
                相手に精神的・身体的な苦痛を与えるような言動のことを指します。
                学校では指導者と部員、職場では上司と部下など、「力関係」が背景にあることが多いです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>人前で何度も怒鳴る・罵倒する。</li>
                <li>必要以上に仕事や作業を押しつける／逆に何もさせない。</li>
                <li>無視・仲間外れにする、露骨に冷たい態度を取り続ける。</li>
              </ul>
              <p className="text-xs text-slate-600">
                職場では、パワハラ防止の対策をとることが法律（労働施策総合推進法）で求められています。
                「自分が弱いから」と考えすぎず、環境側の問題である可能性も意識してよいテーマです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🟣 ヤングケアラーとは？">
            <div className="space-y-2 text-sm">
              <p>
                ヤングケアラーは、本来大人が担うことが多い家事・介護・家族の世話などを、
                学校に通う年代の子どもや若者が日常的に担っている状態を指す言葉です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>病気や障害のある家族の介助・付き添い。</li>
                <li>きょうだいの世話（送り迎え・宿題・食事の準備など）。</li>
                <li>家族の代わりに買い物・洗濯・掃除・料理をほぼ毎日こなす。</li>
              </ul>
              <p className="text-xs text-slate-600">
                家族を大事に思う気持ち自体は尊いものですが、負担が大きすぎると、
                学校生活や心身の健康に影響が出ることがあります。「大変だけれど誰にも言えない」と
                感じている場合、学校の先生や相談窓口に状況を共有してもかまいません。
              </p>
            </div>
          </Accordion>

          <Accordion title="🟠 いじめ防止対策推進法って？">
            <div className="space-y-2 text-sm">
              <p>
                いじめ防止対策推進法は、学校などが「いじめを防ぎ、見つけたら対応する責任がある」
                ことを定めた法律です。いじめを単なる子ども同士のトラブルではなく、
                学校全体で取り組むべき問題として位置づけています。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>学校はいじめの相談や情報を「なかったこと」にしてはいけない。</li>
                <li>いじめの疑いがあれば、事実関係を調べるよう努力する必要がある。</li>
                <li>いじめ防止・早期発見のための取り組み（アンケートなど）を行うことが求められる。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「相談してもいいのかな」と迷うとき、この法律は
                「言ってもいい・むしろ言ってほしい」と後押しする役割も持っています。
              </p>
            </div>
          </Accordion>

          <Accordion title="🟡 セクシャルハラスメント（セクハラ）とは？">
            <div className="space-y-2 text-sm">
              <p>
                セクシャルハラスメント（セクハラ）は、性的な言動や不適切な接触によって、
                相手を不快にさせたり、居場所を狭くしてしまうような行為のことです。
                「冗談」「ノリ」として扱われることもありますが、受け取る側にとっては
                深刻な傷になる場合があります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>体型・胸・性に関する発言を繰り返す。</li>
                <li>勝手に体を触る、肩を抱く、距離を詰める。</li>
                <li>性的な画像・動画・メッセージを送りつける／送るよう要求する。</li>
              </ul>
              <p className="text-xs text-slate-600">
                学校や職場では、セクハラ防止の取り組みを行うことが求められています。
                「言いづらい」と感じる内容だからこそ、早めに第三者に相談してよいテーマです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🟢 ネットいじめ・ネットトラブルについて">
            <div className="space-y-2 text-sm">
              <p>
                ネットいじめやネットトラブルは、SNS・チャット・ゲーム内のメッセージなどを介して
                起こるいじめや嫌がらせのことです。拡散力が強く、証拠が残りやすい一方で、
                相手の反応が見えにくいという特徴もあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>スクショ晒し・陰口・悪口を書き込む。</li>
                <li>なりすましアカウントで投稿する。</li>
                <li>グループチャットからの締め出し・無視。</li>
                <li>脅しや、個人情報・写真をばらまくとほのめかす行為。</li>
              </ul>
              <p className="text-xs text-slate-600">
                危険を感じる内容は、自分だけで対処せずにスクリーンショットや日時を記録し、
                信頼できる大人・学校・公式の相談窓口などに共有するのが安全です。
              </p>
            </div>
          </Accordion>
                    {/* 🏫 学校・人間関係 */}
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
            🏫 学校・人間関係
          </h3>

          <Accordion title="🏫 スクールカーストって？">
            <div className="space-y-2 text-sm">
              <p>
                スクールカーストという言葉は、クラスの中で「人気グループ」「目立たないグループ」
                などの見えない序列ができている状態を指すことが多いです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>特定のグループが「中心」にいて、周りが気をつかってしまう。</li>
                <li>グループの外にいる人が、意見を出しづらくなる。</li>
                <li>序列を利用したいじめやマウントが起きやすくなることも。</li>
              </ul>
              <p className="text-xs text-slate-600">
                序列そのものよりも、「下に見られた人が尊重されにくくなる」ことが問題です。
                安心して話せる人間関係を少しずつ増やしていくことが大切になります。
              </p>
            </div>
          </Accordion>

          <Accordion title="🧩 モラハラ的な友達関係">
            <div className="space-y-2 text-sm">
              <p>
                モラルハラスメント（モラハラ）は、本来パートナー関係などで使われる言葉ですが、
                友達関係の中でも「見えにくい支配・コントロール」として現れることがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>冗談のように見せかけて、いつも見下す・バカにする。</li>
                <li>機嫌が悪いとき、相手が黙り込んで空気を支配する。</li>
                <li>「他の友達と仲良くするな」など、行動を制限しようとする。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「自分が悪いのかな」と思い込まされやすい関係です。
                少し距離をとったり、別の友達や大人に状況を話してみることも大切です。
              </p>
            </div>
          </Accordion>

          <Accordion title="👥 同調圧力（空気を読まなきゃ、のプレッシャー）">
            <div className="space-y-2 text-sm">
              <p>
                同調圧力は、「みんなと同じでいないといけない」「浮いたらまずい」と感じて、
                本当の気持ちとは違う行動を選んでしまうような、目に見えにくいプレッシャーです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>本当は嫌だけど、ノリに合わせて笑ってしまう。</li>
                <li>いじめを止めたいのに、「自分が標的になるかも」と動けない。</li>
                <li>意見を言う前から、「どうせ浮く」とあきらめてしまう。</li>
              </ul>
              <p className="text-xs text-slate-600">
                同調圧力を感じるのは、ごく自然なことです。
                ただし、それによって誰かが強く傷ついている場合は、大人や第三者の力を借りることも重要になります。
              </p>
            </div>
          </Accordion>

          <Accordion title="📏 先生の指導とハラスメントの境目">
            <div className="space-y-2 text-sm">
              <p>
                指導とハラスメントの境目は分かりにくいですが、「相手の成長のため」かどうかだけでなく、
                言い方・頻度・他の人の前かどうか、なども重要なポイントになります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>ミスの内容ではなく、人柄そのものを否定する発言が続く。</li>
                <li>必要以上に怒鳴る・人格否定・暴力を伴う。</li>
                <li>相談しても変わらない・他の生徒も同じように苦しんでいる。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「先生だから何でも許される」ということはありません。
                複数の先生・スクールカウンセラー・外部相談窓口など、別のルートに話すことも選択肢です。
              </p>
            </div>
          </Accordion>
                    {/* 💻 ネット・SNS トラブル */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-500">
            💻 ネット・SNS トラブル
          </h3>

          <Accordion title="📱 スクショ晒し文化とは？">
            <div className="space-y-2 text-sm">
              <p>
                SNS やチャットでの会話を、相手に許可なくスクリーンショットして
                他の人に見せたり、晒したりする行為のことです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>相手のプライバシーを勝手に共有してしまう。</li>
                <li>誤解されやすい部分だけ切り取られる危険。</li>
                <li>悪意がなくても、人間関係が壊れやすい。</li>
              </ul>
              <p className="text-xs text-slate-600">
                晒した側が「冗談だった」と思っても、受け取る側は深く傷つく場合があります。
                許可のない公開は法律的にも問題になりやすいです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🕶️ なりすまし（偽アカウント）">
            <div className="space-y-2 text-sm">
              <p>
                まるで本人かのように名前やアイコンを似せて作られるアカウントのこと。
                SNS やゲーム内で発生しやすいトラブルです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>本人のフリをして嫌がらせをする。</li>
                <li>仲間を装って情報を引き出す。</li>
                <li>勝手に写真や名前を使用される。</li>
              </ul>
              <p className="text-xs text-slate-600">
                証拠をスクショして保存し、早めにサービス側へ通報することが重要です。
              </p>
            </div>
          </Accordion>

          <Accordion title="📡 デジタルタトゥーとは？">
            <div className="space-y-2 text-sm">
              <p>
                ネットに一度アップされた情報は「完全には消えにくい」ことを指す言葉。
                悪意がなくても軽い投稿が長く残ってしまうこともあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>拡散・保存されると削除しても残る。</li>
                <li>画像・動画・言葉がずっと人に届いてしまう。</li>
                <li>後から見返してつらくなる場合もある。</li>
              </ul>
              <p className="text-xs text-slate-600">
                だからこそ、投稿前に「本当に載せていいかな？」と一秒考えるのが大事と言われています。
              </p>
            </div>
          </Accordion>

          <Accordion title="💬 誹謗中傷が悪化しやすい理由">
            <div className="space-y-2 text-sm">
              <p>
                ネットでは顔が見えないため、相手の反応や気持ちが想像しづらく、
                言葉が強くなりがちです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>匿名だと罪悪感が薄れやすい。</li>
                <li>他人の攻撃に便乗してしまう（群集心理）。</li>
                <li>「正義」を理由に攻撃が正当化されてしまう。</li>
              </ul>
              <p className="text-xs text-slate-600">
                しかし、匿名でも法的な責任は問われることがあります。
                見かけたらスクショを残し、大人や窓口へ相談するのが安全です。
              </p>
            </div>
          </Accordion>

          <Accordion title="🧷 リベンジポルノ（やわらかい説明）">
            <div className="space-y-2 text-sm">
              <p>
                個人的な画像や動画を、本人の同意なくネットに出されたり、
                出すと脅されることを指します。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>学校でも起こる深刻なトラブルのひとつ。</li>
                <li>脅し・支配の材料に使われることがある。</li>
                <li>強い恐怖や不安が続くことが多い。</li>
              </ul>
              <p className="text-xs text-slate-600">
                被害に遭った人は絶対に悪くありません。  
                相談先は学校・家族だけでなく、警察や専門窓口も利用できます。
              </p>
            </div>
          </Accordion>

          <Accordion title="📱 スマホ疲れ（SNSでしんどくなる理由）">
            <div className="space-y-2 text-sm">
              <p>
                SNS の通知・比較・返信プレッシャーなどで、心が慢性的に疲れる状態のことです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>通知が来るたび緊張する。</li>
                <li>人の投稿と自分を比べて落ち込む。</li>
                <li>返事しないといけない気がして休めない。</li>
              </ul>
              <p className="text-xs text-slate-600">
                一時的にアプリを閉じる・通知を切るなどの「デジタル休憩」が役立ちます。
              </p>
            </div>
          </Accordion>

          <Accordion title="✉ DMでの脅し・要求">
            <div className="space-y-2 text-sm">
              <p>
                DM（ダイレクトメッセージ）で、無理な要求・写真要求・脅しが送られるケースです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>断ると怒る／晒すと脅す。</li>
                <li>返信しないと不安にさせられる。</li>
                <li>「言うことを聞かないと悪いことが起こる」と圧をかける。</li>
              </ul>
              <p className="text-xs text-slate-600">
                相手の言うとおりにする必要は絶対にありません。  
                証拠保存 → ブロック → 大人・窓口に相談 が基本的な流れです。
              </p>
            </div>
          </Accordion>
                    {/* 🏠 家庭・ヤングケアラー */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-500">
            🏠 家庭・ヤングケアラー
          </h3>

          <Accordion title="🧸 ヤングケアラーの生活負担">
            <div className="space-y-2 text-sm">
              <p>
                ヤングケアラーは、本来大人が担うことが多い介護・家事・家族のサポートを、
                学校に通う年代の子どもが日常的に行っている状態を指します。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>病気・障害のある家族の介助や見守り。</li>
                <li>兄弟の世話（送り迎え・ご飯・宿題など）。</li>
                <li>料理・掃除・洗濯などの家事をほぼ毎日こなす。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「家族だから頑張りたい」という優しさがあっても、負担が重すぎると
                心や体に疲れがたまり、学校生活に影響が出ることがあります。
              </p>
            </div>
          </Accordion>

          <Accordion title="💭 親の精神的な不調が子に与える影響">
            <div className="space-y-2 text-sm">
              <p>
                親がうつ・不安障害・依存症などで苦しんでいる場合、子どもが
                家の空気を読んで行動し続けることで、大きなストレスを抱えることがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>親が落ち込んでいると、自分まで気を張り続けてしまう。</li>
                <li>家の「機嫌」を常に見ながら生活する。</li>
                <li>自分の気持ちは後回しにしてしまいがち。</li>
              </ul>
              <p className="text-xs text-slate-600">
                これは「弱い」「ワガママ」ではなく、家庭環境の影響です。  
                学校の先生・養護教諭・相談窓口などに話してよいテーマです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🤝 家族依存（家族の感情に振り回される状態）">
            <div className="space-y-2 text-sm">
              <p>
                家族依存とは、「家族がどう思うか」を最優先しすぎて、
                自分の気持ちや行動がとても制限されてしまう状態です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>親の機嫌が悪いと全部自分のせいのように感じる。</li>
                <li>家族が求める役割を、断れず背負い続ける。</li>
                <li>学校や友達関係にも影響が出る。</li>
              </ul>
              <p className="text-xs text-slate-600">
                家族を大切に思う気持ち自体は良いものですが、「自分が無理をしてまで」  
                合わせる状況はサポートが必要なサインのひとつです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🧒 兄弟の面倒を見すぎて疲れるとき">
            <div className="space-y-2 text-sm">
              <p>
                年下のきょうだいの世話をすることは自然なことですが、  
                「日常のほとんどを担っている」「自分の時間がない」と感じる場合、   
                負担が大きいことがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>宿題・食事・お風呂・寝かしつけなどを毎日一人でやっている。</li>
                <li>自分の予定が後回しになる。</li>
                <li>疲れても誰にも言えない。</li>
              </ul>
              <p className="text-xs text-slate-600">
                親が知らないうちに負担が大きくなっているケースも多いです。  
                先生や相談窓口に状況を共有することで、学校側が気づくきっかけになります。
              </p>
            </div>
          </Accordion>

          <Accordion title="📉 家庭のストレスが学校生活に影響する理由">
            <div className="space-y-2 text-sm">
              <p>
                家庭のストレスは、学校での集中力・体調・人間関係に強く影響します。
                これは本人の努力の問題ではなく、環境の影響が大きいと言われています。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>夜眠れず、朝起きるのがつらくなる。</li>
                <li>学校でイライラしやすくなる。</li>
                <li>気持ちの余裕が減り、友達づきあいが難しくなる。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「甘え」ではなく、環境による心身の負荷です。  
                身近な大人に相談していいテーマです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🔍 相談しにくい家庭の特徴">
            <div className="space-y-2 text-sm">
              <p>
                家のことは外に言いにくい、というのはよくある感覚ですが、  
                特に以下のような家庭では相談が難しくなることがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>家庭内のルールが厳しすぎる。</li>
                <li>親が感情的で、気分次第で対応が変わる。</li>
                <li>「家のことを外に言うな」と強く言われている。</li>
              </ul>
              <p className="text-xs text-slate-600">
                自分の感覚を守るためにも、「信用できる大人」に小さく話すところから始めてもOKです。
              </p>
            </div>
          </Accordion>

          <Accordion title="🧩 小さなSOSが出しにくい理由">
            <div className="space-y-2 text-sm">
              <p>
                家庭の空気を壊したくない・迷惑をかけたくないという思いが強いと、
                「助けてほしい」が言えなくなりやすいです。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>頑張り屋の子ほど、限界まで我慢してしまう。</li>
                <li>本音を言うと責められることが多かった。</li>
                <li>「言っても無駄」と感じる体験をしてきた。</li>
              </ul>
              <p className="text-xs text-slate-600">
                小さなSOSでも、言って良いし、気持ちは軽くなることがあります。  
                安全な場所に一言だけ残すのも立派な行動です。
              </p>
            </div>
          </Accordion>
                    {/* ⚖️ 法律・制度 */}
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-wide text-slate-500">
            ⚖️ 法律・制度
          </h3>

          <Accordion title="⚖️ 名誉毀損（めいよきそん）って何？">
            <div className="space-y-2 text-sm">
              <p>
                名誉毀損は、事実であってもなくても「相手の社会的な評価を下げる内容」を広める行為のこと。
                SNS での晒し・悪口・デマの拡散などが該当します。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>「◯◯が○○したらしい」など具体的な内容を書いて広める。</li>
                <li>スクショや写真を悪意ある文脈で拡散する。</li>
                <li>事実だったとしても、公開し方で法的問題になることがある。</li>
              </ul>
              <p className="text-xs text-slate-600">
                SNS では「正義感」であっても名誉毀損になるケースがあります。  
                心配なときは大人・相談窓口に共有を。
              </p>
            </div>
          </Accordion>

          <Accordion title="🗯️ 侮辱罪（ぶじょくざい）とは？">
            <div className="space-y-2 text-sm">
              <p>
                侮辱罪は、事実を書かなくても相手を侮辱する発言を広めると成立する可能性がある罪。
                2022年に厳罰化され、SNSで大きな話題になりました。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>「きもい」「氏ね」などの短い悪口でも成立し得る。</li>
                <li>投稿・DM・リプライ・ストーリーなども対象。</li>
                <li>匿名でも警察が調べられるケースが増えている。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「軽い言葉」「ノリ」でも、相手に深刻なダメージを与える場合があります。
              </p>
            </div>
          </Accordion>

          <Accordion title="🕶 プライバシー侵害とは？">
            <div className="space-y-2 text-sm">
              <p>
                プライバシー侵害は、本人の許可なく「その人の私生活情報」を勝手に公開する行為。
                SNSでの晒しや暴露で起こりやすい問題です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>住所・学校・個人情報・家の写真を勝手に載せる。</li>
                <li>個人的な会話のスクショを許可なく公開する。</li>
                <li>本人の顔写真や動画を勝手に使う。</li>
              </ul>
              <p className="text-xs text-slate-600">
                本人が特定できる情報を公開するのは、重大な法律トラブルにつながる場合があります。
              </p>
            </div>
          </Accordion>

          <Accordion title="🏢 児童相談所ってどんなところ？">
            <div className="space-y-2 text-sm">
              <p>
                児童相談所（児相）は、子どもや家庭の問題について相談できる専門の機関。
                虐待やネグレクトだけでなく、家の事情や心の不調など幅広く対応します。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>学校に言いづらいことも相談できる。</li>
                <li>親に知られたくない場合も、相談できるケースがある。</li>
                <li>緊急時には、子どもの安全を守るため動くこともある。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「連れていかれる場所」という誤解が多いですが、  
                本来は子どもと家族を支える相談・支援機関です。
              </p>
            </div>
          </Accordion>

          <Accordion title="⚖️ 法務局の人権相談とは？">
            <div className="space-y-2 text-sm">
              <p>
                法務局では、差別・いじめ・家庭の問題などについて相談できる「人権相談」があります。
                匿名でも相談でき、学校や家庭では話しづらい内容を聞いてもらえます。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>ネット中傷やいじめの相談も受け付けている。</li>
                <li>第三者の立場からアドバイスしてくれる。</li>
                <li>必要に応じて関係機関につないでくれる。</li>
              </ul>
              <p className="text-xs text-slate-600">
                相談ダイヤル「みんなの人権110番（#9110とは別）」も利用できます。
              </p>
            </div>
          </Accordion>

          <Accordion title="💼 労働施策総合推進法（パワハラ防止法）">
            <div className="space-y-2 text-sm">
              <p>
                職場のパワハラを防ぐための法律で、企業に防止措置を義務づけています。
                バイト先や職場でのトラブルにも関係があります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>暴言・無視・過度な叱責はパワハラに該当しやすい。</li>
                <li>必要以上の仕事の押しつけ／逆に全く仕事を与えない。</li>
                <li>相談を妨害する行為も禁止されている。</li>
              </ul>
              <p className="text-xs text-slate-600">
                アルバイトでも適用される場合があり、「我慢するしかない」ではありません。
              </p>
            </div>
          </Accordion>

          <Accordion title="🙅‍♀️ 男女雇用機会均等法（セクハラ防止）">
            <div className="space-y-2 text-sm">
              <p>
                セクシャルハラスメント（セクハラ）を防止するため、  
                企業や学校にも対策を求めている法律です。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>性的な発言・画像送信・接触の要求はセクハラ。</li>
                <li>「ノリ」「冗談」でも相手が嫌なら成立し得る。</li>
                <li>相談した人が不利益を受けないように守られている。</li>
              </ul>
              <p className="text-xs text-slate-600">
                中高生の恋愛・部活内でも起きやすい問題で、  
                相談先として学校や相談ダイヤルが利用できます。
              </p>
            </div>
          </Accordion>

          <Accordion title="🚨 警察に相談するタイミング">
            <div className="space-y-2 text-sm">
              <p>
                いじめ・暴力・ネットの脅しなどが「自分や他人の安全に関わる」と感じたら、  
                警察への相談が必要になるケースがあります。
              </p>
              <ul className="list-disc ml-4 space-y-1">
                <li>暴力・脅迫・恐喝・強いネット上の脅し。</li>
                <li>ストーカー的な行為やつきまとい。</li>
                <li>性的な要求・画像要求など。</li>
              </ul>
              <p className="text-xs text-slate-600">
                「迷惑じゃないかな？」と思わなくて大丈夫。  
                危険を感じたときは、相談ダイヤル #9110 も使えます。
              </p>
            </div>
          </Accordion>
        </section>
      </div>
    </main>
  );
}
