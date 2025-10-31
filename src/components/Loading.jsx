// components/Loading.jsx
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 bg-gray-50">
      <div className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-red-500 border-b-green-500 border-l-yellow-500 animate-spin"></div>
      <p className="text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
        Fetching the Company details...
      </p>
    </div>
  );
}
