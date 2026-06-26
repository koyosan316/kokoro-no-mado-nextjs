import { Suspense } from "react";
import SupportClient from "./SupportClient";

export const metadata = {
  title: "相談窓口を探す | こころのまど",
  description: "悩みや相談方法に合わせて、公的な相談窓口を探せます。",
};

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <SupportClient />
    </Suspense>
  );
}
