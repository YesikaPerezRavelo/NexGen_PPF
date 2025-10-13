// export default function Cart() {
//   return (
//     <div className="container py-5 text-center">
//       <h1>🛒 Carrito</h1>
//       <p>Esta es la página del carrito. </p>
//     </div>
//   );
// }
import { useCart } from "../sections/Cart/CartContext";
import CartItemsTable from "../sections/Cart/CartItemsTable";
import SummaryCard from "../sections/Cart/SummaryCard";


export default function Cart() {
  const { cart, total, clearCart } = useCart();


  return (
    <div className="container py-5 pt-0" style={{ marginTop: "10rem" }}>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <CartItemsTable cartProducts={cart} />
        </div>


        <div className="col-12 col-lg-4">
          <SummaryCard
            subtotal={total}
            onCheckout={() => alert("Checkout pendiente")}
            onClear={clearCart}
          />
        </div>
      </div>
    </div>
  );
}



