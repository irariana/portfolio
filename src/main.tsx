/* ==========================================
   POINT D'ENTRÉE - main.tsx
   ==========================================
   Importe les polices et lance l'application
*/

import { createRoot } from "react-dom/client";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
