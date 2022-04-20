import { useEffect, useState } from "react";

export default function ChectoutDetail() {
  const [dataTopup, setDataTopup] = useState({
    verifyIdD: "",
    nominalsItems: {
      price: 0,
      coinName: "",
      coinQuantity: 0,
      _id: "",
    },
    paymentsItems: {
      payment: {
        type: "",
        _id: "",
      },
      bank: {
        bankName: "",
        name: "",
        noRekening: "",
        _id: "",
      },
    },
    bankAccountName: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("data-topup");
    const localTopup = JSON.parse(data!);

    setDataTopup(localTopup);
  }, []);

  const itemPrice = dataTopup.nominalsItems?.price;
  const tax = dataTopup.nominalsItems?.price * (10 / 100);
  const total = itemPrice + tax;

  return (
    <>
      <div className="purchase pt-md-50 pt-30">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Purchase Details</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Game ID
          <span className="purchase-details">
            masayoshizero
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Order ID
          <span className="purchase-details">
            #GG001
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Item
          <span className="purchase-details">
            {dataTopup.nominalsItems.coinQuantity}
            {" "}
            {dataTopup.nominalsItems.coinName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Price
          <span className="purchase-details">
            {itemPrice}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Tax (10%)
          <span className="purchase-details">
            {tax}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Total
          <span className="purchase-details color-palette-4">
            {total}
          </span>
        </p>
      </div>
      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">Payment Informations</h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account
          <span className="purchase-details">
            {dataTopup.bankAccountName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type
          <span className="payment-details">Worldwide Transfer</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name
          <span className="payment-details">{dataTopup.paymentsItems?.bank.bankName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name
          <span className="payment-details">
            {dataTopup.paymentsItems?.bank.name}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number
          <span className="payment-details">
            {dataTopup.paymentsItems?.bank.noRekening}
          </span>
        </p>
      </div>
    </>
  );
}
