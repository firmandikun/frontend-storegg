import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Footer from "../../components/organisms/Footer";
import Navbar from "../../components/organisms/Navbar";
import TopUpForm from "../../components/organisms/TopUpForm";
import TopUpItem from "../../components/organisms/TopUpItem";
import { GameItemTypes, NominalsTypes, PaymentTypes } from "../../services/data-type";
import { getDetailVoucher } from "../../services/player";

interface DetailProps {
  dataItem: GameItemTypes;
  nominalss: NominalsTypes[];
  paymentss: PaymentTypes[];
}

export default function Detail({ dataItem, nominalss, paymentss }: DetailProps) {
  const { query, isReady } = useRouter();
  const [detail, setDetail] = useState<any>();
  const [nominals, setNominals] = useState<any>();
  const [payments, setPayments] = useState<any>();

  const getDetailPlayer = useCallback(async (id) => {
    const response = await getDetailVoucher(id);
    if (response !== undefined) {
      setDetail(response.detail);
      setNominals(response.detail.nominals);
      setPayments(response.payment);
      localStorage.setItem("data-item", JSON.stringify(response.detail));
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      getDetailPlayer(query.id);
    }
  }, [query]);
  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">Top Up</h2>
            <p className="text-lg color-palette-1 mb-0">Perkuat akun dan jadilah pemenang</p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem type="mobile" data={detail} />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              <TopUpItem type="desktop" data={detail} />
              <hr />
              <TopUpForm nominals={nominals} payments={payments} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
