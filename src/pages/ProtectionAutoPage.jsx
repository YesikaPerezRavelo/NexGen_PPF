import { Helmet } from "react-helmet-async";
import MockApiProductsView from "../components/MockAPI/mockApiProducts";


export default function MockApiShop({ onAddToCart }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>MockAPI | NexGenPPF</title>
        <meta
          name="keywords"
          content="mock api, test products"
        />
      </Helmet>


      <div className="container py-5" style={{ marginTop: "5rem" }}>
        <h2 className="fw-bold mb-4">
          Mock <span className="text-danger">API Products</span>
        </h2>


        <MockApiProductsView onAddToCart={onAddToCart} />
      </div>
    </>
  );
}
