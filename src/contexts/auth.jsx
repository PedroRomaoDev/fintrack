import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { useLogin, useSignUp } from "@/api/hooks/user";
import { UserService } from "@/api/services/user";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  isLoginPending: false,
  isSignupPending: false,
  login: () => {},
  signup: () => {},
  signOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const signupMutation = useSignUp();

  const loginMutation = useLogin();

  useEffect(() => {
    const init = async () => {
      setIsInitializing(true);
      try {
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        );
        if (!accessToken && !refreshToken) return;

        const response = await UserService.me();
        setUser(response);
      } catch (error) {
        setUser(null);
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data);
      setUser(createdUser);
      setTokens(createdUser.tokens);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      console.error(error);
      let errorMessage = "Erro ao criar a conta. Por favor, tente novamente.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message ?? errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data);
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
      let errorMessage = "Erro ao realizar login. Por favor, tente novamente.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message ?? errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  const signOut = () => {
    try {
      setUser(null);
      removeTokens();
      toast.success("Logout realizado com sucesso. Até breve!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao sair da conta. Por favor, tente novamente",
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        signup: signup,
        isInitializing,
        isLoginPending: loginMutation.isPending,
        isSignupPending: signupMutation.isPending,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
