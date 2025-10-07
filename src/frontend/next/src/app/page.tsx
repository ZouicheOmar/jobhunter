import { CandidWrapper } from "@/components/CandidWrapper";
import StoreProvider from "./StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <div
        className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
      >
        <main className="flex flex-col md:max-w-[800px] gap-[32px] items-center sm:items-start w-full">
          <CandidWrapper />
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          ozdocs.fr
        </footer>
      </div>
    </StoreProvider>
  );
}
