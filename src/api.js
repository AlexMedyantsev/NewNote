import axios from "axios";
import {connect} from "react-redux";
import {ActionCreator} from "./reducer/notes/notes.js";

const ErrorCodes = {
  UNAUTHORIZED: 401,
};

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com/`,
    timeout: 1000 * 5,
    withCredentials: true,
    url: {
      crossdomain: true
    },
  });

  api.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (response) {
      console.log(response.status);
    } else if (!response) {
      console.log(`Отсутствует интернет соединение`);
    }
  };

  api.interceptors.request.use(function (config) {
    const token = 'c81567daa383677274b39b0430295b1d'
    config.headers.Authorization = token;

    return config;
  });

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export {createAPI};
