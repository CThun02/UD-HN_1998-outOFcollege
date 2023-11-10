import axios from "axios";

const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", token);
};

const clearAuthToken = () => {
  window.localStorage.removeItem("auth_token");
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

const request = async (method, url, data) => {
  let headers = {};

  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};

const fetchData = async () => {
  try {
    const data = await request("GET", "/api/data", null);
    console.log("Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { getAuthToken, setAuthHeader, request, fetchData, clearAuthToken };
