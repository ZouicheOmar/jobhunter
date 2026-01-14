import { notFound } from "next/navigation";

import { CompanyPageSearchParams } from "@/types";
import { getCompanyPage } from "@/lib";


export default async function Page(props: {
	searchParams?: Promise<CompanyPageSearchParams>;
}) {

	const searchParams = await props.searchParams;
	const pageNumber = Number(searchParams?.page) || 0;

	const data = await getCompanyPage(pageNumber);
	console.log(data);
	if (!data) return notFound();

	const { content, page } = data;

	return (
		<div className="border mt-4 p-2">
			<p>
				Should display list of companies
				This pages
			</p>
			<div>
				{content.map((item, k) => (<p key={k}>{item.name}</p>))}
			</div>
		</div >
	);
}
