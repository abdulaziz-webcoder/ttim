
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://testtiim.pythonanywhere.com/api/v1";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
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

// Tests
export const getAllTests = async () => {
  const response = await api.get("/tests/");
  return response.data;
};

export const getStudentTests = async () => {
  const response = await api.get("/tests/student_tests/");
  return response.data;
};

export const getTestDetails = async (id: number) => {
  const response = await api.get(`/tests/${id}/`);
  return response.data;
};

export const createTest = async (testData: any) => {
  const response = await api.post("/tests/", testData);
  return response.data;
};

export const updateTest = async (id: number, testData: any) => {
  const response = await api.put(`/tests/${id}/`, testData);
  return response.data;
};

export const deleteTest = async (id: number) => {
  const response = await api.delete(`/tests/${id}/`);
  return response.data;
};

// Questions
export const getTestQuestions = async (testId: number) => {
  const response = await api.get(`/tests/${testId}/questions/`);
  return response.data;
};

export const addQuestion = async (testId: number, questionData: any) => {
  const response = await api.post(`/tests/${testId}/questions/`, questionData);
  return response.data;
};

// Submissions
export const getSubmissions = async () => {
  const response = await api.get("/submissions/");
  return response.data;
};

export const submitTest = async (submissionData: any) => {
  const response = await api.post("/submissions/", submissionData);
  return response.data;
};

export const getSubmissionDetails = async (id: number) => {
  const response = await api.get(`/submissions/${id}/`);
  return response.data;
};

// Statistics
export const getTestStatistics = async (id: number) => {
  const response = await api.get(`/stats/tests/${id}/`);
  return response.data;
};

export const getStudentStatistics = async () => {
  const response = await api.get("/stats/student/");
  return response.data;
};

export default api;
