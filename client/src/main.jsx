import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ConnectionPage from "./pages/ConnectionPage/ConnectionPage";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import IdeaPage from "./pages/IdeaPage/IdeaPage";
import VotePage from "./pages/VotePage/VotePage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/choice",
        element: <ChoicePage />,
      },

      {
        path: "/registration",
        element: <RegistrationPage />,
      },

      {
        path: "/connection",
        element: <ConnectionPage />,
      },

      {
        path: "/idea",
        element: <IdeaPage />,
      },

      {
        path: "/vote",
        element: <VotePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
