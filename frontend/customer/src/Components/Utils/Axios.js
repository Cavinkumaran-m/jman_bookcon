import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/api",
});

export default Axios;
