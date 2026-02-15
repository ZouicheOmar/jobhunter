import { Login } from '@/components/auth';
import { MonoLayoutContent, MonoLayoutWrapper } from '@/components/layout/Mono';

export default async function Home() {
  return (
    <main className="mt-8 sm:mt-2">
      <MonoLayoutWrapper>
        <MonoLayoutContent>
          <ul>
            <li> should login here </li>
            <li> every request to me/** should be intercepted by proxy to check valid session token </li>
          </ul>
          <Login />
        </MonoLayoutContent>
      </MonoLayoutWrapper>
    </main>
  );
}
