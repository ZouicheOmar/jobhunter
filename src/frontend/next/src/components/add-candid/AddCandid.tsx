'use client';

import { MonoLayoutContent } from '../layout/Mono';
import { AddCandidTechInput } from './add-candid-tech-input';
import { AddCandidBooleans } from './AddCandidBooleans';
import { AddCandidCityInput } from './AddCandidCityInput';
import { AddCandidCompanyInput } from './AddCandidCompanyInput';
import { AddCandidContractInput } from './AddCandidContractInput';
import { AddCandidControls } from './AddCandidControls';
import { AddCandidDateApplyInput } from './AddCandidDateApplyInput';
import { AddCandidStatus } from './AddCandidStatus';
import { AddCandidTitleInput } from './AddCandidTitleInput';
import { AddCandidUrlInput } from './AddCandidUrlInput';
import { AddCandidWebsiteInput } from './AddCandidWebsiteInput';

export function AddCandid() {
  return (
    <MonoLayoutContent className="rounded-3xl [&>div]:mb-2">
      <AddCandidStatus />
      <AddCandidUrlInput />
      <AddCandidTitleInput />
      <AddCandidCompanyInput />
      <AddCandidCityInput />
      <AddCandidWebsiteInput />
      <AddCandidDateApplyInput />
      <AddCandidTechInput />
      <AddCandidContractInput />
      <AddCandidBooleans />
      <AddCandidControls />
    </MonoLayoutContent>
  );
}
