import Link from 'next/link';
import { Pirata_One } from 'next/font/google';

const pone = Pirata_One({ weight: '400' });

export const Logo = () => (
  <div className="z-10 cursor-pointer ">
    <p className={`px-2 text-blue-900 text-4xl ${pone.className}`}>
      <Link href="/"> Jobhunter </Link>
    </p>
  </div>
);
