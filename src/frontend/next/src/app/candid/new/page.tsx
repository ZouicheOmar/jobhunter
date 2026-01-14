import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from
	"@/components/schadcn/Select";

export default async function Page() {

	return (
		<div className="mt-4 p-4 border rounded shadow-sm">

			<div className="flex items-center gap-2">
				<input
					id="url"
					type="text"
					placeholder="url of the offer"
					className="w-full p-1 px-2 block bg-gray-100 rounded"
				/>

				<button> look up offer</button>
			</div>

			<div className="grid grid-rows-1 md:grid-rows-1 gap-3">
				<input
					type="text"
					className="h-fit p-1 px-2 block bg-gray-100 rounded"
					id="title"
					placeholder="Title"
				/>

				<input
					type="text"
					className="h-fit p-1 px-2 block bg-gray-100 rounded"
					id="title"
					placeholder="Company"
				/>

				<input
					type="text"
					className="h-fit p-1 px-2 block bg-gray-100 rounded"
					id="title"
					placeholder="City"
				/>

				<input
					type="text"
					className="h-fit p-1 px-2 block bg-gray-100 rounded"
					id="title"
					placeholder="Website"
				/>

				<div className="col-span-2 flex gap-3">
					<div className="grow-1 flex px-2 gap-3 bg-gray-100 rounded items-center">
						<label className="min-w-fit leading-[2em] text-muted-foreground">
							{" "}
							Application Date{" "}
						</label>
						<input
							id="dateApply"
							type="date"
							className="w-full h-full grow-1 "
						/>
					</div>

					<Select
						defaultValue="default"
					>
						<SelectTrigger className="grow-1 rounded border-none text-base">
							<SelectValue placeholder="Contract Type" />
						</SelectTrigger>

						<SelectContent position="popper" sticky="partial">
							<SelectItem value="default">non specified</SelectItem>
							<SelectItem value="default">full time</SelectItem>
							<SelectItem value="default">part time</SelectItem>
							<SelectItem value="default">internship </SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="mt-3">
				<div className="flex gap-2 items-baseline">
					<input
						id="tech"
						type="text"
						autoComplete="off"
						placeholder="Tech stack"
						className="w-full h-fit p-1 px-2 block bg-gray-100 rounded"
					/>
					<button
					>
						add
					</button>
				</div>

				<div className="px-1 flex md:flex-col gap-2">
					<div className=" w-1/2 h-fit">
						<p className="underline">Suggestions </p>
						<div>
							<p> tech completion list </p>
						</div>
					</div>

					<div className="w-1/2 h-fit">
						<p className="underline">Your list </p>
						<p> stack list </p>
					</div>
				</div>
			</div>


			<div className="inline mr-4">
				<input
					id="isCandidTech"
					type="checkbox"
					className="mr-1"
				/>
				<label htmlFor="isCandidTech" className="text-muted-foreground">
					{" "}
					tech offer ?{" "}
				</label>
			</div>

			<div className="inline mr-4">
				<input
					id="unsolicited"
					type="checkbox"
					className="mr-1"
				/>
				<label htmlFor="unsolicited">
					{" "}
					unsolicited ?{" "}
				</label>
			</div>

			<button className="px-2 py-0 mr-2 border rounded bg-neutral-300"> close </button>
			<button className="px-2 py-0 mr-2 border rounded bg-neutral-300"> clear </button>
			<button className="px-2 py-0 mr-2 border rounded bg-neutral-300"> submit </button>
		</div>
	);
}
