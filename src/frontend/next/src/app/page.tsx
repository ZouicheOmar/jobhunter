import { CandidWrapper } from "@/components/CandidWrapper";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="flex flex-col md:max-w-[800px] mx-auto items-center justify-items-center min-h-screen p-4  gap-16 "
    >
      <CandidWrapper />
      <Footer />
    </div >
  );
}
