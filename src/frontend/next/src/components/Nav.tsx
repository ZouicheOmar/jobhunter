'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ label, href }: { label: string, href: string }) => {
	const pathname = usePathname();

	return (
		<Link data-active={pathname == href}
			className="px-2 mr-2 hover:underline
			text-blue-200
			data-[active=true]:underline
			data-[active=true]:font-bold
			data-[active=true]:text-white"
			href={href}>
			{label}
		</Link>
	)
}

export const Nav = ({ currentPath }: { currentPath?: string }) => (
	<nav className="self-start shadow-sm my-4 p-2 bg-[#0b5394] rounded text-white flex justify-between">
		<div>
			<NavItem label="Home" href="/" />
			<NavItem label="Candids" href="/candids" />
			<NavItem label="Companies" href="/company" />
		</div>
		<div>
			<NavItem label="Add" href="/candid/new" />
		</div>
	</nav>
)
