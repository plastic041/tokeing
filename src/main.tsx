import App from "./App";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(rootElement);

root.render(<App />);
