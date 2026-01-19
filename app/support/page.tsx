import { Suspense } from "react";
import SupportClient from "./SupportClient";

export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中…</div>}>
      <SupportClient />
    </Suspense>
  );
}
