import { RouterProvider } from "react-router-dom";
import { Routers } from "./router/router";
import "./App.css";


function App() {
  return <RouterProvider router={Routers} />;
}

export default App;
