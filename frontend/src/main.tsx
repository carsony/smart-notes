import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = () => <div>App</div>;

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
