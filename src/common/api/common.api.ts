import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "dd87c7b9-5ffa-413e-9bd0-5a7ab05790f6",
  },
});
