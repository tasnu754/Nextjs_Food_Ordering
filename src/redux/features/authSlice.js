import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }

  try {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    return {
      user: user ? JSON.parse(user) : null,
      accessToken: accessToken || null,
      isAuthenticated: !!accessToken,
    };
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = !!accessToken;

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", accessToken);
        } catch (error) {
          console.error("Error writing to localStorage:", error);
        }
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
        } catch (error) {
          console.error("Error clearing localStorage:", error);
        }
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
