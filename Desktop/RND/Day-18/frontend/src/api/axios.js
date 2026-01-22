import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:5000", // backend dev URL
  baseURL: "https://userlogin-backend-gcbo.onrender.com", // backend production URL
  withCredentials: true             
});

export default api;
