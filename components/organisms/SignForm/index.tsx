import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import {  toast } from "react-toastify";
import { setSignin } from "../../../services/auth";

export default function SignForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onsubmit = async () => {
    const data = {
      email,
      password,
    };
    if (!email || !password) {
      toast.error("email dan password wajib diisi!");
    } else {
      const response = await setSignin(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Login Berhasil");
        const { token } = response.data;
        const tokenBase64 = window.btoa(token);
        Cookies.set("token", tokenBase64, { expires: 1 });
        router.push("/");
      }
    }
  };
  return (
    <div>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
      <div className="pt-50">
        <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          name="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => { return setEmail(e.target.value); }}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => { return setPassword(e.target.value); }}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
          onClick={onsubmit}
        >
          Continue to Sign In
        </button>
        <a
          className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-up"
          role="button"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}
