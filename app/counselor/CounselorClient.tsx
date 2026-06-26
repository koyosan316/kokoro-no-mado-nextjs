"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
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

type Choice = {
  id: string;
  label: string;
  value: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  choices?: Choice[];
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
  choices: Choice[];
};

const startChoices: Choice[] = [
  { id: "start-school", label: "学校のこと", value: "学校のことがしんどいです" },
  { id: "start-people", label: "人間関係のこと", value: "人間関係がしんどいです" },
  { id: "start-home", label: "家のこと", value: "家にいるのがしんどいです" },
  { id: "start-anxiety", label: "不安や疲れ", value: "不安で疲れています" },
  { id: "start-lonely", label: "ひとりでつらい", value: "ひとりでつらいです" },
  { id: "start-other", label: "うまく言えない", value: "うまく言葉にできません" },
];

const actionChoices: Choice[] = [
  { id: "action-more", label: "もう少し気持ちを整理したい", value: "もう少し気持ちを整理したいです" },
  { id: "action-support", label: "相談先を見てみたい", value: "相談先を見てみたいです" },
  { id: "action-rest", label: "今は少し休みたい", value: "今は少し休みたいです" },
  { id: "action-switch", label: "別のことも話したい", value: "別のことも話したいです" },
];

const contactChoices: Choice[] = [
  { id: "contact-chat", label: "チャットで相談したい", value: "チャットで相談したいです" },
  { id: "contact-phone", label: "電話で相談したい", value: "電話で相談したいです" },
  { id: "contact-later", label: "今は情報だけ見たい", value: "今は情報だけ見たいです" },
  { id: "contact-more", label: "まだ迷っている", value: "まだ迷っています" },
];

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "来てくれてありがとうございます。\n\n言葉にならないときは、下の中から近いものを一つ選ぶだけで大丈夫です。もちろん、自由に書いてもかまいません。\n\nここでは、急いで答えを出さなくて大丈夫です。",
    choices: startChoices,
  },
];

const quickPrompts = [
  "学校に行きたくないです",
  "夜になると不安になります",
  "どこに相談すればいいかわかりません",
];

const concernProfiles: ConcernProfile[] = [
  {
    key: "bullying",
    label: "いじめ・人間関係",
    keywords: ["いじめ", "無視", "悪口", "仲間外れ", "からかわ", "クラス", "友達", "友だち", "人間関係", "line", "sns", "晒し", "嫌がらせ"],
    replyFocus: "人との関係で傷つくことが続いているのかもしれません。無視や悪口を、ひとりで耐え続けなくて大丈夫です。",
    nextSteps: [
      "スクショやメモなど、残せそうなものは消さずに置いておく",
      "信頼できる大人に「今起きていること」を短く伝える",
      "学校以外の相談窓口にもつながれるようにしておく",
    ],
    followUp: "相手は学校の人、家族、ネット上の人のどれに近いですか？",
    resourceQuery: "いじめ 学校 子ども SNS",
    choices: [
      { id: "bully-ignore", label: "無視・仲間外れ", value: "無視や仲間外れがつらいです" },
      { id: "bully-words", label: "悪口・からかい", value: "悪口やからかいがつらいです" },
      { id: "bully-net", label: "ネットやSNS", value: "ネットやSNSでもつらいことがあります" },
      { id: "bully-hard", label: "まだ言葉にしにくい", value: "まだ言葉にしにくいです" },
    ],
  },
  {
    key: "school",
    label: "学校",
    keywords: ["学校", "教室", "先生", "登校", "不登校", "授業", "部活", "テスト", "保健室", "朝"],
    replyFocus: "学校のことが心に重くのっているのかもしれません。行けない日があっても、あなたが弱いということではないです。",
    nextSteps: [
      "「朝が苦しい」「教室がこわい」など、短い言葉で伝える準備をする",
      "保健室、別室、スクールカウンセラーなど逃げ道を増やす",
      "家の人に言いにくいときは、外部の子ども向け窓口を使う",
    ],
    followUp: "学校の中で一番しんどいのは、教室・人間関係・先生・勉強のどれに近いですか？",
    resourceQuery: "学校 子ども いじめ",
    choices: [
      { id: "school-class", label: "教室にいるのがつらい", value: "教室にいるのがつらいです" },
      { id: "school-morning", label: "朝になると動けない", value: "朝になると学校に行けません" },
      { id: "school-teacher", label: "先生に話しにくい", value: "先生に話しにくいです" },
      { id: "school-study", label: "勉強や部活が苦しい", value: "勉強や部活が苦しいです" },
    ],
  },
  {
    key: "family",
    label: "家庭",
    keywords: ["家", "家庭", "親", "父", "母", "家族", "兄弟", "怒鳴", "帰りたくない", "居場所"],
    replyFocus: "家の中で安心しにくい状態なのかもしれません。家のことは外から見えにくいぶん、抱え込みやすいです。",
    nextSteps: [
      "今夜安全に過ごせる場所や人を先に考える",
      "怖さが強いときは、189や110も選択肢に入れる",
      "相談窓口では、家族の名前を出さずに話し始めても大丈夫",
    ],
    followUp: "今いる場所は安全ですか？それとも、近くの人に助けを求めたい感じがありますか？",
    resourceQuery: "家庭 子ども 虐待 こころ",
    choices: [
      { id: "family-air", label: "家の空気がしんどい", value: "家の空気がしんどいです" },
      { id: "family-scared", label: "怒鳴られたりこわい", value: "怒鳴られたりしてこわいです" },
      { id: "family-place", label: "居場所がない", value: "家に居場所がないです" },
      { id: "family-safe", label: "今は安全な場所にいる", value: "今は安全な場所にいます" },
    ],
  },
  {
    key: "anxiety",
    label: "不安・こころの疲れ",
    keywords: ["不安", "眠れない", "寝れない", "苦しい", "疲れた", "しんどい", "涙", "怖い", "こわい", "息"],
    replyFocus: "心と体がかなり疲れているサインかもしれません。理由がはっきりしなくても、つらさはちゃんと扱っていいものです。",
    nextSteps: [
      "まず水を飲む、座る、呼吸をゆっくりにするなど体を落ち着かせる",
      "つらさを10段階で言うといくつか、数字で置いてみる",
      "夜や休日につらいとき用に、24時間の相談先を控えておく",
    ],
    followUp: "今のつらさは10段階でいうと、どれくらいに近いですか？",
    resourceQuery: "こころ 不安 24時間",
    choices: [
      { id: "anxiety-night", label: "夜になるとつらい", value: "夜になるとつらいです" },
      { id: "anxiety-body", label: "体が苦しい・眠れない", value: "体が苦しくて眠れません" },
      { id: "anxiety-reason", label: "理由がわからない", value: "理由はわからないけれどつらいです" },
      { id: "anxiety-tired", label: "ずっと疲れきっている", value: "ずっと疲れきっています" },
    ],
  },
  {
    key: "lonely",
    label: "孤独・話せる人がいない",
    keywords: ["ひとり", "一人", "孤独", "誰も", "話せない", "居場所", "わかって", "相談できない"],
    replyFocus: "ひとりで抱えてきた時間が長いのかもしれません。ここで少し言葉にしたこと自体、ちゃんと大事な一歩です。",
    nextSteps: [
      "電話が苦手ならチャット相談を先に見る",
      "全部を話そうとせず、最初は「今つらいです」だけでも大丈夫",
      "すぐ返事がほしいときは24時間窓口を選ぶ",
    ],
    followUp: "電話とチャットなら、今はどちらの方が使いやすそうですか？",
    resourceQuery: "チャット 匿名 こころ",
    choices: [
      { id: "lonely-noone", label: "話せる人がいない", value: "話せる人がいません" },
      { id: "lonely-understand", label: "わかってもらえない", value: "誰にもわかってもらえない気がします" },
      { id: "lonely-phone", label: "電話は苦手", value: "電話で話すのは苦手です" },
      { id: "lonely-alone", label: "ひとりの時間がこわい", value: "ひとりの時間がこわいです" },
    ],
  },
  {
    key: "violence",
    label: "暴力・虐待",
    keywords: ["暴力", "殴", "蹴", "叩", "虐待", "怒鳴", "脅", "閉じ込め", "怖くて帰れない"],
    replyFocus: "身の安全に関わる話かもしれません。怖さがあるときは、気持ちの整理よりも安全確保を優先していいです。",
    nextSteps: [
      "今すぐ危ないなら110、子どもの虐待が心配なら189につながる",
      "近くの安全な大人、先生、親戚、近所の人に助けを求める",
      "証拠を集めるより、まず安全な場所に移ることを優先する",
    ],
    followUp: "今この瞬間に、身の危険はありますか？",
    resourceQuery: "虐待 子ども 緊急 家庭",
    choices: [
      { id: "violence-now", label: "今もこわい", value: "今もこわいです" },
      { id: "violence-place", label: "安全な場所を考えたい", value: "安全な場所を考えたいです" },
      { id: "violence-adult", label: "大人に言いにくい", value: "大人に言いにくいです" },
      { id: "violence-info", label: "相談先を知りたい", value: "相談先を知りたいです" },
    ],
  },
  {
    key: "sexual",
    label: "性被害",
    keywords: ["性被害", "性暴力", "触られ", "痴漢", "性的", "裸", "画像", "レイプ", "盗撮"],
    replyFocus: "とても大切な話です。あなたが悪いわけではありません。専門の窓口につながることで、医療や安全面の相談もしやすくなります。",
    nextSteps: [
      "できればひとりで抱えず、専門窓口に早めにつながる",
      "画像やメッセージがある場合は、消さずに保存できると役立つことがある",
      "今も危険が続いているなら、110や近くの大人を優先する",
    ],
    followUp: "今も相手が近くにいるなど、すぐ危ない状態はありますか？",
    resourceQuery: "性被害 緊急 公的機関",
    choices: [
      { id: "sexual-safe", label: "今は安全な場所にいる", value: "今は安全な場所にいます" },
      { id: "sexual-talk", label: "誰にも話せていない", value: "誰にも話せていません" },
      { id: "sexual-support", label: "専門の相談先を知りたい", value: "専門の相談先を知りたいです" },
      { id: "sexual-hard", label: "まだ詳しくは言えない", value: "まだ詳しくは言えません" },
    ],
  },
  {
    key: "work",
    label: "仕事・生活",
    keywords: ["仕事", "職場", "バイト", "上司", "お金", "生活", "働", "休めない", "ハラスメント"],
    replyFocus: "仕事や生活の負担が重なっているのかもしれません。心の問題だけではなく、環境や制度に助けを借りる話でもあります。",
    nextSteps: [
      "困っていることを、仕事・お金・人間関係・体調に分けてみる",
      "ハラスメントや人権の相談先も選択肢に入れる",
      "生活の支援を探すときは地域の窓口検索が役立つ",
    ],
    followUp: "一番重いのは、仕事の人間関係・お金・体調・休めないことのどれに近いですか？",
    resourceQuery: "生活 ハラスメント 地域",
    choices: [
      { id: "work-people", label: "職場の人間関係", value: "職場の人間関係がつらいです" },
      { id: "work-money", label: "お金や生活の不安", value: "お金や生活が不安です" },
      { id: "work-body", label: "体調がついていかない", value: "体調がついていきません" },
      { id: "work-rest", label: "休めない", value: "休めません" },
    ],
  },
];

const unknownProfile: ConcernProfile = {
  key: "unknown",
  label: "まだ整理中",
  keywords: [],
  replyFocus: "まだ言葉になりきっていない感じがあるかもしれません。理由がはっきりしなくても、つらいと感じているなら大事にしていいです。",
  nextSteps: [
    "まず「学校」「家」「人間関係」「体調」「よくわからない」から近いものを選ぶ",
    "今すぐ危ない感じがあるかだけ、先に確認する",
    "相談先を探すだけでも大丈夫",
  ],
  followUp: "今の気持ちは、学校・家・人間関係・不安・孤独のどれに近そうですか？",
  resourceQuery: "こころ 相談 24時間",
  choices: startChoices,
};

const crisisReply =
  "今は、ここで言葉を整理するよりも安全を優先してほしいです。\n\nもし今、自分を傷つけそうだったり、誰かに傷つけられそうだったりするなら、すぐに近くの大人、先生、家族、医療機関、または110・119につながってください。\n\n近くの人に見せるなら、こう伝えて大丈夫です。\n「今ひとりでいるのが危ないです。そばにいてください。」\n\n右側にも、今つながりやすい相談先を出しています。ひとりで抱えなくて大丈夫です。";

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

function compactText(text: string) {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > 34 ? oneLine.slice(0, 34) + "…" : oneLine;
}

function randomIndex(length: number, previous?: number) {
  let index = Math.floor(Math.random() * length);

  if (length > 1) {
    while (index === previous) {
      index = Math.floor(Math.random() * length);
    }
  }

  return index;
}

function shuffleItems(items: string[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomReplyDelay() {
  return 500 + Math.floor(Math.random() * 1501);
}

function contextHint(text: string) {
  const normalized = normalizeText(text);

  if (normalized.includes("電話") && (normalized.includes("苦手") || normalized.includes("こわ"))) {
    return "電話が負担なら、最初からチャットやSNSの相談を選んで大丈夫です。";
  }
  if (normalized.includes("夜") || normalized.includes("眠れ") || normalized.includes("寝れ")) {
    return "夜に強くなるつらさなら、今のうちに24時間の相談先を控えておくと少し安心につながることがあります。";
  }
  if (normalized.includes("学校") || normalized.includes("教室") || normalized.includes("先生")) {
    return "学校の中だけで解決しようとせず、保健室や学校の外の相談先も逃げ道にして大丈夫です。";
  }
  if (normalized.includes("家") || normalized.includes("親") || normalized.includes("家族")) {
    return "家のことは、名前を出さずに相談を始めても大丈夫です。";
  }
  if (normalized.includes("ひとり") || normalized.includes("誰も")) {
    return "全部を説明できなくても、「今つらいです」とだけ送れる窓口があります。";
  }

  return "今は、つらさに名前をつけきれなくても大丈夫です。";
}

type ReplyContext = {
  profile: ConcernProfile;
  recent: string;
  hint: string;
  steps: string;
};

const firstReplyVariants: Array<(context: ReplyContext) => string> = [
  (context) =>
    "「" + context.recent + "」と書いてくれたんですね。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    context.hint +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "今の「" + context.recent + "」という言葉から、かなり気を張ってきた様子が伝わってきます。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    "細かく説明しなくても大丈夫です。 " +
    context.profile.followUp,
  (context) =>
    "教えてくれてありがとうございます。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    context.hint +
    "\n\n" +
    "今いちばん近いものを、下から一つ選んでみてください。",
  (context) =>
    "「" + context.recent + "」と感じながら過ごすのは、しんどいことだと思います。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    "今は結論を出さなくて大丈夫です。 " +
    context.profile.followUp,
  (context) =>
    "まず、今つらいと感じていることを大事にしていいです。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    context.hint +
    "\n\n" +
    "次に近いものを選ぶだけでも、少し整理しやすくなります。",
  (context) =>
    "ここに言葉を置いてくれてありがとうございます。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    "話せる範囲だけで大丈夫です。 " +
    context.profile.followUp,
  (context) =>
    "「" + context.recent + "」ということですね。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    context.hint +
    "\n\n" +
    "下の選択肢は、正確に当てはまらなくてもかまいません。",
  (context) =>
    "今のことを伝えてくれてありがとうございます。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    "ひとつずつ見ていければ十分です。 " +
    context.profile.followUp,
  (context) =>
    "理由をうまく説明できなくても、つらさがあることは変わりません。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    context.hint +
    "\n\n" +
    "今の感覚に近いものから、ゆっくり選んでください。",
  (context) =>
    "「" + context.recent + "」と書いてくれた部分を、いったん大事に置いておきます。\n\n" +
    context.profile.replyFocus +
    "\n\n" +
    "答えたくないところは飛ばして大丈夫です。 " +
    context.profile.followUp,
];

const secondReplyVariants: Array<(context: ReplyContext) => string> = [
  (context) =>
    "ここまで入力された言葉から、" + context.profile.label + "の負担が続いているように見えます。\n\n" +
    "今すぐできそうなことを、二つだけ置いてみます。\n" +
    context.steps +
    "\n\n" +
    "次に、今の自分に近い進み方を一つ選んでください。",
  (context) =>
    "「" + context.recent + "」というところが、今は特に苦しい部分なのかもしれません。\n\n" +
    "少しでも負担を減らすために、できそうなことはこのあたりです。\n" +
    context.steps +
    "\n\n" +
    "無理のない進み方を、下から選んでみてください。",
  (context) =>
    "ここまで話してくれたことを急いで片づけなくて大丈夫です。\n\n" +
    "まずは、今日か明日にできそうなことを考えてみます。\n" +
    context.steps +
    "\n\n" +
    "次にどうしたいか、近いものを選んでください。",
  (context) =>
    "今のつらさをひとりで抱え続けなくて大丈夫です。\n\n" +
    "大きく変えようとせず、小さなことから始めるならこちらです。\n" +
    context.steps +
    "\n\n" +
    "気持ちを整理するか、相談先を見るか、休むかを選べます。",
  (context) =>
    "ここまでの流れを見ると、今は安心できる場所や人を増やすことが大切そうです。\n\n" +
    "そのためにできることを二つ挙げます。\n" +
    context.steps +
    "\n\n" +
    "今の自分に一番近い選択を押してください。",
  (context) =>
    "つらさの理由が一つではなくても大丈夫です。\n\n" +
    "今の段階で試しやすいことは、このあたりです。\n" +
    context.steps +
    "\n\n" +
    "ここから先は、話を続ける・相談先を見る・休む、のどれでも大丈夫です。",
  (context) =>
    "「" + context.recent + "」と感じている今は、無理にがんばり方を増やさなくていいです。\n\n" +
    "少し負担を減らすなら、こういう方法があります。\n" +
    context.steps +
    "\n\n" +
    "次にしたいことを、下から選んでください。",
  (context) =>
    "ひとつずつ言葉にできていますね。\n\n" +
    "今は、次の二つを頭の片隅に置いておくとよさそうです。\n" +
    context.steps +
    "\n\n" +
    "急がなくて大丈夫です。近い進み方を一つ選んでください。",
  (context) =>
    "今の話に合いそうな小さな一歩を考えてみます。\n\n" +
    context.steps +
    "\n\n" +
    "どれも今すぐできなくても大丈夫です。次に何をしたいかだけ、選んでみてください。",
  (context) =>
    "ここまで頑張ってきた自分を責めなくて大丈夫です。\n\n" +
    "少しでも楽になるために、できそうなことを二つ置いてみます。\n" +
    context.steps +
    "\n\n" +
    "今の気持ちに合う進み方を、下から選べます。",
];

const ongoingReplyVariants: Array<(context: ReplyContext) => string> = [
  (context) =>
    "「" + context.recent + "」という今の言葉も大事にして考えます。\n\n" +
    context.hint +
    "\n\n" +
    "今の段階でできそうなことは、このあたりです。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "ここまでの話から、" + context.profile.label + "の中でも、今は特に負担が大きい部分がありそうです。\n\n" +
    "少し楽になるために考えられることは、こちらです。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "今の気持ちは、前に書いてくれたこととつながっていそうです。\n\n" +
    context.hint +
    "\n\n" +
    "できそうなことを二つだけ挙げます。\n" +
    context.steps +
    "\n\n" +
    "近いものを一つ選んでください。",
  (context) =>
    "話しながら、少しずつ大事なところが見えてきます。\n\n" +
    "今は次のことを覚えておくだけでも大丈夫です。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "「" + context.recent + "」と感じるほど、今は心に余裕が少ないのかもしれません。\n\n" +
    context.hint +
    "\n\n" +
    "まずは無理のない範囲で、こちらを考えてみてください。\n" +
    context.steps +
    "\n\n" +
    "次に近いものを選んで大丈夫です。",
  (context) =>
    "ここまで言葉にできたこと自体が、状況を整理する助けになっています。\n\n" +
    "今のあなたに合いそうな選択肢は、このあたりです。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "つらいときは、答えを一つに決めなくても大丈夫です。\n\n" +
    context.hint +
    "\n\n" +
    "今できそうなことを二つに絞ると、こちらです。\n" +
    context.steps +
    "\n\n" +
    "今の感覚に近いものを選んでください。",
  (context) =>
    "今の話からは、少し安心できる逃げ道が必要そうです。\n\n" +
    "そのために考えられることを、二つ挙げます。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
  (context) =>
    "「" + context.recent + "」という部分を、軽く扱わなくて大丈夫です。\n\n" +
    context.hint +
    "\n\n" +
    "今の段階で試しやすいことは、こちらです。\n" +
    context.steps +
    "\n\n" +
    "下から近いものを選ぶか、そのまま書いてください。",
  (context) =>
    "ここまでの内容をふまえると、今は自分を守ることを先に考えてよさそうです。\n\n" +
    "小さく始めるなら、この二つがあります。\n" +
    context.steps +
    "\n\n" +
    context.profile.followUp,
];

const contactReplyVariants = [
  "相談先を見てみようと思ったんですね。\n\n右側には、今の話に近い窓口が出ています。電話が負担なら、チャットやSNSの窓口から見ても大丈夫です。\n\n下から、使いやすそうな方法を選んでください。",
  "誰かにつながる方法を探そうとしていることは、大切な一歩です。\n\n右側の窓口は、今まで入力された内容に合わせて並んでいます。\n\n電話・チャット・情報だけ見る、の中から近いものを選んでください。",
  "相談先は、全部を説明できるようになってから使うものではありません。\n\n最初は「今つらいです」だけでも大丈夫です。右側の窓口も見ながら、使う方法を選んでみてください。",
  "今は、ひとりで考え続けるより、外につながる選択肢を持っておくとよさそうです。\n\n右側に相談先を出しています。話し方に合う方法を下から選んでください。",
  "相談先を探すとき、電話が合わなければチャットを選んで大丈夫です。\n\n右側の窓口は公式サイトへつながります。\n\n今の気分に合う方法を一つ選んでください。",
  "誰かに相談するか迷っている段階でも、窓口の情報を見るだけで大丈夫です。\n\n右側に今の話題に近い相談先があります。\n\nまずは使いやすそうな方法を選んでみてください。",
  "相談先を知っておくと、つらさが強くなったときの逃げ道になります。\n\n右側の窓口から、電話やチャットの案内を確認できます。\n\n今の気持ちに近いものを選んでください。",
  "今すぐ話せなくても、相談先を見ておくことには意味があります。\n\n右側の窓口は、あとから開いても大丈夫です。\n\n電話・チャット・情報だけ見る、のどれが近いですか？",
  "相談先を選ぶときは、いちばん話しやすそうな方法を優先して大丈夫です。\n\n右側の一覧も見ながら、下から近いものを選んでください。",
  "つながる先を探してくれてありがとうございます。\n\n右側には、今の話に合わせた窓口を出しています。\n\n無理のない方法を一つ選んでみてください。",
];

const restReplyVariants = [
  "今は少し休むことを選んで大丈夫です。\n\n水を飲む、横になる、画面から離れるなど、体を少し休ませてください。\n\nまた話せそうなときに戻ってきて大丈夫です。",
  "答えを出さない時間も必要です。\n\n今は、できるだけ刺激を減らして、少し呼吸を整えてみてください。\n\nつらさが強くなったら、右側の24時間窓口を使えます。",
  "ここまで考えたので、今は休んで大丈夫です。\n\n通知を少し切る、温かい飲み物を飲むなど、小さく落ち着けることを優先してください。\n\n話したくなったら、またここから続けられます。",
  "休みたいと感じるほど、今は疲れがたまっているのかもしれません。\n\nまずは体が少し楽になることを一つだけしてみてください。\n\n相談先の情報は、右側に残しています。",
  "今は無理に整理を続けなくて大丈夫です。\n\n横になる、目を閉じる、静かな場所へ移るなど、できる範囲で休んでください。\n\nまた必要になったら戻ってきてください。",
  "少し休む選択は、逃げではありません。\n\n今は自分をこれ以上追い込まないことを優先して大丈夫です。\n\nつらさが急に強くなったら、右側の窓口につながってください。",
  "頭の中をいったん休ませる時間にして大丈夫です。\n\n今できることは、水分をとる、座る、横になるなど小さなことで十分です。\n\nまた話せそうなときに続けましょう。",
  "休みたいと思えたことは、自分の疲れに気づけたということでもあります。\n\n今は、安心できる場所で少し力を抜いてください。\n\n相談先を見ておきたいときは右側を開けます。",
  "今日はここまででも大丈夫です。\n\n今は気持ちを解決しようとせず、体を休ませることを先にしてください。\n\nまた言葉にしたくなったら、いつでも戻れます。",
  "今は少し離れる時間を作って大丈夫です。\n\n深呼吸を一回するだけでもかまいません。\n\n危険を感じるほどつらくなったら、ひとりで抱えず右側の窓口や近くの人につながってください。",
];

export default function CounselorClient() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const replyTimerRef = useRef<number | null>(null);
  const lastVariantRef = useRef<Record<string, number>>({});
  const messageIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

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
    const query = hasCrisis ? combinedUserText : combinedUserText + " " + activeConcern.resourceQuery;
    return rankSupportResources(query || "こころ 相談 24時間").slice(0, 4);
  }, [activeConcern.resourceQuery, combinedUserText, hasCrisis]);

  const chooseVariant = <T,>(group: string, variants: T[]) => {
    const previous = lastVariantRef.current[group];
    const index = randomIndex(variants.length, previous);

    lastVariantRef.current[group] = index;
    return variants[index];
  };

  const chooseSteps = (steps: string[]) => {
    const shuffled = shuffleItems(steps);
    return shuffled.slice(0, 2).map((step) => "・" + step).join("\n");
  };

  const nextMessageId = (role: "user" | "assistant") => {
    messageIdRef.current += 1;
    return role + "-" + messageIdRef.current;
  };

  const buildReply = (history: Message[]) => {
    const userMessages = history.filter((message) => message.role === "user");
    const userText = userMessages.map((message) => message.content).join("\n");
    const latestUserMessage = userMessages[userMessages.length - 1]?.content ?? "";
    const profile = pickConcern(userText);
    const turn = userMessages.length;

    if (hasCrisisSignal(latestUserMessage)) {
      return { content: crisisReply };
    }

    const recent = compactText(latestUserMessage);
    const context: ReplyContext = {
      profile,
      recent,
      hint: contextHint(userText),
      steps: chooseSteps(profile.nextSteps),
    };
    const latestNormalized = normalizeText(latestUserMessage);

    if (latestNormalized.includes("相談先") || latestNormalized.includes("窓口")) {
      return {
        content: chooseVariant("contact", contactReplyVariants),
        choices: contactChoices,
      };
    }

    if (latestNormalized.includes("休み")) {
      return {
        content: chooseVariant("rest", restReplyVariants),
        choices: [
          { id: "rest-water", label: "まず少し落ち着きたい", value: "まず少し落ち着きたいです" },
          { id: "rest-support", label: "相談先を見ておきたい", value: "相談先を見ておきたいです" },
          { id: "rest-more", label: "もう少し話したい", value: "もう少し話したいです" },
        ],
      };
    }

    if (turn === 1) {
      return {
        content: chooseVariant("first-" + profile.key, firstReplyVariants)(context),
        choices: profile.choices,
      };
    }

    if (turn === 2) {
      return {
        content: chooseVariant("second-" + profile.key, secondReplyVariants)(context),
        choices: actionChoices,
      };
    }

    return {
      content: chooseVariant("ongoing-" + profile.key, ongoingReplyVariants)(context),
      choices: profile.choices.slice(0, 3).concat([
        { id: "switch-" + turn, label: "別のことを話したい", value: "別のことも話したいです" },
      ]),
    };
  };

  const scrollToBottom = () => {
    window.setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const submitText = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isThinking) return;

    const userMessage: Message = {
      id: nextMessageId("user"),
      role: "user",
      content: trimmed,
    };
    const nextMessages = [...messages, userMessage];
    const isUrgent = hasCrisisSignal(trimmed);

    setMessages(nextMessages);
    setInput("");
    scrollToBottom();

    if (isUrgent) {
      const reply = buildReply(nextMessages);
      setMessages([
        ...nextMessages,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          content: reply.content,
          choices: reply.choices,
        },
      ]);
      scrollToBottom();
      return;
    }

    setIsThinking(true);
    const delay = randomReplyDelay();
    replyTimerRef.current = window.setTimeout(() => {
      const reply = buildReply(nextMessages);
      setMessages([
        ...nextMessages,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          content: reply.content,
          choices: reply.choices,
        },
      ]);
      setIsThinking(false);
      replyTimerRef.current = null;
      scrollToBottom();
    }, delay);
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    submitText(input);
  };

  const resetConversation = () => {
    if (replyTimerRef.current !== null) {
      window.clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
    lastVariantRef.current = {};
    setMessages(initialMessages);
    setInput("");
    setIsThinking(false);
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
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">
                    Guided conversation
                  </p>
                  <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
                    こころ整理ナビ
                  </h1>
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
                    選択肢と入力した言葉に合わせて、気持ちの整理と相談先探しをお手伝いします。入力内容はこのブラウザ内でだけ使われ、外部には送られません。
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["選んで進める", "無料", "保存なし", "診断ではありません"].map((label) => (
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
                  <div className="space-y-3">
                    <p className="text-sm font-black">今は安全を優先してください</p>
                    <p className="text-xs font-bold leading-relaxed">
                      自分や誰かの命・身体に危険があるときは、近くの大人、学校、医療機関、24時間相談窓口へすぐつながってください。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a href="tel:110" className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-black text-white">110 警察</a>
                      <a href="tel:119" className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-black text-white">119 救急・消防</a>
                      <a href="tel:189" className="rounded-lg bg-white px-3 py-2 text-xs font-black text-rose-700">189 児童相談所</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-7">
              {messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={message.role === "user" ? "max-w-[88%] whitespace-pre-wrap rounded-lg bg-slate-900 px-5 py-4 text-sm font-medium leading-relaxed text-white shadow-sm" : "max-w-[88%] whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium leading-relaxed text-slate-600 shadow-sm"}>
                    {message.content}
                    {message.role === "assistant" && message.choices && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200/70 pt-4">
                        {message.choices.map((choice) => (
                          <button
                            key={choice.id}
                            type="button"
                            disabled={isThinking}
                            onClick={() => submitText(choice.value)}
                            className="inline-flex items-center gap-1 rounded-full border border-blue-100 bg-white px-3 py-2 text-left text-[11px] font-black text-blue-600 transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {choice.label}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-3 rounded-lg bg-slate-50 px-5 py-3 text-xs font-bold text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                    いまの言葉をゆっくり整理しています
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
                今の話題: <span className="text-slate-800">{activeConcern.label}</span>
              </div>
              <div className="space-y-3">
                {suggestedResources.map((resource) => (
                  <article key={resource.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-black leading-relaxed text-slate-800">{resource.name}</h3>
                      {resource.phone && (
                        <a
                          href={"tel:" + resource.phone.replace(/-/g, "")}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white"
                          aria-label={resource.name + "に電話"}
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
                  onClick={resetConversation}
                  className="inline-flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  会話を最初からやり直す
                  <Trash2 className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>

            <p className="rounded-lg bg-white/70 p-4 text-[11px] font-bold leading-relaxed text-slate-400">
              このナビは、選択肢と入力内容に応じて返答を組み立てる仕組みです。人や生成AIが読んでいるわけではありません。医療・診断・専門カウンセリングではないため、危険が近いときは人につながることを優先してください。
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
