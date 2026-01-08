import { Candid } from "@/types";
import { Suspense } from "react";

type JobhunterCandidSearchParams = {
  query?: string;
  page?: string;
};

const API_BASE = "http://127.0.0.1:8080";

const foo = async (page: number) => {
  try {
    const req = await fetch(
      `http://127.0.0.1:8080/candid/candids?page=${page}`,
    );
    const json = await req.json();
    console.log(json);
    return json;
  } catch (e) {
    throw new Error("problem fetching paged candids");
  }
};

export default async function Page(props: {
  searchParams?: Promise<JobhunterCandidSearchParams>;
}) {
  // query data here
  // return a component with the list of candids
  // await api fetch(jobhunter/candids?page=1)

  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;

  const d = await foo(currentPage);

  return (
    <div className="w-[800px] mx-auto">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Candids page</h1>
      </div>
      <div>
        <p>pagination somwhere</p>
        <p>page : {currentPage}</p>
        {query && <p>query : {query}</p>}
        {d &&
          d.content.map((item: Candid, key: number) => (
            <div key={key} className="flex gap-2 border mb-1">
              <p>{item.title}</p>
              <p>{item.company.name}</p>
              <p>{item.city.name}</p>
              <p>{item.dateApply}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
