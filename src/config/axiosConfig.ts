import axios from "axios";

const httpSap = axios.create({
  baseURL: "http://192.168.7.212:3300/api/v1/sap/tutilabs",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { httpSap };
