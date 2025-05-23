import { createRoot } from "react-dom/client";

import "./styles/style.css";
import "./styles/fonts.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
