import { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


export default function CartItem({ id, name, image, price, initQuantity = 1 }) {
  const [quantity, setQuantity] = useState(initQuantity);
  const { updateItem, removeItem } = useCart();


  useEffect(() => {
    updateItem({ id, name, image, price, quantity });
  }, [quantity]);


  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => quantity > 1 && setQuantity((q) => q - 1);


  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete this item?",
      text: `Would you like "${name}" to delete from the cart?`,
      imageUrl: "./images/sweetAlertB.webp",
      showCancelButton: true,
      confirmButtonColor: "rgba(59, 58, 58, 1)",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        Swal.fire({
          title: "Deleted!",
          text: `"${name}" was deleted from the cart.`,
          imageUrl: "./images/sweetAlert.webp",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };


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
        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
