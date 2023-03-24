import { createSlice } from "@reduxjs/toolkit";

const initSessionState = {
  authToken: null,
  printCharacteristic: null
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: initSessionState,
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setToken
} = sessionSlice.actions;

// Reducers
export default sessionSlice.reducer;
