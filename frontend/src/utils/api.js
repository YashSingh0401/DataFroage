import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ==============================
// AXIOS INSTANCE
// ==============================
const api = axios.create({
  baseURL: API_BASE,
  timeout: 600000, // 10 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// PROCESS DATASET
// ==============================
export const processDataset = async (formData) => {
  const response = await api.post("/process", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// DOWNLOAD FILE
// ==============================
export const getDownloadUrl = (filename) => {
  return `${API_BASE}/download/${filename}`;
};

// ==============================
// HEALTH CHECK
// ==============================
export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

// ==============================
// SEARCH DATASETS
// ==============================
export const searchDatasets = async (query) => {
  const response = await api.get("/datasets/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};

// ==============================
// RECOMMEND DATASETS
// ==============================
export const recommendDatasets = async (prompt, intent = "general_ml") => {
  const response = await api.post("/datasets/recommend", {
    prompt,
    intent,
  });

  return response.data;
};

// ==============================
// CHATBOT
// ==============================
export const askChatbot = async (message) => {
  const response = await api.post("/chat", {
    message,
  });

  return response.data;
};

// ==============================
// EXPORT DEFAULT API
// ==============================
export default api;