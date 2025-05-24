
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://testtiim.pythonanywhere.com/api/v1";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.config?.url);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_expiry");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

// Authentication
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login/", { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post("/auth/register/", userData);
  return response.data;
};

export const refreshToken = async (refresh: string) => {
  const response = await api.post("/auth/refresh/", { refresh });
  return response.data;
};

// User
export const getCurrentUser = async () => {
  const response = await api.get("/users/me/");
  return response.data;
};

// Tests - Updated with better error handling
export const getStudentTests = async () => {
  const response = await api.get("/tests/student_tests/");
  return response.data;
};

export const getTestDetails = async (id: number) => {
  const response = await api.get(`/tests/${id}/`);
  return response.data;
};

export const getTestQuestions = async (testId: number) => {
  const response = await api.get(`/tests/${testId}/questions/`);
  return response.data;
};

// Test Management
export const startTest = async (testId: number) => {
  const response = await api.post(`/tests/${testId}/start/`);
  return response.data;
};

export const submitTest = async (submissionData: {
  test: number;
  answers: Array<{
    question: number;
    selected_option: number;
  }>;
}) => {
  const response = await api.post("/submissions/", submissionData);
  return response.data;
};

// Statistics
export const getStudentStatistics = async () => {
  const response = await api.get("/stats/student/");
  return response.data;
};

export const getSubmissions = async () => {
  const response = await api.get("/submissions/");
  return response.data;
};

export default api;
