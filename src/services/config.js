import axios from "axios";
import { layDuLieuLocal } from "../util/localStorage";

// const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
const BASE_URL = "http://localhost:8080";

const tokenAdmin = layDuLieuLocal("user");
// console.log(tokenAdmin)
const configHeaderAxios = () => {
  return {
    token: tokenAdmin?.token,
  };
};
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
  // header: handleFormData(),
});
