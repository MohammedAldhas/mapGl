import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import { ChakraProvider } from '@chakra-ui/react'
import Landing from "./pages/Landing.jsx";
import Router from "./pages/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <ChakraProvider>
          <Router/>
      </ChakraProvider>
  </>
);
