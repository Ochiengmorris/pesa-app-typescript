import {
  axiosInstance,
  TOKEN_KEY,
  useAuthStore,
} from "@/context/store/AuthStore";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const useLoadToken = () => {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const { fetchData } = useAuthStore();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          const decodedToken = jwtDecode<{ exp: number }>(token);
          const isExpired = decodedToken.exp * 1000 < Date.now();

          if (isExpired) {
            // Token expired, handle accordingly
            console.warn("Token has expired");
            setAuthState({ token: null, authenticated: false });
            setIsLoading(false);
            return;
          }

          // If token is valid, proceed
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          await fetchData();
          setAuthState({ token, authenticated: true });
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Failed to load token", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, [setAuthState, setIsLoading]);
};

export default useLoadToken;
