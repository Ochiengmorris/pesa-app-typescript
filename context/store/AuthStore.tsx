import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

// Define types for the authentication state
interface AuthState {
  token: string | null;
  authenticated: boolean;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  phone: string; // remember to convert to string
  role: "admin" | "user";
  balance: number;
  isVerified: boolean;
  updatedAt?: Date;
  createdAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
}

export interface Transaction {
  _id: string;
  sender?: {
    _id: string;
    email: string;
    username: string;
  };
  receiver: {
    _id: string;
    email: string;
    username: string;
  };
  amount: number;
  transactionDate?: Date;
  transactionType: string;
  description?: string;
  status?: "pending" | "completed" | "failed" | "rejected";
  referenceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isVerified: boolean;
  transactions: Transaction[] | null;
  authState: AuthState;
  expoPushToken: string | null;
  setAuthState: (authState: AuthState) => void;
  setUser: (user: User | null) => void;
  setIsVerified: (isVerified: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpoPushToken: (expoPushToken: string | null) => void;
  register: (params: {
    username: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<any>;
  verifyEmail: (verificationCode: string) => Promise<any>;
  login: (params: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
  fetchData: () => Promise<void>;
  sendMoney: (params: {
    amount: number;
    receiverPhone: string;
  }) => Promise<any>;
  deposit: (params: { amount: number }) => Promise<any>;
  requestMoney: (params: {
    amount: number;
    senderPhone: string;
  }) => Promise<any>;
  approveTransaction: (params: { transactionId: string }) => Promise<any>;
  rejectTransaction: (params: { transactionId: string }) => Promise<any>;
}

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

// Constants for SecureStore keys
export const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY!;

const API_URL = process.env.EXPO_PUBLIC_API_URL!;

// Initialize axios with base URL
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Zustand store for authentication state
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isVerified: false,
  transactions: null,
  authState: {
    token: null,
    authenticated: false,
  },
  expoPushToken: null,

  // Setter functions
  setAuthState: (authState) => set({ authState }),
  setUser: (user) => set({ user }),
  setIsVerified: (isVerified) => set({ isVerified }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setExpoPushToken: (expoPushToken) => set({ expoPushToken }),

  // Registation function
  register: async ({ username, phone, email, password }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/user/register`, {
        email,
        password,
        username,
        phone,
      });

      if (response.status === 201) {
        const { token, user } = response.data;

        set({
          user: user,
          authState: {
            token,
            authenticated: true,
          },
          isVerified: user.isVerified,
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        await SecureStore.setItemAsync(TOKEN_KEY, token);
        return response.data;
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Registration error:", error);
        return {
          status: "ERROR",
          message: error.response?.data,
        };
      } else {
        console.error("Unexpected error:", error);
        return {
          status: "ERROR",
          message: "An unexpected error occurred",
        };
      }
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (verificationCode) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/user/verify-email`, {
        code: verificationCode,
      });

      if (response.status === 200) {
        const { user } = response.data;
        set({
          user: user,
          isVerified: user.isVerified,
        });
        return response.data;
      } else {
        throw new Error("Verification failed");
      }
    } catch (e) {
      if (isAxiosError(e)) {
        console.error("Verification error:", e);
        // console.log(e.response?.data);
        return {
          status: "ERROR",
          message: e.response?.data,
        };
      } else {
        console.error("Unexpected error:", e);
        return {
          status: "ERROR",
          message: "An unexpected error occurred",
        };
      }
    } finally {
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        set({
          user: user,
          authState: {
            token,
            authenticated: true,
          },
          isVerified: user.isVerified,
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        await SecureStore.setItemAsync(TOKEN_KEY, token);
        return response.data;
      } else {
        throw new Error("Login failed");
      }
    } catch (e) {
      if (isAxiosError(e)) {
        console.error("Login error:", e);
        return {
          status: "ERROR",
          message: e.response?.data,
        };
      } else {
        console.error("Unexpected error:", e);
        return {
          status: "ERROR",
          message: "An unexpected error occurred",
        };
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axiosInstance.defaults.headers.common["Authorization"] = null;
      // delete axios.defaults.headers.common["Authorization"];

      set({
        user: null,
        authState: {
          token: null,
          authenticated: false,
        },
        isVerified: false,
      });
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchData: async () => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.get("/user/me");
      const fetchedTransactions = await axiosInstance.get(
        "/finance/transactions"
      );

      set({
        user: response.data.user,
        isVerified: response.data.user.isVerified,
        transactions: fetchedTransactions.data.transactions,
      });
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deposit: async ({ amount }) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/finance/deposit`, {
        amount,
        transactionType: "wallet",
        description: "Deposit money",
      });
      if (response.status === 200) {
        await useAuthStore.getState().fetchData();
        return { status: "SUCCESS", data: response.data };
      } else {
        throw new Error(response.data.message || "Failed to deposit money");
      }
    } catch (error) {
      console.error("Failed to deposit money", error);
    } finally {
      set({ isLoading: false });
    }
  },

  sendMoney: async ({ amount, receiverPhone }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/finance/send-money`, {
        amount,
        receiverPhone,
        transactionType: "wallet",
        description: "Small money transaction",
      });
      if (response.status === 200) {
        await useAuthStore.getState().fetchData();
        return { status: "SUCCESS", data: response.data };
      } else {
        throw new Error(response?.data?.message || "Failed to send money");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Failed to send money:", error?.response?.data);
        return { status: "ERROR", message: error?.response?.data };
      }
    } finally {
      set({ isLoading: false });
    }
  },

  requestMoney: async ({ amount, senderPhone }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/finance/request-money`, {
        amount,
        senderPhone,
        transactionType: "wallet",
        description: "Request money",
      });
      // console.log(response.data);
      if (response.status === 200) {
        return { status: "SUCCESS", data: response.data };
      } else {
        throw new Error(response?.data?.message || "Failed to request money");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Failed to send money:", error?.response?.data);
        return { status: "ERROR", message: error?.response?.data };
      }
    } finally {
      set({ isLoading: false });
    }
  },

  approveTransaction: async ({ transactionId }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(
        `/finance/approve-transaction`,
        {
          transactionId,
        }
      );
      if (response.status === 200) {
        await useAuthStore.getState().fetchData();
        return { status: "SUCCESS", data: response.data };
      } else {
        throw new Error(
          response?.data?.message || "Failed to approve transaction"
        );
      }
    } catch (error) {
      console.error("Failed to approve transaction", error);
    } finally {
      set({ isLoading: false });
    }
  },
  rejectTransaction: async ({ transactionId }) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post(`/finance/reject-transaction`, {
        transactionId,
      });
      if (response.status === 200) {
        await useAuthStore.getState().fetchData();
        return { status: "SUCCESS", data: response.data };
      } else {
        throw new Error(
          response?.data?.message || "Failed to reject transaction"
        );
      }
    } catch (error) {
      console.error("Failed to reject transaction", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
