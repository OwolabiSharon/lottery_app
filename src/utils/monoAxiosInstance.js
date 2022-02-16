const axios = require('axios');

const baseUrl = 'https://api.withmono.com';

axios.defaults.baseURL = baseUrl;

const monoAxiosInstance = axios.create();

const token = 'test_sk_Tcgo2eyGBmwBr5MXEBU3';


monoAxiosInstance.interceptors.request.use(
  async (config) => {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers['mono-sec-key'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

module.exports = monoAxiosInstance;
