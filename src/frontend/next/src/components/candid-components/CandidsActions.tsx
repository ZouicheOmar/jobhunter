import { Button } from "../schadcn/Button";

export const CandidsActions = () => {
  return (
    <>
      {" "}
      <div className="bg-neutral-100 border rounded rounded-lg p-4">
        <div className="flex gap-2 justify-start items-center flex-wrap">
          <div>
            <label
              htmlFor="cityFilter"
              className="border-l border-l-neutral-500 pl-2"
            >
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
              className="border-l border-l-neutral-500 pl-2"
            >
              company
            </label>
            <input
              id="companyFilter"
              type="text"
              placeholder="company"
              className="ml-2 pl-2 py-1 w-fit bg-neutral-200 rounded"
            />
          </div>
          <Button className="p-2 px-4 bg-blue-100 text-blue-600 border border-blue-200 rounded-bl-md">
            Compact
          </Button>
        </div>
      </div>
    </>
  );
};
