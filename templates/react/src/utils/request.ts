import Axios, { AxiosRequestConfig } from 'axios';
const prefix = '/api';
class Request {
  baseURL: string;
  constructor(prefix: string) {
    this.baseURL = prefix;
  }
  sendRequest(options: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      Axios({
        baseURL: this.baseURL,
        headers: {
          token: localStorage.getItem('token'),
        },
        ...options,
      })
        .then(({ data }) => {
          if (data.code === 10009) {
            location.href = '/';
            return;
          }
          if (data.code === 0) {
            resolve(data.data);
          } else {
            reject(data.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
export default new Request(prefix);
