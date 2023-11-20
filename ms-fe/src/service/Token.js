import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/auth";

async function getAuthToken(isAuthenAdmin) {
  const hAdmin = window.localStorage.getItem("bop_sp");
  const dAdmin = window.localStorage.getItem("a_abc");
  const mAdmin = window.localStorage.getItem("k-a1");
  const fAdmin = window.localStorage.getItem("b_a-a");
  const gAdmin = window.localStorage.getItem("ms-s");
  const jAdmin = window.localStorage.getItem("bo-o");
  const zAdmin = window.localStorage.getItem("ws-a");
  const xAdmin = window.localStorage.getItem("w_href");
  const wAdmin = window.localStorage.getItem("id_vi");

  const hClient = window.localStorage.getItem("b8563s");
  const dClient = window.localStorage.getItem("c1");
  const mClient = window.localStorage.getItem("k2641");
  const fClient = window.localStorage.getItem("b91s");
  const gClient = window.localStorage.getItem("msss2a");
  const jClient = window.localStorage.getItem("a6523");
  const zClient = window.localStorage.getItem("685a102a");
  const xClient = window.localStorage.getItem("6s");
  const wClient = window.localStorage.getItem("3652s");

  const token = isAuthenAdmin
    ? hAdmin +
      dAdmin +
      mAdmin +
      fAdmin +
      gAdmin +
      jAdmin +
      zAdmin +
      xAdmin +
      wAdmin
    : hClient +
      dClient +
      mClient +
      fClient +
      gClient +
      jClient +
      zClient +
      xClient +
      wClient;

  if (token) {
    try {
      const res = await axios.get(baseUrl + "/verified/" + token);
      const data = await res.data;
      return data;
    } catch (err) {
      if (isAuthenAdmin) {
        window.localStorage.removeItem("a_abc");
        window.localStorage.removeItem("w_href");
        window.localStorage.removeItem("b_a-a");
        window.localStorage.removeItem("id_vi");
        window.localStorage.removeItem("bop_sp");
        window.localStorage.removeItem("bo-o");
        window.localStorage.removeItem("ws-a");
        window.localStorage.removeItem("ms-s");
        window.localStorage.removeItem("k-a1");
      } else {
        window.localStorage.removeItem("c1");
        window.localStorage.removeItem("6s");
        window.localStorage.removeItem("b91s");
        window.localStorage.removeItem("3652s");
        window.localStorage.removeItem("b8563s");
        window.localStorage.removeItem("a6523");
        window.localStorage.removeItem("685a102a");
        window.localStorage.removeItem("msss2a");
        window.localStorage.removeItem("k2641");
      }
    }
  }
}

function getToken(isAuthenAdmin) {
  const hAdmin = window.localStorage.getItem("bop_sp");
  const dAdmin = window.localStorage.getItem("a_abc");
  const mAdmin = window.localStorage.getItem("k-a1");
  const fAdmin = window.localStorage.getItem("b_a-a");
  const gAdmin = window.localStorage.getItem("ms-s");
  const jAdmin = window.localStorage.getItem("bo-o");
  const zAdmin = window.localStorage.getItem("ws-a");
  const xAdmin = window.localStorage.getItem("w_href");
  const wAdmin = window.localStorage.getItem("id_vi");

  const hClient = window.localStorage.getItem("b8563s");
  const dClient = window.localStorage.getItem("c1");
  const mClient = window.localStorage.getItem("k2641");
  const fClient = window.localStorage.getItem("b91s");
  const gClient = window.localStorage.getItem("msss2a");
  const jClient = window.localStorage.getItem("a6523");
  const zClient = window.localStorage.getItem("685a102a");
  const xClient = window.localStorage.getItem("6s");
  const wClient = window.localStorage.getItem("3652s");

  const token = isAuthenAdmin
    ? hAdmin +
      dAdmin +
      mAdmin +
      fAdmin +
      gAdmin +
      jAdmin +
      zAdmin +
      xAdmin +
      wAdmin
    : hClient +
      dClient +
      mClient +
      fClient +
      gClient +
      jClient +
      zClient +
      xClient +
      wClient;
  if (token) {
    return token;
  }
  return null;
}

const setAuthHeader = (token, isAuthenAdmin) => {
  const h = token.slice(0, 18);
  const d = token.slice(18, 40);
  const m = token.slice(40, 55);
  const f = token.slice(55, 70);
  const g = token.slice(70, 80);
  const j = token.slice(80, 90);
  const z = token.slice(90, 100);
  const x = token.slice(100, 120);
  const w = token.slice(120);
  if (isAuthenAdmin) {
    window.localStorage.setItem("a_abc", d);
    window.localStorage.setItem("w_href", x);
    window.localStorage.setItem("b_a-a", f);
    window.localStorage.setItem("id_vi", w);
    window.localStorage.setItem("bop_sp", h);
    window.localStorage.setItem("bo-o", j);
    window.localStorage.setItem("ws-a", z);
    window.localStorage.setItem("ms-s", g);
    window.localStorage.setItem("k-a1", m);
  } else {
    window.localStorage.setItem("c1", d);
    window.localStorage.setItem("6s", x);
    window.localStorage.setItem("b91s", f);
    window.localStorage.setItem("3652s", w);
    window.localStorage.setItem("b8563s", h);
    window.localStorage.setItem("a6523", j);
    window.localStorage.setItem("685a102a", z);
    window.localStorage.setItem("msss2a", g);
    window.localStorage.setItem("k2641", m);
  }
};

const clearAuthToken = (isAuthenAdmin) => {
  if (isAuthenAdmin) {
    window.localStorage.removeItem("a_abc");
    window.localStorage.removeItem("w_href");
    window.localStorage.removeItem("b_a-a");
    window.localStorage.removeItem("id_vi");
    window.localStorage.removeItem("bop_sp");
    window.localStorage.removeItem("bo-o");
    window.localStorage.removeItem("ws-a");
    window.localStorage.removeItem("ms-s");
    window.localStorage.removeItem("k-a1");
  } else {
    window.localStorage.removeItem("c1");
    window.localStorage.removeItem("6s");
    window.localStorage.removeItem("b91s");
    window.localStorage.removeItem("3652s");
    window.localStorage.removeItem("b8563s");
    window.localStorage.removeItem("a6523");
    window.localStorage.removeItem("685a102a");
    window.localStorage.removeItem("msss2a");
    window.localStorage.removeItem("k2641");
  }
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

export {
  getAuthToken,
  setAuthHeader,
  request,
  fetchData,
  clearAuthToken,
  getToken,
};
