# こころのまど

Next.jsで作った、こころを落ち着けるための無料Webサイトです。

## こころ整理ナビ

`/counselor` は、外部AI APIを使わないブラウザ内の軽量ナビです。

- OpenAI / Gemini などのAPIキーは不要
- 入力内容は外部AIに送信しない
- 会話はサーバーに保存しない
- 医療・診断・専門カウンセリングではなく、気持ちの整理と相談先案内に限定

危険サインがある入力では、AI風の返答よりも緊急連絡や相談窓口を優先して表示します。

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Build

```bash
npm run build
```
