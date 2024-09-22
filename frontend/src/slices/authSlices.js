import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

try {
  const userInfoFromStorage = localStorage.getItem("userInfo");
  if (userInfoFromStorage) {
    initialState.userInfo = JSON.parse(userInfoFromStorage);
  }
} catch (error) {
  console.error("Failed to load user info from local storage", error);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
