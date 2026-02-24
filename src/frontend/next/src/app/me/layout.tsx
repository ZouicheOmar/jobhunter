import { MonoLayoutWrapper } from '@/components/layout/Mono';
import { Nav, TopBar } from '@/components/page-elements/Nav';

export default function MeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopBar />
      <main className="mt-8 sm:mt-2">
        <MonoLayoutWrapper>{children}</MonoLayoutWrapper>
      </main>
    </>
  );
}

// <Nav />
