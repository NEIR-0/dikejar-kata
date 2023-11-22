import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import Game from "./pages/Game.jsx";
import Winner from "./pages/winner.jsx";
import GamePlay from "./views/gameplay.jsx";

const auth = () => {
  if (!localStorage.access_token) {
    return redirect("/register");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home />,
        loader: auth,
      },
      {
        path: "createRoom",
        element: <CreateRoom />,
        loader: auth,
      },
      {
        path: "games/:gameId",
        element: <Game />,
        loader: auth,
      },

      {
        path: "/games/:gameId/result",
        element: <Winner />,
        loader: auth,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
