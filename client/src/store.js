import { configureStore } from "@reduxjs/toolkit";
import gameMaster from "./features/gameMaster";

export const store = configureStore({
  reducer: {
    gameMaster: gameMaster,
  },
});
