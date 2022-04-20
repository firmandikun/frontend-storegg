import cx from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const className = {
    label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
  };

  const router = useRouter();

  const onSubmmit = () => {
    const useForm = {
      name,
      email,
      password,
    };

    localStorage.setItem("use-form", JSON.stringify(useForm));
    router.push("/sign-up-photo");
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label className={className.label}>
          Full Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => { return setName(e.target.value); }}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Email Address</label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => { return setEmail(e.target.value); }}
        />
      </div>
      <div className="pt-30">
        <label className={className.label}>Password</label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => { return setPassword(e.target.value); }}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          type="button"
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          onClick={onSubmmit}
        >
          Continue
        </button>
        <a
          className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-in"
          role="button"
        >
          SignIn
        </a>
      </div>
    </>
  );
}
