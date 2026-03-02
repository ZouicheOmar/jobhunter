import { MobileNav } from './MobileNav';
import { WrapperProps } from '../types';
import { Logo } from './Logo';

export const Wrapper = ({ children }: WrapperProps) => (
  <div
    className="
    relative p-8 px-2 md:border md:rounded-3xl overflow-hidden
    bg-white rounded-lg min-h-fit
    flex justify-between align-middle items-center"
  >
    {children}
  </div>
);

const BG = () => (
  <div className="z-0 w-full h-full absolute top-0 left-0 bg-[url(/shibuya.jpg)] bg-center mask-l-from-10% mask-l-to-70%"></div>
);

export const TitleBar = () => (
  <Wrapper>
    <BG />
    <Logo />
    <MobileNav />
  </Wrapper>
);
