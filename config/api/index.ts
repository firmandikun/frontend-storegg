import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface callPropsApi extends AxiosRequestConfig {
  token?: boolean,
}

export default async function callApi({ url, method, data, token }: callPropsApi) {
  let headers = {};

  if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      const JwtToken = window.atob(tokenCookies);
      headers = {
        Authorization: `Bearer ${JwtToken}`,
      };
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,

  }).catch((err) => { return err.response; });

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: response.data.message,
    data: response.data.data,
  };

  return res;
}
