import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getGameCategory } from "../services/player";
import { setSignUp } from "../services/auth";

export default function SignupPhoto() {
  const [data, setData] = useState([]);
  const [favorite, setFovorite] = useState("");
  const [upload, setUpload] = useState<any>("");
  const [localForm, setLocalForm] = useState({
    name: " ",
    email: " ",
  });

  const router = useRouter();

  const getDataCategory = useCallback(async () => {
    const response = await getGameCategory();
    setData(response);
    setFovorite(response[0]._id);
  }, []);

  useEffect(() => {
    getDataCategory();
  }, []);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("use-form") || "{}");
    setLocalForm(local);
  }, []);

  //   console.log("local storege user-form :", localForm);
  const onsubmit = async () => {
    const local = JSON.parse(localStorage.getItem("use-form") || "{}");

    const datas = new FormData();

    datas.append("image", upload);
    datas.append("email", local.email);
    datas.append("name", local.name);
    datas.append("password", local.password);
    datas.append("username", local.name);
    datas.append("phoneNumber", "08123456789");
    datas.append("role", "user");
    datas.append("status", "Y");
    datas.append("favorite", favorite);

    const resault = await setSignUp(datas);

    if (resault.error) {
      toast.error(resault.message);
    } else {
      toast.success("Registrasi berhasil");
      router.push("/sign-up-success");
      localStorage.removeItem("use-form");
    }
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    <Image src={upload || "/icon/uploads.svg"} alt="" width={120} height={120} className="img-uploads" />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(e) => { setUpload(URL.createObjectURL(e.target.files![0])); }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                {" "}
                {localForm.name}
                {" "}
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                {" "}
                { localForm.email }
                {" "}
              </p>
              <div className="pt-50 pb-50">
                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  onChange={(e) => { return setFovorite(e.target.value); }}
                >
                  {data?.map((item : any) => {
                    return (
                      <option value={item._id} key={item._id}>{item.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                type="button"
                onClick={onsubmit}
              >
                Create My Account
              </button>
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
