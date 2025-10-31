// components/ToastWithClose.jsx
import toast from "react-hot-toast";

export default function ToastWithClose({ message, type = "success", t }) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-500";

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-2xl shadow-xl w-96 max-w-full transform transition-transform duration-300 ease-out
                  ${bgColor} text-white animate-slide-in-left`}
    >
      <span className="text-sm md:text-base font-medium">{message}</span>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-4 font-bold hover:text-gray-200 transition-colors duration-200 ease-in-out"
        aria-label="Close toast"
      >
        &#x2715;
      </button>
    </div>
  );
}
