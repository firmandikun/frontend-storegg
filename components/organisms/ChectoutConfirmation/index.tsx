import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";

export default function ChectoutConfirmation() {
  const [checkbox, setCheckBox] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const dataItemLocal = localStorage.getItem("data-item");
    const dataTopUpLocal = localStorage.getItem("data-topup");

    const dataItem = JSON.parse(dataItemLocal!);
    const dataTopUp = JSON.parse(dataTopUpLocal!);

    console.log("data top up :", dataTopUp);
    

    if (!checkbox) {
      toast.error("Pastikan anda telah melakukan pembayaran");
      // [CODE UPDATE] menggagalkan checkout jika checkbox false
      return;
    }

    const data = {
      voucher: dataItem._id,
      nominal: dataTopUp.nominalsItems._id,
      payment: dataTopUp.paymentsItems.payment._id,
      bank: dataTopUp.paymentsItems.bank._id,
      name: dataTopUp.bankAccountName,
      accountUser: dataTopUp.verifyID,
    };

    console.log("data checout :", data);
    

    const response = await setCheckout(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      // [CODE UPDATE] memindahkan router.push sebelum toast
      router.push("/complete-checkout");
      toast.success("Checkout Berhasil");
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" checked={checkbox} onChange={() => { return setCheckBox(!checkbox); }} />
        <span className="checkmark" />
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
          type="button"
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
