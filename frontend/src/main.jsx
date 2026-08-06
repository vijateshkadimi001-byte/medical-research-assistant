import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />

      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);