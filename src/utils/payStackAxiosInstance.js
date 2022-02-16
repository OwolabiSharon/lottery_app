const axios = require('axios');

const baseUrl = 'https://api.paystack.co';

axios.defaults.baseURL = baseUrl;

const paystackAxiosInstance = axios.create();

const token = 'sk_test_08df2c40e350e1be93dd91a254e3193208451e72';


paystackAxiosInstance.interceptors.request.use(
  async (config) => {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

module.exports = paystackAxiosInstance;
