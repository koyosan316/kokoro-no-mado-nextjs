import CounselorClient from "./CounselorClient";

export const metadata = {
  title: "こころ整理ナビ | こころのまど",
  description:
    "外部AIに送らず、ブラウザ内で気持ちの整理と相談窓口探しを手伝う無料の相談ナビです。",
};

export default function CounselorPage() {
  return <CounselorClient />;
}
