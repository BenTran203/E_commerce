"use client";

import { useEffect } from "react";
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
import { authAPI as realAuthAPI } from "@/lib/api";

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, isHydrated, error } =
    useSelector((state: RootState) => state.auth);

  // Fetch current user on mount if authenticated
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token && !user && isHydrated) {
        try {
          const currentUser = await realAuthAPI.getCurrentUser();
          dispatch(loginSuccess({ user: currentUser, token }));
        } catch (err) {
          console.error("Failed to fetch current user:", err);
          // If token is invalid, logout
          dispatch(logout());
        }
      }
    };

    fetchCurrentUser();
  }, [token, user, isHydrated, dispatch]);

  const login = async (credentials: LoginForm) => {
    try {
      dispatch(loginStart());
      const response = await realAuthAPI.login(credentials);
      dispatch(loginSuccess({ user: response.user, token: response.tokens.accessToken }));
      toast.success("Welcome back!");
      router.push("/");
    } catch (err: any) {
      const errorMessage = err?.message || "Login failed";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const register = async (userData: RegisterForm) => {
    try {
      dispatch(loginStart());
      const response = await realAuthAPI.register(userData);
      dispatch(loginSuccess({ user: response.user, token: response.tokens.accessToken }));
      toast.success("Account created successfully!");
      router.push("/");
    } catch (err: any) {
      const errorMessage = err?.message || "Registration failed";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  const signOut = async () => {
    try {
      await realAuthAPI.logout();
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

  const refreshUser = async () => {
    if (!token) return;
    try {
      const currentUser = await realAuthAPI.getCurrentUser();
      dispatch(loginSuccess({ user: currentUser, token }));
    } catch (err) {
      console.error("Failed to refresh user:", err);
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
    isHydrated,
    error,
    login,
    register,
    signOut,
    refreshUser,
    clearAuthError,
  };
}
