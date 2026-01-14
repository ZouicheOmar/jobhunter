import { notFound } from "next/navigation";

import { CandidsPageSearchParams } from "@/types";
import { getCandidsPage } from "@/lib";

import { ServerCandidList } from "@/components/serverComponents/ServerCandidList";
import { ServerCandidsActions } from "@/components/serverComponents/ServerCandidsActions";
import { Pagination } from "@/components/serverComponents/Pagination";


export default async function Page(props: {
	searchParams?: Promise<CandidsPageSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const pageNumber = Number(searchParams?.page) || 0;

	const data = await getCandidsPage(pageNumber);
	if (!data) return notFound();

	const { content, page } = data;

	return (
		<div className="w-full">
			<ServerCandidsActions />
			<ServerCandidList candids={content} />
			<Pagination page={page} />
		</div >
	);
}
