import { createSlice } from "@reduxjs/toolkit";

interface AlertProps {
  status: string,
  message: string
}

const initUIState = {
  alert: null
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initUIState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  setAlert
} = uiSlice.actions;

// Reducers
export default uiSlice.reducer;
