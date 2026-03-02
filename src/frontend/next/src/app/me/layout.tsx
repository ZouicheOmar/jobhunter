import { TitleBar } from '@/components/page-elements';
import { MonoLayoutWrapper } from '@/components/layout/Mono';
import { TopBar } from '@/components/page-elements/Nav';

export default function MeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TitleBar />
      <TopBar />
      <main className="mt-8 sm:mt-2 grow">
        <MonoLayoutWrapper>{children}</MonoLayoutWrapper>
      </main>
    </>
  );
}
