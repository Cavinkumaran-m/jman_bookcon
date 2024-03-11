import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 440) {
      alert("Your Session has been expired.\nKindly login again.");
      window.location.replace("http://localhost:3000");
    }
  }
);

export default Axios;
