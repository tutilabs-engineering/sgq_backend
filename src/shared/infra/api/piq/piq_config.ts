import axios from "axios";

const httpPIQ = axios.create({
  baseURL: `${process.env.API_PIQ}`,
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { httpPIQ };
