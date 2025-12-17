import { CandidWrapper } from "@/components/CandidWrapper";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-items-center min-h-screen p-4  gap-16 "
    >
      <main className="flex flex-col md:max-w-[800px] gap-[32px] items-center sm:items-start w-full">
        <CandidWrapper />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-start justify-center">
        <span className="text-gray-600  text-xs"> <a href="https://ozdocs.fr"
          target="_blank"> ozdocs.fr </a> </span>
        <div className="flex flex-col gap-1">
          <a href="https://neovim.io/"><img src="vim_created_wq.gif" alt="neovim" /></a>
          <a href="http://www.wtfpl.net/"><img src="wtfpl-badge-1.png" width="88" alt="WTFPL" /></a>
        </div>
      </footer>
    </div>
  );
}
