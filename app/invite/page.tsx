"use client";

import { useEffect, useState } from "react";
import InviteRenderer from "@/components/InviteRenderer";
import { decodeInvite, readInviteEncoded } from "@/lib/invite-codec";
import { validateInvite } from "@/lib/invite-validation";
import type { InviteData } from "@/lib/invite-types";

type State =
  | { status: "loading" }
  | { status: "ready"; data: InviteData }
  | { status: "missing" }
  | { status: "broken" };

export default function InvitePage() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const encoded = readInviteEncoded(window.location.search);
    if (!encoded) {
      setState({ status: "missing" });
      return;
    }
    try {
      const data = validateInvite(decodeInvite(encoded));
      setState(data ? { status: "ready", data } : { status: "broken" });
    } catch {
      setState({ status: "broken" });
    }
  }, []);

  if (state.status === "loading") return null;

  if (state.status === "missing") {
    return (
      <main className="page-center theme">
        <div className="invite-card">
          <h1 className="invite-title">초대장 정보를 찾을 수 없습니다.</h1>
          <p className="invite-subtitle">링크가 올바른지 확인해 주세요.</p>
        </div>
      </main>
    );
  }

  if (state.status === "broken") {
    return (
      <main className="page-center theme">
        <div className="invite-card">
          <h1 className="invite-title">초대장 링크가 손상되었습니다.</h1>
          <p className="invite-subtitle">새로운 링크를 요청해 주세요.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-center theme">
      <InviteRenderer data={state.data} />
    </main>
  );
}
