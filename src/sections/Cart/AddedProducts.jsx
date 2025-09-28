// src/sections/Cart/AddedProducts.jsx
import CartItemsTable from "../../components/Cart/CartItemsTable";
import { InputGroup, Form, Button } from "react-bootstrap";


const AddedProducts = ({ cartProducts }) => {
  return (
    <section className="d-flex flex-column gap-3">
      <CartItemsTable cartProducts={cartProducts} />


      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between">
        <InputGroup style={{ maxWidth: 420 }}>
          <Form.Control placeholder="Cupón de descuento" />
          <Button variant="secondary">Aplicar</Button>
        </InputGroup>


        <Button variant="outline-secondary">Actualizar carrito</Button>
      </div>
    </section>
  );
};


export default AddedProducts;
