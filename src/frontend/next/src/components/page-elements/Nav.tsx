'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ROUTES, NavRouteType } from '@/lib';
import { Logout } from '../auth';

const TopBarItemBaseClass = `
inline-block border p-2 
rounded-lg text-neutral-700
transition-all 
hover:font-medium
hover:text-black 
hover:bg-neutral-100 
hover:cursor-pointer`;

const TopBarItemNavHighlistClass = `
data-[active=true]:font-medium
data-[active=true]:bg-neutral-100 data-[active=true]:text-black
data-[active=true]:hover:cursor-default`;

export const NavItem = ({ route: { path, label } }: { route: NavRouteType }) => {
  const pathname = usePathname();
  return (
    <Link data-active={pathname == path} className={TopBarItemBaseClass + TopBarItemNavHighlistClass} href={path}>
      {label}
    </Link>
  );
};

export const Nav = () => (
  <div className="p-1 rounded-xl border border-2 border-neutral-300">
    {NAV_ROUTES.map((route, index) => (
      <NavItem key={index} route={route} />
    ))}
  </div>
);

export const AddCandidNav = () => {
  const pathname = usePathname();
  return (
    <Link
      data-active={pathname == '/me/candid/add'}
      className={`${TopBarItemBaseClass} hover:font-normal p-1 border-r
        border-r-2 border-r-neutral-300 rounde-xl rounded-r-none `}
      href="/me/candid/add"
    >
      Add
    </Link>
  );
};

export const TopBar = () => (
  <div className="hidden my-3 sm:flex justify-between items-center">
    <Nav />
    <div className="rounded-xl p-1 flex items-center border border-2 border-neutral-300 overflow-hidden">
      <AddCandidNav />
      <Logout />
    </div>
  </div>
);
