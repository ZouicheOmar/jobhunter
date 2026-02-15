import Link from 'next/link';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../schadcn';

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
