import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/auth";

async function getAuthToken() {
  const token = window.localStorage.getItem("auth_token");
  if (token) {
    try {
      const atobToken = atob(token);
      const res = await axios.get(baseUrl + "/verified/" + atobToken);
      const data = await res.data;
      return data;
    } catch (err) {
      return err;
    }
  }
}

const setAuthHeader = (token) => {
  window.localStorage.setItem("auth_token", btoa(token));
};

const clearAuthToken = () => {
  window.localStorage.removeItem("auth_token");
};

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

const request = async (method, url, data) => {
  const token = window.localStorage.getItem("auth_token");
  let headers = {};
  if (token) {
    const atobToken = atob(token);
    headers = { Authorization: `Bearer ${atobToken}` };
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
