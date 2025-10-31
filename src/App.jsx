import { useState, useEffect, useRef } from "react";
import FilterBar from "./components/FilterBar";
import Loading from "./components/Loading";
import toast from "react-hot-toast";
import ToastWithClose from "./components/ToastWithClose";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", location: "", industry: "" });
  const [currentPage, setCurrentPage] = useState(1); 
  const companiesPerPage = 8; 
  const toastShown = useRef(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("https://tech-assessment-steel.vercel.app/api/companies");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        // console.log(data)
        setCompanies(data);
        setLoading(false);

        if (!toastShown.current) {
          toast.custom((t) => (
            <ToastWithClose message="Data fetched successfully! ✅" type="success" t={t} />
          ), { position: "top-center", duration: 2000 });
          toastShown.current = true;
        }
      } catch (err) {
        setLoading(false);
        setError("Failed to load companies.");
        if (!toastShown.current) {
          toast.custom((t) => (
            <ToastWithClose message="Failed to fetch data ❌" type="error" t={t} />
          ), { position: "top-center", duration: 2000 });
          toastShown.current = true;
        }
      }
    };

    setTimeout(()=>{
      fetchCompanies();

    },4500)
    
  }, []);

  const locations = !loading ? [...new Set(companies.map(c => c.location))] : [];
  const industries = !loading ? [...new Set(companies.map(c => c.industry))] : [];

  
  const filteredCompanies = !loading
    ? companies.filter(c =>
        c.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.location ? c.location === filters.location : true) &&
        (filters.industry ? c.industry === filters.industry : true)
      )
    : [];


  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Companies Directory
          </h1>

          <FilterBar filters={filters} setFilters={setFilters} locations={locations} industries={industries} />

          {!error && filteredCompanies.length === 0 && (
            <p className="text-center mt-8 text-gray-500 text-lg">No companies found.</p>
          )}

          {!error && filteredCompanies.length > 0 && (
            <>
              <div className="overflow-x mt-6">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-lg rounded-xl overflow-hidden transform transition-all">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">S.No</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Industry</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {currentCompanies.map((c, index) => (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">{indexOfFirstCompany + index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{c.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{c.industry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

             
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="self-center text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
