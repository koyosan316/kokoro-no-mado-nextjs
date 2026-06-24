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

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "ここに来てくれてありがとうございます。うまく言葉にならなくても大丈夫です。今の気持ちを一文だけでも書いてみてください。",
  },
];

const quickPrompts = [
  "何から話せばいいか分からない",
  "学校や職場のことでつらい",
  "家族や身近な人のことで悩んでいる",
  "相談先を一緒に探したい",
];

const crisisReply =
  "今はAIと話すより、人につながることを優先してほしい状態かもしれません。自分や誰かの身に危険がある場合は、110・119、または近くの大人や支援者にすぐ知らせてください。ひとりで抱えなくて大丈夫です。";

export default function CounselorClient() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState("");
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

  const hasCrisis = hasCrisisSignal(combinedUserText);
  const suggestedResources = useMemo(
    () => rankSupportResources(combinedUserText || "こころ 相談 24時間").slice(0, 4),
    [combinedUserText],
  );

  const scrollToBottom = () => {
    window.setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setNotice("");
    scrollToBottom();

    if (hasCrisisSignal(trimmed)) {
      setMessages([...nextMessages, { role: "assistant", content: crisisReply }]);
      scrollToBottom();
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as {
        reply?: string;
        missingApiKey?: boolean;
        error?: string;
      };

      if (data.missingApiKey) {
        setNotice("AI相談を本番で使うには、Vercelに OPENAI_API_KEY を設定してください。");
      } else if (data.error) {
        setNotice(data.error);
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply ?? "すみません。今はうまく返答できませんでした。少し時間を置いて試してください。",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "通信がうまくいきませんでした。今すぐ危険がある場合は、AIではなく110・119や相談窓口につながってください。",
        },
      ]);
    } finally {
      setIsSending(false);
      scrollToBottom();
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            もどる
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-emerald-700 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            サイト側では会話を保存しません
          </div>
        </header>

        <section className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-h-[72vh] flex-col rounded-[2rem] border border-slate-100 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
            <div className="border-b border-slate-100 p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                  <Bot className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-300">
                    AI Counselor
                  </p>
                  <h1 className="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
                    AIカウンセラーと話す
                  </h1>
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
                    診断や治療ではなく、気持ちの整理と次の一歩を一緒に考えるための場所です。名前、住所、学校名、連絡先は書かないでください。
                  </p>
                </div>
              </div>
            </div>

            {hasCrisis && (
              <div className="mx-5 mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-900 sm:mx-7">
                <div className="flex items-start gap-3">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <div className="space-y-2">
                    <p className="text-sm font-black">今は人につながることを優先してください</p>
                    <p className="text-xs font-bold leading-relaxed">
                      命や身体に危険があるときは、110・119、近くの大人、学校、医療機関、相談窓口へすぐ連絡してください。
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
                    className={`max-w-[88%] rounded-[1.5rem] px-5 py-4 text-sm font-medium leading-relaxed shadow-sm ${
                      message.role === "user"
                        ? "bg-slate-900 text-white"
                        : "border border-slate-100 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-5 py-3 text-xs font-bold text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                    返答を考えています
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-slate-100 p-4 sm:p-5">
              {notice && (
                <p className="mb-3 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold leading-relaxed text-amber-800">
                  {notice}
                </p>
              )}
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="rounded-full bg-slate-50 px-4 py-2 text-[11px] font-bold text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
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
                  className="max-h-32 min-h-14 flex-1 resize-none rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-blue-200 focus:ring-4 focus:ring-blue-50"
                  placeholder="今の気持ちを少しだけ書いてみる"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="送信"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-300">
                    Support
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-800">合いそうな窓口</h2>
                </div>
                <Search className="h-5 w-5 text-slate-300" />
              </div>
              <div className="space-y-3">
                {suggestedResources.map((resource) => (
                  <article key={resource.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-sm font-black leading-relaxed text-slate-800">{resource.name}</h3>
                      {resource.phone && (
                        <a
                          href={`tel:${resource.phone.replace(/-/g, "")}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
                          aria-label={`${resource.name}に電話`}
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs font-bold leading-relaxed text-slate-500">{resource.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-white px-3 py-1 text-[10px] font-black text-slate-400">
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

            <div className="rounded-[2rem] border border-blue-100 bg-blue-50/60 p-5">
              <div className="mb-4 flex items-center gap-2 text-blue-600">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm font-black">ほかの入口</p>
              </div>
              <div className="grid gap-3">
                <Link
                  href="/support"
                  className="inline-flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  相談窓口を検索する
                  <Search className="h-4 w-4 text-slate-300" />
                </Link>
                <Link
                  href="/form"
                  className="inline-flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  相談メモを作る
                  <MessageCircle className="h-4 w-4 text-slate-300" />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(initialMessages);
                    setInput("");
                    setNotice("");
                  }}
                  className="inline-flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm"
                >
                  会話を消す
                  <Trash2 className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            </div>

            <p className="rounded-[1.5rem] bg-white/70 p-4 text-[11px] font-bold leading-relaxed text-slate-400">
              AI相談では、回答を作るために入力内容がOpenAI APIへ送信されます。個人を特定できる情報は書かないでください。
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
