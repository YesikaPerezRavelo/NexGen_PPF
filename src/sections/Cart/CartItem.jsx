import { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";

export default function CartItem({ id, name, image, price, initQuantity = 1 }) {
  const [quantity, setQuantity] = useState(initQuantity);
  const { updateItem, removeItem } = useCart();

  useEffect(() => {
    updateItem({ id, name, image, price, quantity });
  }, [quantity]); // eslint-disable-line react-hooks/exhaustive-deps

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => quantity > 1 && setQuantity((q) => q - 1);

  return (
    <tr>
      <td>
        <img
          src={image}
          alt={name}
          style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8 }}
        />
      </td>
      <td>{name}</td>
      <td>${price.toFixed(2)}</td>
      <td>
        <div className="input-group" style={{ maxWidth: 160 }}>
          <button className="btn btn-outline-secondary" onClick={decrease}>−</button>
          <input className="form-control text-center" value={quantity} readOnly />
          <button className="btn btn-outline-secondary" onClick={increase}>+</button>
        </div>
      </td>
      <td>${(price * quantity).toFixed(2)}</td>
      <td className="text-end">
        <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(id)}>
          Quitar
        </button>
      </td>
    </tr>
  );
}
