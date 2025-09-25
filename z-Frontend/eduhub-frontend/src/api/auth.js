import axios from "axios";
const API_URL = "http://localhost:5000/api";
export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, loginData);
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (registerData) => {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, registerData);

    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

