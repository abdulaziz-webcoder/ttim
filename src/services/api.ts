
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://testtiim.pythonanywhere.com/api/v1";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
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
    
    // Handle authentication errors
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
  try {
    const response = await api.post("/auth/login/", { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await api.post("/auth/refresh/", { refresh });
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

// User
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me/");
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

// Tests
export const getAllTests = async () => {
  try {
    const response = await api.get("/tests/");
    return response.data;
  } catch (error) {
    console.error('Get all tests error:', error);
    throw error;
  }
};

export const getStudentTests = async () => {
  try {
    const response = await api.get("/tests/student_tests/");
    return response.data;
  } catch (error) {
    console.error('Get student tests error:', error);
    throw error;
  }
};

export const getTestDetails = async (id: number) => {
  try {
    const response = await api.get(`/tests/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Get test details error:', error);
    throw error;
  }
};

export const createTest = async (testData: any) => {
  try {
    const response = await api.post("/tests/", testData);
    return response.data;
  } catch (error) {
    console.error('Create test error:', error);
    throw error;
  }
};

export const updateTest = async (id: number, testData: any) => {
  try {
    const response = await api.put(`/tests/${id}/`, testData);
    return response.data;
  } catch (error) {
    console.error('Update test error:', error);
    throw error;
  }
};

export const deleteTest = async (id: number) => {
  try {
    const response = await api.delete(`/tests/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Delete test error:', error);
    throw error;
  }
};

// Questions
export const getTestQuestions = async (testId: number) => {
  try {
    const response = await api.get(`/tests/${testId}/questions/`);
    return response.data;
  } catch (error) {
    console.error('Get test questions error:', error);
    throw error;
  }
};

export const addQuestion = async (testId: number, questionData: any) => {
  try {
    const response = await api.post(`/tests/${testId}/questions/`, questionData);
    return response.data;
  } catch (error) {
    console.error('Add question error:', error);
    throw error;
  }
};

// Submissions
export const getSubmissions = async () => {
  try {
    const response = await api.get("/submissions/");
    return response.data;
  } catch (error) {
    console.error('Get submissions error:', error);
    throw error;
  }
};

export const submitTest = async (submissionData: any) => {
  try {
    const response = await api.post("/submissions/", submissionData);
    return response.data;
  } catch (error) {
    console.error('Submit test error:', error);
    throw error;
  }
};

export const getSubmissionDetails = async (id: number) => {
  try {
    const response = await api.get(`/submissions/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Get submission details error:', error);
    throw error;
  }
};

// Statistics
export const getTestStatistics = async (id: number) => {
  try {
    const response = await api.get(`/stats/tests/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Get test statistics error:', error);
    throw error;
  }
};

export const getStudentStatistics = async () => {
  try {
    const response = await api.get("/stats/student/");
    return response.data;
  } catch (error) {
    console.error('Get student statistics error:', error);
    throw error;
  }
};

export default api;
