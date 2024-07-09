// src/App.js

import { RouterProvider } from "react-router-dom";
import RouteComponent from "./routes/RouteComponent";
import "./styles/Index.css";

function App() {
  return <RouterProvider router={RouteComponent} />;
}

export default App;
