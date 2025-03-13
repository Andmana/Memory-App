import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/__reset.css";
import "./styles/index.scss";
import App from "./App.jsx";
import Footer from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
