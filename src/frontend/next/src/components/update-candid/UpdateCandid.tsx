'use client';
import { useUpdateCandidStore } from '@/stores/use-update-candid';
import { CandidUpdateRestricted } from '@/types';
import Link from 'next/link';
import { useEffect } from 'react';

const UpdateBoolean = ({
  label,
  defaultC,
  val,
  updateVal,
}: {
  label: string;
  defaultC: boolean;
  val: boolean;
  updateVal: (v: boolean) => void;
}) => {
  return (
    <div className={`border rounded-xl p-4 transition-colors ${val ? 'bg-neutral-200' : 'bg-inherit'}`}>
      <span className="capitalize mr-2 cursor-default"> {label} </span>
      <input
        type="checkbox"
        className="border rounded px-2 py-1"
        defaultChecked={defaultC}
        onChange={(e) => updateVal(e.target.checked)}
      />
    </div>
  );
};

const Controls = ({ id }: { id: number }) => {
  const updateCandid = useUpdateCandidStore((s) => s.updateCandid);
  return (
    <div className="flex justify-end gap-2">
      <Link className="p-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 transition-colors" href={`/candid/${id}`}>
        Cancel
      </Link>
      <button className="p-2 rounded-lg bg-orange-300 cursor-pointer text-black hover:bg-orange-500 transition-colors">
        Clear
      </button>
      <button
        onClick={() => updateCandid(id)}
        className="p-2 rounded-lg bg-teal-700 text-white cursor-pointer hover:bg-teal-600 transition-colors"
      >
        Update
      </button>
    </div>
  );
};

const UpdateBooleans = ({
  unsolicited = false,
  techOffer = false,
  answer = false,
  rejected = false,
}: {
  unsolicited?: boolean;
  techOffer?: boolean;
  answer?: boolean;
  rejected: boolean;
}) => {
  const techOfferState = useUpdateCandidStore((s) => s.techOffer);
  const updateTechOffer = useUpdateCandidStore((s) => s.updateTechOffer);

  const answerState = useUpdateCandidStore((s) => s.answer);
  const updateAnswer = useUpdateCandidStore((s) => s.updateAnswer);

  const rejectedState = useUpdateCandidStore((s) => s.rejected);
  const updateRejected = useUpdateCandidStore((s) => s.updateRejected);

  const unsoState = useUpdateCandidStore((s) => s.unsolicited);
  const updateUnso = useUpdateCandidStore((s) => s.updateUnsolicited);

  useEffect(() => {
    // this should just be an initial state
    updateTechOffer(techOffer);
    updateAnswer(answer);
    updateRejected(rejected);
    updateUnso(unsolicited);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <UpdateBoolean label="Answer" val={answerState} updateVal={updateAnswer} defaultC={answer} />
      <UpdateBoolean label="tech offer" val={techOfferState} updateVal={updateTechOffer} defaultC={techOffer} />
      <UpdateBoolean label="Unsolicited" val={unsoState} updateVal={updateUnso} defaultC={unsolicited} />
      <UpdateBoolean label="Rejected" val={rejectedState} updateVal={updateRejected} defaultC={rejected} />
    </div>
  );
};

const Title = ({ title, id }: { title?: string; id: number }) => (
  <p className="font-medium text-xl">{`${title} (${id})`}</p>
);

export const UpdateCandid = ({
  data: { id, url, title, unsolicited, techOffer, answer, rejected },
}: {
  data: CandidUpdateRestricted;
}) => {
  const titleState = useUpdateCandidStore((s) => s.title);
  const updateTitle = useUpdateCandidStore((s) => s.updateTitle);

  return (
    <div className="flex flex-col gap-4">
      <Title title={titleState || title} id={id} />

      <div className="flex flex-col flex-wrap gap-2">
        <div className="border rounded-xl  p-4 overflow-hidden">
          <p className="text-xl font-medium"> URL </p>
          <div className="mt-2 flex flex-col gap-1">
            <p>
              Current : <span className="text-neutral-600 break-all"> {url} </span>
            </p>
            <input type="text" placeholder="new url ?" className="rounded mt-2 p-2 bg-neutral-200 w-full" />
          </div>
        </div>

        <div className="border rounded-xl p-4 ">
          <p className="text-xl font-medium"> Title </p>
          <div className="mt-2 flex flex-col gap-1">
            <p>
              From : <span className="text-neutral-600"> {title} </span>
            </p>
            <div className="flex gap-2 items-center">
              <label> Title </label>
              <input
                type="text"
                placeholder="to"
                onChange={(e) => updateTitle(e.target.value)}
                className="rounded px-2 py-1 bg-neutral-200 grow"
              />
            </div>
          </div>
        </div>
        <UpdateBooleans unsolicited={unsolicited} techOffer={techOffer} answer={answer} rejected={rejected} />
      </div>
      <Controls id={id} />
    </div>
  );
};
