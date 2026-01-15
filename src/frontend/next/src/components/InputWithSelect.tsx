
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { BasicTypeEntity, BasicTypeEntityFormat } from "@/types";

type InputWithSelectProps = {
	id: string;
	placeholder: string;
	value: string;
	completionList: BasicTypeEntity[];
	updateValue: (v: BasicTypeEntity) => void;
	updateCompletionList: (v: BasicTypeEntity[]) => void;
	getCompletion: (v: string) => Promise<BasicTypeEntity[]>; // should be general..
	formatItem: BasicTypeEntityFormat;
};

const LoadingSpan = () => (
	<span
		className="m-0 px-2 text-gray-300
    h-fit leading-[2em] inline-block"
	>
		Searching ...
	</span>
);

const NoResultsSpan = () => (
	<span
		className="m-0 px-2
    h-fit leading-[2em] inline-block text-red-400"
	>
		No result found...
	</span>
);

const CompletionListItem = ({ item, formatItem, cb }) => (
	<span
		onClick={() => cb(item)}
		className=" m-0 px-2 border rounded
                  w-full md:w-[49%] min-h-[2em] h-[2em]
                  leading-[2em] inline-block
                  cursor-pointer break-all"
	>
		{formatItem(item)}
	</span>
);

const CompletionList = ({ list, formatItem, cb }) => (
	<div
		className="h-fit min-h-[4.5em]
    flex flex-wrap gap-x-1
    gap-y-1 md:gap-y-0"
	>
		{list.map((i, k) => (
			<CompletionListItem key={k} item={i} formatItem={formatItem} cb={cb} />
		))}
	</div>
);

export default function InputWithSelect({
	id,
	placeholder,
	value,
	completionList,
	updateValue,
	updateCompletionList,
	getCompletion,
	formatItem,
}: InputWithSelectProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const delay = 500;

	const inputRef = useRef<HTMLInputElement>(null);
	const [TID, setTID] = useState<NodeJS.Timeout>();

	const handleSpanClick = useCallback(
		(item: BasicTypeEntity) => {
			updateValue(item);
			updateCompletionList([]);
			if (inputRef.current) inputRef.current.blur();
		},
		[value],
	);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			updateValue({ name: e.target.value, id: null });
			clearTimeout(TID);

			if (!e.target.value) {
				setError(false);
				setLoading(false);
				return;
			}

			setTID(
				setTimeout(async () => {
					try {
						setLoading(true);
						const data = await getCompletion(e.target.value);
						data.length ? setError(false) : setError(true);
						updateCompletionList(data);
					} catch (e) {
						throw new Error("could not fetch completion list");
					} finally {
						console.log("should be setting loading to false");
						setLoading(false);
					}
				}, delay),
			);
			setLoading(false);
		},
		[TID, loading],
	);

	return (
		<div className="rounded col-span-1 flex flex-col gap-1">
			<input
				id={id}
				ref={inputRef}
				type="text"
				className="w-full h-fit p-1 px-2 block bg-gray-100 rounded"
				autoComplete="off"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			{value.length ? (
				error ? (
					<NoResultsSpan />
				) : completionList.length ? (
					<CompletionList
						list={completionList}
						formatItem={formatItem}
						cb={handleSpanClick}
					/>
				) : loading ? (
					<LoadingSpan />
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	);
}
