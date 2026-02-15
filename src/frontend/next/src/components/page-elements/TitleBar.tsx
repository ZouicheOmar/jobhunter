import { Pirata_One } from 'next/font/google';
const pone = Pirata_One({ weight: '400' });
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { WrapperProps } from '../types';

export const Wrapper = ({ children }: WrapperProps) => (
  <div
    className="
    relative p-8 px-2 md:border md:rounded-3xl overflow-hidden
    bg-white rounded-lg
    flex justify-between align-middle items-center"
  >
    {children}
  </div>
);

const BG = () => (
  <div className="z-0 w-full h-full absolute top-0 left-0 bg-[url(/shibuya.jpg)] bg-center mask-l-from-10% mask-l-to-70%"></div>
);

const Title = () => (
  <div className="z-10 my-auto cursor-pointer ">
    <p className={`px-2 text-blue-900 text-4xl ${pone.className}`}>
      <Link href="/"> Jobhunter </Link>
    </p>
  </div>
);

export const TitleBar = () => (
  <Wrapper>
    <BG />
    <Title />
    <MobileNav />
  </Wrapper>
);
