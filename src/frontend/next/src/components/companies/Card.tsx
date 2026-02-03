import { Company } from '@/types';
import Link from 'next/link';

export const CompanyCard = ({ cp }: { cp: Company }) => {
  const { id, name } = cp;
  return (
    <Link
      className="block border flex flex-col rounded-md justify-between p-2
      min-h-20 bg-neutral-100 hover:bg-neutral-50 transition-colors"
      href={`/company/${id}`}
    >
      <p className="text-cyan-600 italic"> {id} </p>
      <div className="flex justify-between items-end">
        <p className="text-sm min-w-fit text-end leading-none text-neutral-700">n applications</p>
        <p className="text-xl text-end capitalize font-medium">{name}</p>
      </div>
    </Link>
  );
};
