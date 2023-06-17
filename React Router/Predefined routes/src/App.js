import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { List } from "./pages/List";
import { Contact } from "./pages/Contact";

export default function App() {
  // debug the code below
  const routes = createRoutesFromElements([
    // { path: "/", element: <Home /> },
    // { path: "/list", element: <List /> },
    // { path: "/contact", element: <Contact /> }
    <>
    <Route path="/" element={<Home/>}/>
    <Route path="/list" element={<List/>}/>
    <Route path="/contact" element={<Contact/>}/>
    </>
  ]);

  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}
