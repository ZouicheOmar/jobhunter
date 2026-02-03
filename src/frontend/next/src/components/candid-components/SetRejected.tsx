'use client';
import { setCandidRejected } from '@/lib';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const SetRejected = ({ applicationId }: { applicationId: number }) => {
  const router = useRouter();
  return (
    <button
      className="inline-block rounded-md p-2 py-1 
          transition-all bg-neutral-200 hover:bg-neutral-300 h-fit
          dalay-500 cursor-pointer w-fit self-end"
      onClick={async () => {
        await setCandidRejected(applicationId);
        router.refresh();
      }}
    >
      <Trash size="1em" className="inline mr-[3px] mb-[2.5px]" />
      Set rejected
    </button>
  );
};
