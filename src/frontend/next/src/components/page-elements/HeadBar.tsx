import Link from 'next/link';
import { Pirata_One } from 'next/font/google';

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../schadcn';
import { Nav } from './Nav';
import React from 'react';
import { WrapperProps } from '../types';

const pone = Pirata_One({ weight: '400' });

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

export const MobileNav = () => (
  <div className="sm:hidden z-10">
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="
                bg-neutral-100
                active:bg-neutral-200
                animate-colors
            border border-neutral-400
            px-4 py-1 rounded-xl
            font-medium
          "
        >
          Menu
        </button>
      </DrawerTrigger>
      <DrawerContent className="mb-10">
        <DrawerHeader>
          <DrawerTitle>Pages</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col p-2 rounded text-xl font-medium capitalize my-2 & > *:p-2">
          <nav className="mb-6 mt-8 flex flex-col gap-3 justify-between">
            <DrawerClose asChild>
              <Link className="border rounded-xl text-center p-2 shadow-sm" href="/">
                {' '}
                home{' '}
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link className="border rounded-xl text-center p-2 shadow-sm" href="/candids/">
                candidatures
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link className="border rounded-xl text-center p-2 shadow-sm" href="/company/">
                Companies
              </Link>
            </DrawerClose>

            <DrawerClose asChild>
              <Link className="border rounded-xl text-center p-2 shadow-sm" href="/candid/add/">
                Add +
              </Link>
            </DrawerClose>
          </nav>
        </div>
        <DrawerFooter className="text-center text-neutral-300 text-md">Jobhunter | ozdocs.fr</DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
);

const Wrapper = ({ children }: WrapperProps) => (
  <div
    className="
    relative p-8 px-2 md:border md:rounded-3xl overflow-hidden
    bg-white rounded-lg
    flex justify-between align-middle items-center"
  >
    {children}
  </div>
);

export const HeadBar = () => {
  return (
    <div className="sm:px-4">
      <Wrapper>
        <BG />
        <Title />
        <MobileNav />
      </Wrapper>
      <Nav />
    </div>
  );
};
