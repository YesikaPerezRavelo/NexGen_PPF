import { useDispatch } from "react-redux";
import { addItem } from "../../sections/Cart/CartContext";


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
      Add Test Product
    </button>
  );
};


export default TestAdd;
