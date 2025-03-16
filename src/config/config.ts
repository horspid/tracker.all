export const API_KEY = import.meta.env.VITE_API_KEY;
export const options =  {
  method: 'GET',
  headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
  },
};

