import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={12}
  toastOptions={{
    duration: 4000, 
    style: {
      background: "#1e3a8a", 
      color: "#fff",
      borderRadius: "12px",
      padding: "16px 20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      fontFamily: "sans-serif",
      minWidth: "280px",
      maxWidth: "400px",
    },
    className: "flex items-center space-x-3",
    success: {
      duration: 4000,
      style: {
        background: "#059669", 
        color: "#fff",
        borderLeft: "6px solid #10b981",
        fontWeight: "500",
      }
    },
    error: {
      duration: 4000,
      style: {
        background: "#b91c1c", 
        color: "#fff",
        borderLeft: "6px solid #f87171",
        fontWeight: "500",
      }
    },
    loading: {
      duration: 4000,
      style: {
        background: "#fbbf24", 
        color: "#1f2937",
        borderLeft: "6px solid #f59e0b",
        fontWeight: "500",
      }
    }
  }}
/>

 </StrictMode>,
)
