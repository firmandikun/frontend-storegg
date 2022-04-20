import { atob } from "buffer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { JWTPayloadTypes, UserTypes } from "../../../services/data-type";

export default function Auth() {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    id: "",
    name: "",
    username: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = window.atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setLogin(true);
      setUser(userFromPayload);
    }
  }, []);

  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/");
    setLogin(false);
  };
  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/avatar-1.png"
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul className="dropdown-menu border-0" aria-labelledby="dropdownMenuLink">
            <li>
              <Link href="/member">
                <a className="dropdown-item text-lg color-palette-2">
                  My
                  {" "}
                  {user.name}
                </a>
              </Link>
            </li>
            <li><Link href="/"><a className="dropdown-item text-lg color-palette-2" href="#">Wallet</a></Link></li>
            <li>
              <Link href="/member/edit-profile"><a className="dropdown-item text-lg color-palette-2" href="#">Account Settings</a></Link>
            </li>
            <li><button className="dropdown-item text-lg color-palette-2" onClick={onLogOut}>Log Out</button></li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <a
        className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
        href="/sign-in"
      >
        SignIn
      </a>
    </li>
  );
}
