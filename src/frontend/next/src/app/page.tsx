import { Login } from '@/components/auth';
import { MonoLayoutTitle, MonoLayoutWrapper } from '@/components/layout/Mono';
import { ROUTES, SCRAP_ORIGIN } from '@/lib';

export default async function Home() {
  const foo = async () => {
    try {
      const res = await fetch('http://jh-services:8000/extract/test');
      const data = await res.text();
      console.log('bsic debug', data, SCRAP_ORIGIN);
    } catch (e) {
      console.log('problem', e);
    }
  };
  await foo();

  // await handleService();
  return (
    <main className="mt-8 sm:mt-2">
      <MonoLayoutWrapper>
        <MonoLayoutTitle title="Sign in" />
        <Login />
      </MonoLayoutWrapper>
    </main>
  );
}
