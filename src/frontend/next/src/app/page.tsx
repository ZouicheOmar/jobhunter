import { Login } from '@/components/auth';
import { Logo } from '@/components/page-elements';

export default async function Home() {
  return (
    <main className="mt-8 sm:mt-2 p-4 grow">
      <div className="rounded-xl flex flex-col h-full justify-center items-center gap-4">
        <Logo />
        <Login />
      </div>
    </main>
  );
}
