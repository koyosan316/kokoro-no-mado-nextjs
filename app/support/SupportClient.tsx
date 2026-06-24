"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, ExternalLink, Heart, Phone, Search, ShieldCheck } from "lucide-react";
import { hasCrisisSignal, methodOptions, rankSupportResources } from "../data/supportResources";

export default function SupportClient() {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState<(typeof methodOptions)[number]>("すべて");
  const results = useMemo(() => rankSupportResources(query || "こころ 相談", method), [query, method]);
  const crisis = hasCrisisSignal(query);

  return (
    <main className="min-h-screen bg-[#FBFAF9] text-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            もどる
          </Link>
          <Link
            href="/counselor"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-black"
          >
            <Bot className="h-4 w-4" />
            AIに相談する
          </Link>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.05)] sm:p-8">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.35em] text-emerald-300">
              Counseling Guide
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">
              相談窓口を探す
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
              いまの状況や気持ちを少し書くと、合いそうな相談先を上から表示します。名前、住所、学校名、SNS IDなどは書かないでください。
            </p>

            <div className="mt-8 rounded-[2rem] border border-slate-100 bg-slate-50 p-4">
              <label className="mb-3 flex items-center gap-2 text-xs font-black text-slate-500">
                <Search className="h-4 w-4" />
                状況や探したい窓口
              </label>
              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium leading-relaxed text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50"
                placeholder="例: 夜に不安が強い、学校のことで相談したい、電話よりチャットがいい"
              />
            </div>

            {crisis && (
              <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
                <div className="flex items-start gap-3">
                  <Heart className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <div className="space-y-2">
                    <p className="text-sm font-black">今すぐ人につながることを優先してください</p>
                    <p className="text-xs font-bold leading-relaxed">
                      自分や誰かの命・身体に危険があるときは、110・119、近くの大人、学校、医療機関、24時間窓口へすぐ連絡してください。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-[2.5rem] border border-blue-100 bg-blue-50/60 p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-500 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-black text-slate-800">迷ったときの目安</h2>
            <p className="mt-3 text-sm font-bold leading-relaxed text-slate-500">
              危険が近いときは緊急連絡。強いつらさは24時間窓口。電話が苦手ならチャットやSNS。地域の支援を探すなら公的な検索サイトが使えます。
            </p>
          </aside>
        </section>

        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {methodOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMethod(option)}
                className={`rounded-full px-5 py-2.5 text-xs font-black transition ${
                  method === option
                    ? "bg-slate-900 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {results.map((resource) => (
            <article
              key={resource.id}
              className={`rounded-[2rem] border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl ${
                resource.emergency ? "border-rose-100" : "border-slate-100"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {resource.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-[10px] font-black ${
                          tag === "緊急" || tag === "24時間"
                            ? "bg-rose-50 text-rose-500"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-black leading-relaxed text-slate-800">{resource.name}</h3>
                </div>
                {resource.phone && (
                  <a
                    href={`tel:${resource.phone.replace(/-/g, "")}`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600"
                    aria-label={`${resource.name}に電話`}
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                )}
              </div>

              <p className="text-sm font-medium leading-relaxed text-slate-500">{resource.description}</p>

              <dl className="mt-5 grid gap-3 text-xs font-bold text-slate-500">
                <div className="flex gap-4">
                  <dt className="w-20 shrink-0 text-slate-300">受付</dt>
                  <dd>{resource.hours}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-20 shrink-0 text-slate-300">対象</dt>
                  <dd>{resource.target}</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-20 shrink-0 text-slate-300">方法</dt>
                  <dd>{resource.methods.join(" / ")}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                {resource.phone && (
                  <a
                    href={`tel:${resource.phone.replace(/-/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-xs font-black text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600"
                  >
                    <Phone className="h-4 w-4" />
                    電話する
                  </a>
                )}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-5 py-3 text-xs font-black text-slate-600 transition hover:bg-slate-100"
                >
                  公式サイト
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
