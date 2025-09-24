// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, loginData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (registerData) => {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, registerData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
