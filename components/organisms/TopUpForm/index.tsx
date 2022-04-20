import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { NominalsTypes, PaymentTypes } from "../../../services/data-type";
import Nominals from "./Nominals";
import Paymets from "./Paymets";

interface TopUpFormProps {
  nominals: NominalsTypes[];
  payments: PaymentTypes[]
}

export default function TopUpForm(props: TopUpFormProps) {
  const { nominals, payments } = props;
  const [verifyID, setVerifyID] = useState(" ");
  const [bankAccountName, setBankAccountName] = useState(" ");
  const [nominalsItems, setNominalsItems] = useState({});
  const [paymentsItems, setPaymentsItems] = useState({});

  const onNominalsItem = (data: NominalsTypes) => {
    setNominalsItems(data);
  };

  const onPaymentsItems = (payment, bank) => {
    const data = {
      payment, bank,
    };
    setPaymentsItems(data);
  };

  const router = useRouter();

  const onSubmmit = () => {
    if (verifyID === " " || bankAccountName === " " || nominalsItems === " " || paymentsItems === " ") {
      toast.error("silahkan isi semua formnya");
    } else {
      const data = {
        verifyID,
        bankAccountName,
        nominalsItems,
        paymentsItems,
      };

      localStorage.setItem("data-topup", JSON.stringify(data));
      router.push("/checkout");
    }
  };

  return (
    <form action="./checkout.html" method="POST">
      <div className="pt-md-50 pt-30">
        <div className="">
          <label htmlFor="ID" className="form-label text-lg fw-medium color-palette-1 mb-10">
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            name="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(e) => { return setVerifyID(e.target.value); }}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Nominal Top Up</p>
        <div className="row">
          {
            nominals?.map((nominal) => {
              return (
                <Nominals
                  key={nominal._id}
                  coinQuantity={nominal.coinQuantity}
                  coinName={nominal.coinName}
                  price={nominal.price}
                  _id={nominal._id}
                  onChange={() => { return onNominalsItem(nominal); }}
                />
              );
            })
          }
          <div className="col-lg-4 col-sm-6" />
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">Payment Method</p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments?.map((payment) => {
              return payment.banks.map((bank) => {
                return (
                  <Paymets
                    key={bank._id}
                    bankID={bank._id}
                    type={payment.type}
                    name={bank.bankName}
                    onChange={() => { return onPaymentsItems(payment, bank); }}
                  />
                );
              });
            })}
            <div className="col-lg-4 col-sm-6" />
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label htmlFor="bankAccount" className="form-label text-lg fw-medium color-palette-1 mb-10">
          Bank
          Account
          Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Names"
          value={bankAccountName}
          onChange={(e) => { return setBankAccountName(e.target.value); }}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          onClick={onSubmmit}
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
