'use client'

import { useAddCandidStore } from "@/stores/useAddCandid";
import { useShallow } from "zustand/shallow";

import { Button } from "./schadcn/Button";

export default function AddCandidLookupUrl() {

	const url = useAddCandidStore(useShallow((state) => state.url));
	const lookupUrl = useAddCandidStore((state) => state.lookupUrl);
	const updateUrl = useAddCandidStore((state) => state.updateUrl);

	return (<>
		<input
			id="url"
			type="text"
			placeholder="url of the offer"
			className="w-full p-1 px-2 block bg-gray-100 rounded"
			onChange={(e) => updateUrl(e.target.value)}
			value={url}
		/>
		<Button onClick={() => lookupUrl()}>look up offer</Button>
	</>);
}
