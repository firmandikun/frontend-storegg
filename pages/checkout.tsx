import Image from "next/image";
import ChectoutDetail from "../components/organisms/CheckoutDetail";
import CheckoutItem from "../components/organisms/CheckoutItem";
import ChectoutConfirmation from "../components/organisms/ChectoutConfirmation";

export default function Checkout() {
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
               <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
        </div>
                 
                 
                 <CheckoutItem />
        <hr />
        <ChectoutDetail />
        <ChectoutConfirmation />
      </div>
    </section>
  );
}

export async function getServerSideProps({ req } : any) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
