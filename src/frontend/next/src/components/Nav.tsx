import Link from "next/link";

const NavItem = ({ label, href }: { label: string, href: string }) =>
	<Link className="px-2 mr-2 hover:underline" href={href}>{label}</Link>

export const Nav = () => (<>
	<nav className="self-start shadow-sm mt-4 px-2 py-1 bg-[#0b5394] rounded text-white">
		<NavItem label="Home" href="/" />
		<NavItem label="Candids" href="/candids" />
		<NavItem label="Add" href="/candid/new" />
		<NavItem label="Companies" href="/company" />
	</nav>
</>)
