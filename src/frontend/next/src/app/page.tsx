import { notFound } from 'next/navigation';

import { MonoLayoutTitle, MonoLayoutWrapper } from '@/components/layout/Mono';
import { StatCard, StatTopCities } from '@/components/ui-elements';
import { getStats } from '@/lib/api/stats';
import { daysAgo } from '../lib/utils';

export default async function Home() {
  const data = await getStats();
  if (!data) return notFound();

  const { numCandids: totalCandids, numUnsolicited, lastCandid, topCities } = data;
  const days = daysAgo(lastCandid.dateApply);

  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="Overview" />

      <div className="flex gap-2 mb-6 flex-wrap">
        <StatCard label="Last applied" data={days} />
        <StatCard label="Total Applications" data={totalCandids} />
        <StatCard label="Unsolicited Applications" data={numUnsolicited} />
        <StatTopCities list={topCities} total={totalCandids} />
      </div>
    </MonoLayoutWrapper>
  );
}
