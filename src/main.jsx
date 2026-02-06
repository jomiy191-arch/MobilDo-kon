import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";   // 👈 SHU YETISHMAYAPTI
import { Routers } from "./Routers/Routers.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routers} />
  </StrictMode>
);
