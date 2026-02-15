import { MonoLayoutWrapper } from '@/components/layout/Mono';
import { Nav } from '@/components/page-elements/Nav';

export default function MeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main className="mt-8 sm:mt-2">
        <MonoLayoutWrapper>{children}</MonoLayoutWrapper>
      </main>
    </>
  );
}
