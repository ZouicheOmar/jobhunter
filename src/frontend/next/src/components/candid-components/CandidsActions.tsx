'use client';
import { ChangeEventHandler, useState } from 'react';
import { Button } from '../schadcn/Button';
import { setTimeout } from 'timers';
import { getCityCompletion, getTechCompletion, ROUTES } from '@/lib';
import { useCandidsPageFilters } from '@/stores/use-candids-page-filters';
import { redirect } from 'next/navigation';
import { COMPLETION_DELAY } from '@/lib';
import { City, Tech, TechCreate } from '@/types';

const FilterButton = () => {
  const { id: techId } = useCandidsPageFilters((s) => s.tech);
  const { id: cityId } = useCandidsPageFilters((s) => s.city);
  const resetCompletions = useCandidsPageFilters((s) => s.resetCompletions);

  const handleClick = () => {
    const route = `?tech_id=${techId}&city_id=${cityId}`;
    resetCompletions();
    redirect(route);
  };

  return (
    <Button
      onClick={handleClick}
      className="p-2 px-4 bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200 rounded-bl-md"
    >
      Filter
    </Button>
  );
};

const CityFilter = () => {
  const city = useCandidsPageFilters((s) => s.city);
  const cityCompletion = useCandidsPageFilters((s) => s.cityCompletion);
  const updateCity = useCandidsPageFilters((s) => s.updateCity);
  const updateCityCompletion = useCandidsPageFilters((s) => s.updateCityCompletion);

  const [tOut, setTOut] = useState<NodeJS.Timeout>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    updateCity({ name: v, id: null });

    if (v == '') updateCityCompletion([]);

    clearTimeout(tOut);

    setTOut(
      setTimeout(async () => {
        console.log(v);
        const completion = await getCityCompletion(v);
        console.log(completion);
        updateCityCompletion(completion);
      }, COMPLETION_DELAY)
    );
  };

  const handleItemClick = (item: City) => {
    updateCity(item);
    updateCityCompletion([]);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="cityFilter" className="h-fit w-16 border-l border-l-neutral-500 pl-2">
        City
      </label>
      <div className="inline-block relative">
        <input
          type="text"
          value={city.name}
          onChange={handleChange}
          placeholder="Paris, Toulouse..."
          autoComplete="off"
          className="ml-2 pl-2 py-1 w-fit bg-neutral-200 rounded"
        />
        {cityCompletion.length ? (
          <ul className="border absolute w-96/100 bg-neutral-100 rounded-lg mt-2 p-1 ml-2 z-10">
            {cityCompletion.map((i, k) => (
              <li
                key={k}
                onClick={() => handleItemClick(i)}
                className="px-2 py-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer"
              >
                {i.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const TechFilter = () => {
  const tech = useCandidsPageFilters((s) => s.tech);
  const techCompletion = useCandidsPageFilters((s) => s.techCompletion);
  const updateTech = useCandidsPageFilters((s) => s.updateTech);
  const updateTechCompletion = useCandidsPageFilters((s) => s.updateCityCompletion);

  const [tOut, setTOut] = useState<NodeJS.Timeout>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    updateTech({ name: v, id: null });
    if (v == '') updateTechCompletion([]);

    clearTimeout(tOut);

    setTOut(
      setTimeout(async () => {
        const completion = await getTechCompletion(v);
        updateTechCompletion(completion);
      }, COMPLETION_DELAY)
    );
  };

  const handleItemClick = (item: Tech | TechCreate) => {
    updateTech(item);
    updateTechCompletion([]);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="cityFilter" className="h-fit w-16 border-l border-l-neutral-500 pl-2">
        Tech
      </label>
      <div className="inline-block relative">
        <input
          type="text"
          value={tech.name}
          onChange={handleChange}
          placeholder="React, Java.."
          autoComplete="off"
          className="ml-2 pl-2 py-1 w-fit bg-neutral-200 rounded"
        />
        {techCompletion.length > 0 ? (
          <ul className="border absolute w-96/100 bg-neutral-100 rounded-lg mt-2 p-1 ml-2 z-10">
            {techCompletion.map((i, k) => (
              <li
                key={k}
                onClick={() => handleItemClick(i)}
                className="px-2 py-1 rounded-md hover:bg-neutral-200 hover:cursor-pointer"
              >
                {i.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export const CandidsActions = () => {
  return (
    <>
      <div className="bg-neutral-100 border rounded rounded-lg p-4 flex justify-between items-center">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 glex-wrap">
          <TechFilter />
          <CityFilter />
        </div>
        <FilterButton />
      </div>
    </>
  );
};
