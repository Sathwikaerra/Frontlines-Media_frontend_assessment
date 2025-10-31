export default function FilterBar({ filters, setFilters, locations, industries }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by name"
        className="border rounded px-3 py-2 w-full md:w-1/3"
      />

      <select
        name="location"
        value={filters.location}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full md:w-1/3"
      >
        <option value="">All Locations</option>
        {locations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
      </select>

      <select
        name="industry"
        value={filters.industry}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full md:w-1/3"
      >
        <option value="">All Industries</option>
        {industries.map((ind, i) => <option key={i} value={ind}>{ind}</option>)}
      </select>
    </div>
  );
}
