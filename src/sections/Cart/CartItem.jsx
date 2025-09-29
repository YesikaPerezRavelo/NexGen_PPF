import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from "../../features/cart/cartSlice";


const CartItem = ({ id, name, image, price, stock = 10, initQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initQuantity);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);


  // Actualiza el item en el store cada vez que cambia la cantidad
  useEffect(() => {
    const current = cartProducts.find((p) => p.id === id) ?? {};
    const subtotal = Math.round(Number(price) * quantity * 100) / 100;
    dispatch(updateItem({ ...current, id, name, image, price, quantity, subtotal }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);


  const increase = () => quantity < stock && setQuantity((q) => q + 1);
  const decrease = () => quantity > 1 && setQuantity((q) => q - 1);
  const remove = () => dispatch(deleteItem(id));


  const totalPrice = (Number(price) * quantity).toFixed(2);


  return (
    <tr>
      <td>
        <div className="border rounded overflow-hidden" style={{ width: 96, height: 96 }}>
          <img
            src={image}
            alt={name}
            className="img-fluid"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </td>


      <td className="fw-semibold">{name}</td>


      <td>${Number(price).toFixed(2)}</td>


      <td>
        <div className="input-group" style={{ maxWidth: 160 }}>
          <button className="btn btn-outline-secondary" onClick={decrease}>−</button>
          <input className="form-control text-center" value={quantity} readOnly />
          <button className="btn btn-outline-secondary" onClick={increase}>+</button>
        </div>
      </td>


      <td className="fw-bold">${totalPrice}</td>


      <td className="text-end">
        <button className="btn btn-outline-danger btn-sm" onClick={remove} title="Eliminar">
          Quitar
        </button>
      </td>
    </tr>
  );
};


export default CartItem;
