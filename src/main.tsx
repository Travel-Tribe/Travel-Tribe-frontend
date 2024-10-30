import { createRoot } from "react-dom/client";
import App from "./App.tsx";

async function deferRender() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

deferRender().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
