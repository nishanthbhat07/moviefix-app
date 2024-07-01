import axios from "axios";

const apiclient = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default apiclient;
