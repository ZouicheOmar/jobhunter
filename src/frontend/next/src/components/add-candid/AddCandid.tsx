"use client";

import { AddCandidTitleInput } from "./AddCandidTitleInput";
import { AddCandidUrlInput } from "./AddCandidUrlInput";
import { AddCandidCityInput } from "./AddCandidCityInput";
import { AddCandidControls } from "./AddCandidControls";
import { AddCandidWebsiteInput } from "./AddCandidWebsiteInput";
import { AddCandidCompanyInput } from "./AddCandidCompanyInput";
import { AddCandidBooleans } from "./AddCandidBooleans";
import { AddCandidTechInput } from "./add-candid-tech-input";
import { AddCandidDateApplyInput } from "./AddCandidDateApplyInput";
import { AddCandidContractInput } from "./AddCandidContractInput";
import { AddCandidStatus } from "./AddCandidStatus";

const Title = () => (
  <p className="block text-2xl mb-6">Add a new application</p>
);

const Title = () => (
  <p className="block text-[#2f5af3] text-xl underline font-medium mb-6">
    Add a new application
  </p>
);

export function AddCandid() {
  // animate-pulse
  return (
    <div className="rounded-3xl [&>div]:mb-2">
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
    </div>
  );
}
