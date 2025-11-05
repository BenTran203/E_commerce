"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} from "@/store/slices/authSlice";
import { User, LoginForm, RegisterForm } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Mock API functions - replace with actual API calls
const authAPI = {
  login: async (
    credentials: LoginForm,
  ): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock successful login
    return {
      user: {
        id: "1",
        email: credentials.email,
        firstName: "John",
        lastName: "Doe",
        role: "customer",
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
    };
  },

  register: async (
    userData: RegisterForm,
  ): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: "1",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: "customer",
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = async (credentials: LoginForm) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.login(credentials);
      dispatch(loginSuccess(response));
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.register(userData);
      dispatch(loginSuccess(response));
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const signOut = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      toast.success("Signed out successfully");
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      // Force logout even if API call fails
      dispatch(logout());
      router.push("/");
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    signOut,
    clearAuthError,
  };
}
