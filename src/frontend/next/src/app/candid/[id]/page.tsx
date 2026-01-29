import { Candid } from '@/components/candid-components';
import { MonoLayoutTitle, MonoLayoutWrapper } from '@/components/layout/Mono';
import { getCandidById } from '@/lib';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const candid = await getCandidById(id);

  if (!candid) return notFound();

  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="Single Candidature Details" />
      <Candid data={candid} />
    </MonoLayoutWrapper>
  );
}
