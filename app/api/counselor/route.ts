import { NextResponse } from "next/server";
import { hasCrisisSignal, rankSupportResources } from "../../data/supportResources";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = [
  "あなたは「こころのまど」のAIカウンセラーです。",
  "役割は、ユーザーの気持ちを否定せずに受け止め、状況を整理し、次の小さな一歩と相談窓口につなげることです。",
  "医師、心理士、弁護士、警察、行政窓口の代わりではありません。診断、治療方針、薬の助言、法的断定はしません。",
  "返答は日本語で、やさしく、短めに。最初に共感、次に整理、最後に小さな提案を置いてください。",
  "自傷・希死念慮・暴力・虐待・性被害など命や安全に関わる内容では、今いる場所の安全確保、信頼できる人や緊急窓口への連絡を最優先に促してください。",
  "個人情報、連絡先、SNS ID、住所、学校名、実名は書かないよう促してください。",
].join("\n");

const fallbackReply =
  "来てくれてありがとうございます。AI相談の接続はまだ準備中ですが、ここに書こうとした気持ちは大切にしていいものです。今すぐできることとして、深呼吸を一回だけして、つらさを「体のこと」「人間関係」「学校・仕事」「家のこと」のどれに近いか分けてみてください。強いつらさや危険があるときは、AIではなく人につながる窓口を優先してください。";

function compactMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

function extractOutputText(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const response = data as {
    output_text?: string;
    output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  };

  if (typeof response.output_text === "string") return response.output_text;

  return (
    response.output
      ?.flatMap((item) => item.content ?? [])
      .filter((content) => content.type === "output_text" && typeof content.text === "string")
      .map((content) => content.text)
      .join("\n")
      .trim() ?? ""
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? compactMessages(body.messages) : [];
    const latestUserText = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

    if (!latestUserText.trim()) {
      return NextResponse.json({ error: "相談内容を入力してください。" }, { status: 400 });
    }

    const resources = rankSupportResources(latestUserText).slice(0, 4);

    if (hasCrisisSignal(latestUserText)) {
      return NextResponse.json({
        crisis: true,
        resources,
        reply:
          "とても危ない状態かもしれません。今この瞬間に自分や誰かの命・身体に危険があるなら、AIへの相談より先に110、119、または近くの大人・支援者へ連絡してください。ひとりで抱えず、電話やチャットの窓口にも今すぐつながってください。",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: fallbackReply,
        resources,
        missingApiKey: true,
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5.5",
        instructions: SYSTEM_PROMPT,
        input: messages,
        max_output_tokens: 600,
        reasoning: { effort: "low" },
        store: false,
        text: { verbosity: "low" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        reply: fallbackReply,
        resources,
        error: "AI相談に一時的につながりませんでした。",
      });
    }

    const data = await response.json();
    const reply = extractOutputText(data) || fallbackReply;

    return NextResponse.json({ reply, resources });
  } catch {
    return NextResponse.json(
      {
        reply: fallbackReply,
        error: "相談内容をうまく読み取れませんでした。",
      },
      { status: 500 },
    );
  }
}
