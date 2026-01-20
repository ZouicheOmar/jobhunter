import { AddCandid } from "@/components/add-candid";
import { MonoLayoutTitle, MonoLayoutWrapper } from "@/components/layout/Mono";
import { notFound } from "next/navigation";

const getCandidById = async (id: number) => {
  return "add or get candid by id route" + id;
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const candid = await getCandidById(id);

  if (!candid) return notFound();

  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="Single Candidature Details" />
      <AddCandid />
    </MonoLayoutWrapper>
  );
}
