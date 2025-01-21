import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { baseUrl } from "../../lib/utils.ts";

// Initial state
const initialState = {
  loggedIn: checkLoggedIn(),
  loading: false,
  activateLoading: false,
  completeLoading: false,
  resultLoading: false,
  error: false,
  success: false,
  rememberMe: false,
  responseMessage: "",
  allExams: [],
};

// Check if the user is logged in
function checkLoggedIn() {
  const localStoragetoken = localStorage.getItem("token");
  const sessionStoragetoken = sessionStorage.getItem("token");
  return Boolean(localStoragetoken || sessionStoragetoken);
}

// Async thunk for login action
export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, thunkApi) => {
    try {
      const response = await fetch(`${baseUrl}/user/login/`, {
        method: "POST",
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        return thunkApi.rejectWithValue(result.detail || "Login failed");
      }

      return result;
    } catch (error) {
      return thunkApi.rejectWithValue("Network error. Please try again.");
    }
  },
);

// Async thunk to get exams
export const getExams = createAsyncThunk("getExams", async (data, thunkAPI) => {
  try {
    const response = await fetch(`${baseUrl}/app_admin/exams/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(result.detail || "Failed to fetch exams");
    }

    return result;
  } catch (error) {
    return thunkAPI.rejectWithValue("Network error. Please try again.");
  }
});

// Auth slice
const userReducer = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.rememberMe = false;
      state.error = false;
      state.success = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      toast.info("Logged out successfully");
    },

    toggleRememberMe: (state, action) => {
      state.rememberMe = action.payload === "true";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.access_token) {
          state.error = false;
          state.responseMessage = action.payload.message;
          toast.success("Login Successful");

          if (state.rememberMe) {
            localStorage.setItem("token", action.payload.access_token);
          } else {
            sessionStorage.setItem("token", action.payload.access_token);
          }

          state.loggedIn = true;
          state.userInfo = action.payload.user;
        } else {
          state.error = true;
          state.responseMessage = action.payload.detail || "Login failed";
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.responseMessage = action.payload || "Something went wrong!";
        toast.error("Invalid Credentials");
      })

      // GetExams extra reducers
      .addCase(getExams.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Exams data:", action.payload); // Log response to inspect

        if (Array.isArray(action.payload.results)) {
          state.allExams = action.payload.results;
        } else {
          toast.error("Invalid response format.");
        }
      })
      .addCase(getExams.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error(action.payload || "Failed to load exams.");
      });
  },
});

// Export actions and reducer
export const { logout, toggleRememberMe } = userReducer.actions;
export default userReducer.reducer;
