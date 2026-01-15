import { notFound } from "next/navigation";

import Link from "next/link";
import { CompanyPageSearchParams } from "@/types";
import { getCompanyPage } from "@/lib";


export default async function Page(props: {
	searchParams?: Promise<CompanyPageSearchParams>;
}) {

	const searchParams = await props.searchParams;

	const pageNumber = Number(searchParams?.page) || 0;
	const orderByDateApply = Boolean(searchParams?.orderByDateApply) || true;

	const data = await getCompanyPage(pageNumber, orderByDateApply);
	console.log(data);
	if (!data) return notFound();

	const { content, page } = data;

	return (
		<div className="border rounded shadow p-2">

			<div className="flex justify-between">
				<h1 className="font-medium h-fit"> Companies  </h1>

				<div className="flex gap-2">
					<span className="block h-fit px-1 border border-teal-300 bg-teal-100 text-teal-600">Page : {page.number + 1}</span>
					<div className="inline ">
						<input type="checkbox" className="mr-2 mt-1" />
						<label >
							{orderByDateApply ? "alphabetic ?" : "by last applied ?"}
						</label>
					</div>
				</div>
			</div>

			<hr className="my-2" />

			<div>
				{content.map(({ name, id }, k) => (
					<Link key={k} className="block border px-2 py-1 mb-2"
						href={`/company/${id}`}>
						<span> {id} </span>
						<span> {name} </span>
					</Link>
				))}
			</div>
		</div >
	);
}

// <span> SIZE </span>
// <span> url </span>
// <span> last application : five days ago (13-01-2026) </span>
// <span> multiple applications </span>
// <span> cities inlcude : Toulouse, Paris, Lyon ... </span>
