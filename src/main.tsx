import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { validateEnvironment } from "./lib/env.ts";
import "./index.css";

// Validate environment variables before rendering
try {
  validateEnvironment();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Environment validation failed';
  document.body.innerHTML = `<div style="padding: 20px; font-family: monospace; color: #ef4444; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
  throw error;
}

createRoot(document.getElementById("root")!).render(<App />);
