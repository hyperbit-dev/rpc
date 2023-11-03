import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Contact from "./routes/contact";
import Root from "./routes/root";
import { Login } from "./routes/auth";
import ErrorPage from "./error-page";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

const root = createRoot(document.body);

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
