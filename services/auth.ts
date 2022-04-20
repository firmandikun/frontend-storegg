import callApi from "../config/api";
import { LoginTypes, UserTypes } from "./data-type";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

// sign-up
export async function setSignUp(data: UserTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callApi({
    url,
    method: "POST",
    data,
  });
}

// sign-in
export async function setSignin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

  return callApi({
    url,
    method: "POST",
    data,
  });
}
