import Link from "next/link";
import { Button } from "../schadcn/Button";

export const ServerCandidsActions = () => {
	return (
		<>
			<div className="mt-4 border rounded rounded-bl-md shadow-sm p-4">
				<div className="flex  gap-2 justify-start items-center">
					<div className="ml-2">

						<label htmlFor="cityFilter"
							className="border-l border-l-neutral-500 pl-2">
							city
						</label>
						<input
							id="cityFilter"
							type="text"
							placeholder="city"
							className="ml-2 pl-2 py-1 w-fit bg-neutral-200 rounded"
						/>
					</div>

					<div>
						<label
							htmlFor="companyFilter"
							className="border-l border-l-neutral-500 pl-2">
							company </label>
						<input
							id="companyFilter"
							type="text"
							placeholder="company"
							className="ml-2 pl-2 py-1 w-fit bg-neutral-200 rounded"
						/>
					</div>

					<Button
						className="p-2 px-4 ml-4
							bg-blue-100 text-blue-600 border
							border-blue-200 rounded-bl-md"
					>
						Compact
					</Button>

				</div>
			</div>
		</>
	);
};
