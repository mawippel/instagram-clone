import axios from "axios";
export const baseURL = "http://192.168.9.116:3333";

export const api = axios.create({
  baseURL: baseURL
});
