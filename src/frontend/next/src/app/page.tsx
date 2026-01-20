import { notFound } from "next/navigation";

import { MonoLayoutTitle, MonoLayoutWrapper } from "@/components/layout/Mono";
import { Stat, StatCard } from "@/components/ui-elements";
import { getStats } from "@/lib/api/stats";
import { daysAgo } from "../lib/utils";
import { TopCities } from "@/components/ui-elements/TopCities";

export default async function Home() {
  const data = await getStats();
  if (!data) return notFound();

  const {
    numCandids: totalCandids,
    numUnsolicited,
    lastCandid,
    topCities,
  } = data;
  const days = daysAgo(lastCandid.dateApply);

  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="Overview " />

      <div className="flex gap-2 mb-6 flex-wrap">
        <StatCard label="Last applied" data={days} />
        <StatCard label="Total Applications" data={totalCandids} />
        <StatCard label="Unsolicited Applications" data={numUnsolicited} />
        <StatCard
          label="Top City"
          data={topCities[0].city.name}
          dataSecond={`${topCities[0].numCandids} applications`}
        />
      </div>

      <TopCities list={topCities} total={totalCandids} />
    </MonoLayoutWrapper>
  );
}
