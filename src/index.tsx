import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const main = document.getElementById("main");
if (main) {
  createRoot(main).render(<React.StrictMode><App /></React.StrictMode>);
}
