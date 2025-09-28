import { useSelector } from "react-redux";
import TestAdd from "../components/test/TestAdd";
import AddedProducts from "../sections/Cart/AddedProducts";


const Cart = () => {
  const cartProducts = useSelector((state) => state.cart);


  const subtotal = Math.round(
    cartProducts
      .map((p) => p.subtotal ?? (p.price * p.quantity))
      .reduce((acc, n) => acc + n, 0) * 100
  ) / 100;


  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Tu carrito</h2>
        <TestAdd />
      </div>


      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <AddedProducts cartProducts={cartProducts} />
        </div>


        <div className="col-12 col-lg-4">
          <div className="card shadow-sm position-sticky" style={{ top: 16 }}>
            <div className="card-body">
              <h5 className="card-title">Resumen</h5>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <hr />
              <button className="btn btn-success w-100">
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Cart;
