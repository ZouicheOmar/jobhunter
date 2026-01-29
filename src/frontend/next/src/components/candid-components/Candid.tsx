import { Candid as CandidType } from '@/types';
import { Button } from '../schadcn';
import Link from 'next/link';

const Bdiv = ({ children }) => <div className="border p-2 rounded-lg"> {children} </div>;

export const Candid = ({
  data: { id, title, url, unsolicited, techOffer, dateApply, answer, company, city, website, contract, stack },
}: {
  data: CandidType;
}) => (
  <>
    <div className="flex flex-col gap-2">
      <p className="px-1 text-lg font-medium"> {title} </p>
      <div className="self-end">
        <Link href={`/candid/${id}/update`}> Update </Link>
      </div>
      <Bdiv>
        <p> status </p>
      </Bdiv>
      <Bdiv>
        <p> ID {id} </p>
        <p> {company.name} </p>
        <p> {url} </p>
        <p> {city?.name} </p>
        <p> {website.name} </p>
        <p> {contract.type} </p>
        <div>
          {stack.map(({ name }, k) => (
            <span key={k}> {name} </span>
          ))}
        </div>
      </Bdiv>
      <Bdiv>
        <p> description </p>
      </Bdiv>
      <Bdiv>
        <p> documents </p>
        <p> mail if any </p>
        <p> linkedin message if any </p>
        <p> cover letter if any </p>
      </Bdiv>
    </div>
  </>
);
