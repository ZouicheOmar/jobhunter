import Image from "next/image";
import vimBadge from "../../public/vim_created_wq.gif";
import wtfpl from "../../public/wtfpl-badge-1.png"
import Link from "next/link";

export const Footer = () => (
	<footer className="w-full mt-4 flex flex-col gap-2 flex-wrap items-end">

		<a href="https://neovim.io/">
			<Image src={vimBadge} alt="neovim" />
		</a>

		<a href="http://www.wtfpl.net/">
			<Image src={wtfpl} width="88" alt="WTFPL" />
		</a>

		<Link href="https://ozdocs.fr">
			ozdocs.fr
		</Link>

	</footer>
)
