import ReactDOMServer from "react-dom/server";
import App from "./App.tsx";

export function render() {
  const str = ReactDOMServer.renderToString(<App />);
  return str
}
