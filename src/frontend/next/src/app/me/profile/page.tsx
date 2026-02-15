import { MonoLayoutContent, MonoLayoutTitle } from '@/components/layout/Mono';

export default async function Home() {
  return (
    <>
      <MonoLayoutTitle title="Profile" />
      <MonoLayoutContent>
        <ul>
          <li>profile data</li>
          <li>profile settings</li>
        </ul>
      </MonoLayoutContent>
    </>
  );
}
