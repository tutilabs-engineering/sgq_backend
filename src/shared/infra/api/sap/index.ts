import axios from "axios";

const http = axios.create({
  baseURL: "http://185.209.179.253:3000/",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { http };
