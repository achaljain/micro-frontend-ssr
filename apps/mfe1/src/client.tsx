import reactDom from "react-dom/client";
import App from "./App.tsx";

export const csr = (elemRef: HTMLElement) => {
  const root = reactDom.createRoot(elemRef);
  root.render(<App />);
};

export function hydrate(elemRef: HTMLElement) {
  reactDom.hydrateRoot(elemRef, <App />);
  console.log("hydrated");
}
