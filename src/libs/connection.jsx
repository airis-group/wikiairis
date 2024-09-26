import axios from "axios";

let PY_API = 'http://localhost:5001/api/v1'
// let PY_API = 'https://crmapi.paraduta.id/api/v1'
const baseUrl = PY_API

export const api = axios.create({
  baseURL: baseUrl,
});

export const apiCred = axios.create({
  baseURL: baseUrl,
});

apiCred.defaults.withCredentials = false;
apiCred.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    
    const user = JSON.parse(localStorage.getItem("data"));
    const userid = user.id;
    const insid = 1
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (userid) {
      config.headers['X-userid'] = userid;
    }
    // if (insid) {
    //   config.headers['X-insid'] = insid;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('data')
  window.location.href = "/";

}