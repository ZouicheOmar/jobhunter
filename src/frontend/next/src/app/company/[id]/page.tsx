import { getCompanyById } from "@/lib";
import { Company } from "@/types";
import { notFound } from "next/navigation";

export default async function Page({
	params, }: {
		params: Promise<{ id: number }>
	}) {

	const { id } = await params;
	const company: Company | null = await getCompanyById(id);

	if (!company) return notFound();

	return (
		<div className="w-full">
			<p> Company by ID page </p>
			<p> {company.name} </p>

		</div >
	);
}
