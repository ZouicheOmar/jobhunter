"use client";

import { AddCandid } from "@/components/add-candid";
import { MonoLayoutTitle, MonoLayoutWrapper } from "@/components/layout/Mono";

export default function Page() {
  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="new application" />
      <AddCandid />
    </MonoLayoutWrapper>
  );
}
