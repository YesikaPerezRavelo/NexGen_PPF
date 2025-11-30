import { Helmet } from "react-helmet-async";
import { useCart } from "../sections/Cart/CartContext";
import CartItemsTable from "../sections/Cart/CartItemsTable";
import SummaryCard from "../sections/Cart/SummaryCard";


export default function Cart() {
  const { cart, total, clearCart } = useCart();


  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Cart | NexGenPPF</title>
        <meta
          name="description"
          content="View the products in your cart and proceed to checkout at NexGen PPF."
        />
      </Helmet>


      <div className="container py-5 pt-0" style={{ marginTop: "10rem" }}>
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <CartItemsTable cartProducts={cart} />
          </div>


          <div className="col-12 col-lg-4">
            <SummaryCard
              subtotal={total}
              onCheckout={() => alert('Checkout coming soon')}
              onClear={clearCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
