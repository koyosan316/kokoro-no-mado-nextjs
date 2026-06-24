"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  ExternalLink,
  Heart,
  MessageCircle,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { hasCrisisSignal, rankSupportResources } from "../data/supportResources";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ConcernKey =
  | "school"
  | "bullying"
  | "family"
  | "anxiety"
  | "lonely"
  | "violence"
  | "sexual"
  | "work"
  | "unknown";

type ConcernProfile = {
  key: ConcernKey;
  label: string;
  keywords: string[];
  replyFocus: string;
  nextSteps: string[];
  followUp: string;
  resourceQuery: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "来てくれてありがとうございます。\n\nここは、外部AIに送らずにブラウザの中だけで言葉を見ながら、気持ちの整理と相談先探しをお手伝いする場所です。\n\n無理にきれいにまとめなくても大丈夫です。今の気持ちを、短い言葉で書いてみてくださいね。",
  },
];

const quickPrompts = [
  "学校に行きたくないです",
  "クラスで無視されています",
  "家にいるのがしんどいです",
  "夜になると不安になります",
  "どこに相談すればいいかわかりません",
];

const concernProfiles: ConcernProfile[] = [
  {
    key: "bullying",
    label: "いじめ・人間関係",
    keywords: ["いじめ", "無視", "悪口", "仲間外れ", "からかわ", "クラス", "line", "sns", "晒し", "嫌がらせ"],
    replyFocus:
      "人との関係で傷ついている感じがありそうです。無視や悪口が続いているなら、ひとりで耐えるものではありません。",
    nextSteps: [
      "スクショやメモなど、残せそうなものは消さずに置いておく",
      "信頼できる大人に「今起きていること」を短く伝える",
      "学校以外の相談窓口にもつながれるようにしておく",
    ],
    followUp: "相手は学校の人、家族、ネット上の人のどれに近いですか？",
    resourceQuery: "いじめ 学校 子ども SNS",
  },
  {
    key: "school",
    label: "学校",
    keywords: ["学校", "教室", "先生", "登校", "不登校", "授業", "部活", "テスト", "保健室", "朝"],
    replyFocus:
      "学校のことが心に重くのっているのかもしれません。行けない日があっても、あなたが弱いということではないです。",
    nextSteps: [
      "「朝が苦しい」「教室がこわい」など、短い言葉で伝える準備をする",
      "保健室、別室、スクールカウンセラーなど逃げ道を増やす",
      "家の人に言いにくいときは、外部の子ども向け窓口を使う",
    ],
    followUp: "学校の中で一番しんどいのは、教室・人間関係・先生・勉強のどれに近いですか？",
    resourceQuery: "学校 子ども いじめ",
  },
  {
    key: "family",
    label: "家庭",
    keywords: ["家", "家庭", "親", "父", "母", "家族", "兄弟", "怒鳴", "帰りたくない", "居場所"],
    replyFocus:
      "家の中で安心しにくい状態なのかもしれません。家のことは外から見えにくいぶん、抱え込みやすいです。",
    nextSteps: [
      "今夜安全に過ごせる場所や人を先に考える",
      "暴力や強い怖さがあるときは、189や110も選択肢に入れる",
      "相談窓口では、家族の名前を出さずに話し始めても大丈夫",
    ],
    followUp: "今いる場所は安全ですか？それとも、近くの人に助けを求めたい感じがありますか？",
    resourceQuery: "家庭 子ども 虐待 こころ",
  },
  {
    key: "anxiety",
    label: "不安・こころの疲れ",
    keywords: ["不安", "眠れない", "寝れない", "苦しい", "疲れた", "しんどい", "涙", "怖い", "こわい", "息"],
    replyFocus:
      "心と体がかなり疲れているサインかもしれません。理由がはっきりしなくても、つらさはちゃんと扱っていいものです。",
    nextSteps: [
      "まず水を飲む、座る、呼吸をゆっくりにするなど体を落ち着かせる",
      "つらさを10段階で言うといくつか、数字で置いてみる",
      "夜や休日につらいとき用に、24時間の相談先を控えておく",
    ],
    followUp: "今のつらさは10段階でいうと、どれくらいに近いですか？",
    resourceQuery: "こころ 不安 24時間",
  },
  {
    key: "lonely",
    label: "孤独・話せる人がいない",
    keywords: ["ひとり", "一人", "孤独", "誰も", "話せない", "居場所", "わかって", "相談できない"],
    replyFocus:
      "ひとりで抱えてきた時間が長いのかもしれません。ここで少し言葉にしたこと自体、ちゃんと大事な一歩です。",
    nextSteps: [
      "電話が苦手ならチャット相談を先に見る",
      "全部を話そうとせず、最初は「今つらいです」だけでも大丈夫",
      "すぐ返事がほしいときは24時間窓口を選ぶ",
    ],
    followUp: "電話とチャットなら、今はどちらの方が使いやすそうですか？",
    resourceQuery: "チャット 匿名 こころ",
  },
  {
    key: "violence",
    label: "暴力・虐待",
    keywords: ["暴力", "殴", "蹴", "叩", "虐待", "怒鳴", "脅", "閉じ込め", "怖くて帰れない"],
    replyFocus:
      "身の安全に関わる話かもしれません。怖さがあるときは、気持ちの整理よりも安全確保を優先していいです。",
    nextSteps: [
      "今すぐ危ないなら110、子どもの虐待が心配なら189につながる",
      "近くの安全な大人、先生、親戚、近所の人に助けを求める",
      "証拠を集めるより、まず安全な場所に移ることを優先する",
    ],
    followUp: "今この瞬間に、身の危険はありますか？",
    resourceQuery: "虐待 子ども 緊急 家庭",
  },
  {
    key: "sexual",
    label: "性被害",
    keywords: ["性被害", "性暴力", "触られ", "痴漢", "性的", "裸", "画像", "レイプ", "盗撮"],
    replyFocus:
      "とても大切な話です。あなたが悪いわけではありません。専門の窓口につながることで、医療や安全面の相談もしやすくなります。",
    nextSteps: [
      "できればひとりで抱えず、専門窓口に早めにつながる",
      "画像やメッセージがある場合は、消さずに保存できると役立つことがある",
      "今も危険が続いているなら、110や近くの大人を優先する",
    ],
    followUp: "今も相手が近くにいるなど、すぐ危ない状態はありますか？",
    resourceQuery: "性被害 緊急 公的機関",
  },
  {
    key: "work",
    label: "仕事・生活",
    keywords: ["仕事", "職場", "バイト", "上司", "お金", "生活", "働", "休めない", "ハラスメント"],
    replyFocus:
      "仕事や生活の負担が重なっているのかもしれません。心の問題だけではなく、環境や制度に助けを借りる話でもあります。",
    nextSteps: [
      "困っていることを、仕事・お金・人間関係・体調に分けてみる",
      "ハラスメントや人権の相談先も選択肢に入れる",
      "生活の支援を探すときは地域の窓口検索が役立つ",
    ],
    followUp: "一番重いのは、仕事の人間関係・お金・体調・休めないことのどれに近いですか？",
    resourceQuery: "生活 ハラスメント 地域",
  },
];

const unknownProfile: ConcernProfile = {
  key: "unknown",
  label: "まだ整理中",
  keywords: [],
  replyFocus:
    "まだ言葉になりきっていない感じがあるかもしれません。はっきりした理由がなくても、つらいと感じているなら大事にしていいです。",
  nextSteps: [
    "まず「学校」「家」「人間関係」「体調」「よくわからない」から近いものを選ぶ",
    "今すぐ危ない感じがあるかだけ、先に確認する",
    "相談先を探すだけでも大丈夫",
  ],
  followUp: "今の気持ちは、学校・家・人間関係・不安・孤独のどれに近そうですか？",
  resourceQuery: "こころ 相談 24時間",
};

const crisisReply =
  "今は、ここで言葉を整理するよりも安全を優先してほしいです。\n\nもし今、自分を傷つけそうだったり、誰かに傷つけられそうだったりするなら、すぐに近くの大人、先生、家族、医療機関、または110・119につながってください。\n\n近くの人に見せるなら、こう伝えて大丈夫です。\n「今ひとりでいるのが危ないです。そばにいてください。」\n\nこの画面の右側にも、今つながりやすい相談先を出しています。ひとりで抱えなくて大丈夫です。";

function normalizeText(text: string) {
  return text.toLowerCase().replace(/\s+/g, "");
}

function pickConcern(text: string) {
  const normalized = normalizeText(text);
  const scored = concernProfiles.map((profile) => ({
    profile,
    score: profile.keywords.filter((keyword) => normalized.includes(keyword.toLowerCase())).length,
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].profile : unknownProfile;
}

function buildLocalReply(text: string) {
  if (hasCrisisSignal(text)) {
    return crisisReply;
  }

  const profile = pickConcern(text);
  const steps = profile.nextSteps.map((step) => `・${step}`).join("\n");

  return [
    "話してくれてありがとうございます。",
    `${profile.replyFocus}\n\n今の言葉は「${profile.label}」に近いかもしれません。違っていたら、もちろん選び直して大丈夫です。`,
    `今できそうな小さな一歩は、このあたりです。\n${steps}`,
    `${profile.followUp}\n\n答えたくないところは飛ばして大丈夫です。`,
  ].join("\n\n");
}

export default function CounselorClient() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const combinedUserText = useMemo(
    () =>
      messages
        .filter((message) => message.role === "user")
        .map((message) => message.content)
        .concat(input)
        .join("\n"),
    [messages, input],
  );

  const activeConcern = pickConcern(combinedUserText);
  const hasCrisis = hasCrisisSignal(combinedUserText);
  const suggestedResources = useMemo(() => {
    const query = hasCrisis ? combinedUserText : `${combinedUserText} ${activeConcern.resourceQuery}`;
    return rankSupportResources(query || "こころ 相談 24時間").slice(0, 4);
  }, [activeConcern.resourceQuery, combinedUserText, hasCrisis]);

  const scrollToBottom = () => {
    window.setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const sendMessage = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);
    scrollToBottom();

    window.setTimeout(() => {
      const userText = nextMessages
        .filter((message) => message.role === "user")
        .map((message) => message.content)
        .join("\n");
      setMessages([...nextMessages, { role: "assistant", content: buildLocalReply(userText) }]);
      setIsThinking(false);
      scrollToBottom();
    }, 420);
  };

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            もどる
          </Link>
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[11px] font-bold text-emerald-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            外部送信なし・無料
          </div>
        </header>

        <section className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-h-[72vh] flex-col rounded-lg border border-slate-100 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-100 p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">
                    Browser Local AI
                  </p>
                  <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
                    こころ整理ナビ
                  </h1>
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
                    ほんわか敬語で、気持ちの整理と相談先探しをお手伝いします。入力した内容はこのブラウザ内で判定し、OpenAIやGeminiなどの外部AIには送りません。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["ほんわか敬語", "無料", "保存なし", "診断ではありません"].map((label) => (
                      <span key={label} className="rounded-lg bg-slate-50 px-3 py-1.5 text-[11px] font-black text-slate-500">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {hasCrisis && (
              <div className="mx-5 mt-5 rounded-lg border border-rose-200 bg-rose-50 p-5 text-rose-900 sm:mx-7">
                <div className="flex items-start gap-3">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <div className="space-y-2">
                    <p className="text-sm font-black">今は安全を優先してください</p>
                    <p className="text-xs font-bold leading-relaxed">
                      自分や誰かの命・身体に危険があるときは、110・119、近くの大人、学校、医療機関、24時間相談窓口へすぐつながってください。
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-7">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-lg px-5 py-4 text-sm font-medium leading-relaxed shadow-sm ${
                      message.role === "user"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-100 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-slate-50 px-5 py-3 text-xs font-bold text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                    いまの言葉を整理しています
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-slate-100 p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="rounded-lg bg-slate-50 px-4 py-2 text-[11px] font-bold text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={sendMessage} className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={2}
                  className="max-h-32 min-h-14 flex-1 resize-none rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  placeholder="今の気持ちを少しだけ書いてみてください"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="送信"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">
                    Support
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-800">合いそうな窓口</h2>
                </div>
                <Search className="h-5 w-5 text-slate-300" />
              </div>
              <div className="mb-4 rounded-lg bg-slate-50 px-4 py-3 text-xs font-bold leading-relaxed text-slate-500">
                今の分類: <span className="text-slate-800">{activeConcern.label}</span>
              </div>
              <div className="space-y-3">
                {suggestedResources.map((resource) => (
                  <article key={resource.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-black leading-relaxed text-slate-800">{resource.name}</h3>
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone.replace(/-/g, "")}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white"
                          aria-label={`${resource.name}に電話`}
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs font-bold leading-relaxed text-slate-500">{resource.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-lg bg-white px-3 py-1 text-[10px] font-black text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[11px] font-black text-slate-500 hover:text-slate-800"
                    >
                      公式サイトを見る
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-5">
              <div className="mb-4 flex items-center gap-2 text-blue-600">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm font-black">ほかの入口</p>
              </div>
              <div className="grid gap-3">
                <Link
                  href="/support"
                  className="inline-flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  相談窓口を検索する
                  <Search className="h-4 w-4 text-slate-300" />
                </Link>
                <Link
                  href="/form"
                  className="inline-flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  相談メモを作る
                  <MessageCircle className="h-4 w-4 text-slate-300" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(initialMessages);
                    setInput("");
                  }}
                  className="inline-flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  会話を消す
                  <Trash2 className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>

            <p className="rounded-lg bg-white/70 p-4 text-[11px] font-bold leading-relaxed text-slate-400">
              このナビは医療・診断・専門カウンセリングではありません。危険が近いときは、AIではなく人につながることを優先してください。
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
