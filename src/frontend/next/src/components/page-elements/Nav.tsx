"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavAlt = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();

  return (
    <Link
      data-active={pathname == href}
      href={href}
      className="inline-block 
      mr-1 last:mr-0
      p-2 rounded-lg
      md:text-normal
      text-neutral-700 
      hover:bg-neutral-100
      data-[active=true]:font-medium data-[active=true]:bg-neutral-100
      data-[active=true]:text-black
      transition-colors transition-border"
    >
      {label}
    </Link>
  );
};

const NavAdd = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();

  return (
    <div className="">
      <Link
        data-active={pathname == href}
        href={href}
        className="inline-block 
      border 
      hover:font-medium 
      hover:text-black
      hover:bg-neutral-100 
      p-2 rounded-lg
      text-neutral-700 
      transition-all
      data-[active=true]:font-medium
      data-[active=true]:bg-neutral-100
      data-[active=true]:text-black
      data-[active=true]:hover:cursor-default
      hover:cursor-pointer 
        "
      >
        {label}
      </Link>
    </div>
  );
};

const Pages = () => {
  return (
    <div className="p-1 rounded-xl border border-2 border-neutral-300">
      <NavAlt label="Home" href="/" />
      <NavAlt label="Candids" href="/candids" />
      <NavAlt label="Companies" href="/company" />
      <NavAlt label="Dashboard" href="/dashboard" />
    </div>
  );
};

export const Nav = () => (
  <nav className="hidden my-3 sm:flex justify-between items-center">
    <Pages />
    <NavAdd label="Add +" href="/candid/new" />
  </nav>
);
