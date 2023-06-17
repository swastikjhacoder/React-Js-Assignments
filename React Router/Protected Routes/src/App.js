import "./styles.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { List } from "./pages/List";
import { Contact } from "./pages/Contact";
import { ItemDetails } from "./pages/ItemDetails";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/" replace={true} />;
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home loggedIn={isLoggedIn} setLoggedin={setIsLoggedIn} />
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          )
        },
        {
          path: "/list",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              )
            },
            {
              path: ":itemId",
              element: (
                <ProtectedRoute>
                  <ItemDetails />
                </ProtectedRoute>
              )
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
