import { useDispatch } from "react-redux";
import { addItem } from "../../features/cart/cartSlice";


const TestAdd = () => {
  const dispatch = useDispatch();


  const handleClick = () => {
    dispatch(addItem({
      id: "test-1",
      name: "Producto de prueba",
      image: "/images/test.jpg",
      price: 100,
      quantity: 1,
      subtotal: 100,
    }));
  };


  return (
    <button onClick={handleClick} className="btn btn-danger">
      Agregar producto test
    </button>
  );
};


export default TestAdd;
