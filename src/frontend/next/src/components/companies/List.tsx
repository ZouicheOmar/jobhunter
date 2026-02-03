import { Company } from '@/types';
import { CompanyCard } from './Card';

export const CompaniesPageList = ({ data }: { data: Company[] }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 mb-8">
      {data.map((cp, k) => (
        <CompanyCard cp={cp} key={k} />
      ))}
    </div>
  );
};
