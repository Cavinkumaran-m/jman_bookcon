import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default Axios;
