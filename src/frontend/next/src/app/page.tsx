import { CandidWrapper } from "@/components/CandidWrapper";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-items-center min-h-screen p-4  gap-16 "
    >
      <main className="flex flex-col md:max-w-[800px] gap-[32px] items-center sm:items-start w-full">
        <CandidWrapper />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        ozdocs.fr
      </footer>
    </div>
  );
}
