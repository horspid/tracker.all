export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_URL = import.meta.env.VITE_API_URL;
export const options = {
  method: "GET",
  headers: {
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json",
  },
};
