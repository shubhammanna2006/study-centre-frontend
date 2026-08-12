import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface CourseSummery {
  courseId: string;
  title: string;
  status: string;
}
export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentNumber: string;
  mustChangePassword: boolean;
  courses: CourseSummery[];
}

export interface AuthState {
  user: Admin | Student | null;
  accessToken: string | null;
  role: "ADMIN" | "STUDENT" | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: Admin | Student;
        accessToken: string;
        role: "ADMIN" | "STUDENT";
      }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },

    authInitialized: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, clearAuth, authInitialized } = authSlice.actions;

export default authSlice.reducer;
