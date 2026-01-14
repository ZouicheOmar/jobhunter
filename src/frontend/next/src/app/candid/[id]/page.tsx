import { notFound } from "next/navigation";


const getCandidById = async (id: number) => {
	return "add or get candid by id route" + id;
}

export default async function Page({
	params, }: {
		params: Promise<{ id: number }>
	}) {

	const { id } = await params;
	const candid = await getCandidById(id);

	if (!candid) return notFound();

	return (
		<div className="w-full">
			<p> page for a single candid fetched by id </p>
		</div >
	);
}
