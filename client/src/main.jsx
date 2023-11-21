import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Register from "./views/register.jsx";
import RoomList from "./views/home.jsx";
import WaitingRoom from "./views/watingRoom.jsx";
import Winner from "./views/winner.jsx";
import GamePlay from "./views/gameplay.jsx";
import CreateRoom from "./views/createRoom.jsx";

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
        element: <RoomList />,
        loader: auth,
      },
      {
        path: "createRoom",
        element: <CreateRoom />,
        loader: auth,
      },
      {
        path: "games/:gameId",
        element: <WaitingRoom />,
        loader: auth,
      },
      // {
      //   path: "gameStart",
      //   element: <GamePlay />,
      //   loader: auth,
      // },
      // {
      //   path: "Winner",
      //   element: <Winner />,
      //   loader: auth,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
