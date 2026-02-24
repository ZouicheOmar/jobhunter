import { FRONT_BASE } from '@/lib';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 p mt-8 justify-center items-center">
      <div
        className="
		border bg-red-200 text-red-600 border-red-200 rounded-xl p-2
		shadow border p-4 px-10 text-lg "
      >
        404 - Page Not Found
      </div>
      <Link
        href={FRONT_BASE}
        className="
				border border-neutral-400 bg-neutral-100 rounded-xl px-6 py-2 shadow w-fit
				hover:bg-neutral-800 hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="inline mr-2" size="1em" />
        Go home{' '}
      </Link>
    </div>
  );
}
