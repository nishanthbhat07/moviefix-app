import axios from "axios";

const apiclient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export default apiclient;
