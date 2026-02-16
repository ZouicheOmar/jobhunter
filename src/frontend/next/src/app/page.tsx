import { Login } from '@/components/auth';
import { MonoLayoutContent, MonoLayoutTitle, MonoLayoutWrapper } from '@/components/layout/Mono';

export default async function Home() {
  return (
    <main className="mt-8 sm:mt-2">
      <MonoLayoutWrapper>
        <MonoLayoutTitle title="Sign in" />
        <MonoLayoutContent>
          <Login />
        </MonoLayoutContent>
      </MonoLayoutWrapper>
    </main>
  );
}
