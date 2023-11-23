import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  userId: null,
};

export const gameMaster = createSlice({
  name: "gameMaster",
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserID } = gameMaster.actions;

export default gameMaster.reducer;
