import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartView = () => {
  const { cart, total, removeItem } = useCart();

  return (
    <>
      <h1>CARRITO</h1>
      <div>
        {cart.map((prod) => {
          return (
            <div className={classes.cart} key={prod.id}>
              <h2>{prod.name}</h2>
              <h3>Cantidad: {prod.quantity}</h3>
              <h3>Precio unidad: ${prod.price}</h3>
              <h3>Subtotal: ${prod.quantity * prod.price}</h3>
              <button
                className={classes.removeItem}
                onClick={() => removeItem(prod.id)}
              >
                ELIMINAR
              </button>
            </div>
          );
        })}
      </div>
      <div className={classes.checkout}>
        <h1>Total de la compra: ${total}</h1>
        <Link className={classes.link} to="/checkout">
          Checkout
        </Link>
      </div>
    </>
  );
};

export default CartView;