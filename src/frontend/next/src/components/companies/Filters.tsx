const Alphabetic = () => (
  <div className="border rounded-md bg-neutral-100 p-2 transition-all hover:bg-white hover:shadow">
    <label htmlFor="alphabetic" className="inline-block capitalize mr-2">
      alphabetic ?
    </label>
    <input type="checkbox" name="alphabetic" className="border p-3" />
  </div>
);

export const CompaniesPageFilters = () => (
  <div className="bg-neutral-100 border rounded rounded-lg p-4 flex justify-between items-center">
    <Alphabetic />
  </div>
);
