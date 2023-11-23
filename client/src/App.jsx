import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserID } from "./features/gameMaster";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserID(localStorage.userId));
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
