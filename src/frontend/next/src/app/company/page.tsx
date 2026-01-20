import { notFound } from "next/navigation";

import Link from "next/link";
import { CompanyPageSearchParams } from "@/types";
import { getCompanyPage } from "@/lib";

import { MonoLayoutTitle, MonoLayoutWrapper } from "@/components/layout/Mono";
import { Pagination } from "@/components/page-elements";

const Alphabetic = () => (
  <div className="border rounded-md bg-neutral-100 p-2 transition-all hover:bg-white hover:shadow">
    <label htmlFor="alphabetic" className="inline-block capitalize mr-2">
      alphabetic ?
    </label>
    <input type="checkbox" name="alphabetic" className="border p-3" />
  </div>
);

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
    <MonoLayoutWrapper>
      <MonoLayoutTitle title="companies" />

      <div className="flex justify-end mb-4">
        <Alphabetic />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-8">
        {content.map(({ name, id }, k) => (
          <Link
            key={k}
            className="block border flex flex-col rounded-md justify-between p-2 min-h-20 shadow bg-white hover:shadow-md transition-all"
            href={`/company/${id}`}
          >
            <p className="text-cyan-700 italic"> {id} </p>
            <div className="flex justify-between items-end">
              <p className="text-sm min-w-fit text-end leading-none font-medium text-neutral-700">
                60 applications
              </p>
              <p className="text-xl text-end capitalize font-medium">{name}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination page={page} />
    </MonoLayoutWrapper>
  );
}

// <div className="inline ">
//   <input type="checkbox" className="mr-2 mt-1" />
//   <label>
//     {orderByDateApply ? "alphabetic ?" : "by last applied ?"}
//   </label>
// </div>

// <span> SIZE </span>
// <span> url </span>
// <span> last application : five days ago (13-01-2026) </span>
// <span> multiple applications </span>
// <span> cities inlcude : Toulouse, Paris, Lyon ... </span>
