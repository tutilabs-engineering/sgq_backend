import axios from "axios";
// wewe

const http = axios.create({
  baseURL: `http://${process.env.API_SAP}/`,
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { http };
