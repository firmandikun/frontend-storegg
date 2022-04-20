import { useEffect, useState } from "react";

export default function CheckoutItem() {
  const [user, setUser] = useState({
    thumbnail: "",
    name: "",
    category: {
      name: "",
    },
  });
  useEffect(() => {
    const users = localStorage.getItem("data-item");
    const dataItemLocal = JSON.parse(users!);
    setUser(dataItemLocal);
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <img src={`${IMG}/${user.thumbnail}`} className="img-fluid" alt="" />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">
          {user.name}
          :
          <br />
          The New Battle 2021
        </p>
        <p className="color-palette-2 m-0">
          Category:
          {" "}
          {user.category.name}
        </p>
      </div>
    </div>
  );
}
