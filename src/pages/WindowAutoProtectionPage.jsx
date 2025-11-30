import { Helmet } from "react-helmet-async";
import WindowAuto from "../components/WindowAuto";


export default function AutomotiveWindowPage({ onAddToCart }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Automotive Window Films | NexGen PPF</title>
        <meta
          name="description"
          content="Explore our selection of automotive window films including chameleon, nano carbon, nano ceramic and more."
        />
      </Helmet>


      <div className="container py-5" style={{ marginTop: "5rem" }}>
        <h2 className="fw-bold mb-4">
          Automotive <span className="text-danger">Window Films</span>
        </h2>


        <WindowAuto onAddToCart={onAddToCart} />
      </div>
    </>
  );
}
