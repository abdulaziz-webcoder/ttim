
import React, { createContext, useState, useEffect, useContext } from "react";
import { login, register, getCurrentUser, refreshToken } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "student" | "teacher" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("jwt_token");
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired and needs refresh
        const tokenExpiry = localStorage.getItem("token_expiry");
        if (tokenExpiry && new Date(tokenExpiry) <= new Date()) {
          const refreshData = await refreshToken(localStorage.getItem("refresh_token") || "");
          localStorage.setItem("jwt_token", refreshData.access);
          localStorage.setItem("refresh_token", refreshData.refresh);
          
          // Set new expiry (typically 1 hour from now)
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1);
          localStorage.setItem("token_expiry", expiryDate.toISOString());
        }

        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_expiry");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await login(email, password);
      
      localStorage.setItem("jwt_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      
      // Set token expiry (typically 1 hour from now)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      localStorage.setItem("token_expiry", expiryDate.toISOString());
      
      const userData = await getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      
      toast({
        title: "Muvaffaqiyatli kirish",
        description: "TIM platformasiga xush kelibsiz!",
      });
      
      // Redirect based on role
      if (userData.role === "teacher" || userData.role === "admin") {
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || "Login xatosi yuz berdi");
      toast({
        title: "Xatolik!",
        description: error.response?.data?.detail || "Login xatosi yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await register(userData);
      
      toast({
        title: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
        description: "Endi login qilishingiz mumkin",
      });
      
      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik yuz berdi");
      toast({
        title: "Xatolik!",
        description: error.response?.data?.detail || "Ro'yxatdan o'tishda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Tizimdan chiqildi",
      description: "Siz muvaffaqiyatli tizimdan chiqdingiz",
    });
    navigate("/login");
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
