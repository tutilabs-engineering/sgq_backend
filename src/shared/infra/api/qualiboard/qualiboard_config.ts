import axios from "axios";

const httpQualiboard = axios.create({
  baseURL: `http://185.209.179.253:7601`,
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { httpQualiboard };
