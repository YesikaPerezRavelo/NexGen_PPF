import CartItem from "./CartItem";


const CartItemsTable = ({ cartProducts }) => {
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="card">
        <div className="card-header bg-dark text-white">
          No hay productos en el carrito
        </div>
        <div className="card-body text-center">
          <h5 className="card-title m-0">Carrito vacío</h5>
        </div>
      </div>
    );
  }


  return (
    <div className="table-responsive shadow-sm bg-white rounded">
      <table className="table align-middle m-0">
        <thead className="table-dark">
          <tr>
            <th style={{ width: 140 }}>Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th style={{ width: 180 }}>Cantidad</th>
            <th>Total</th>
            <th style={{ width: 80 }}></th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((p) => (
            <CartItem
              key={`cart-item-${p.id}`}
              id={p.id}
              name={p.name}
              image={p.image}
              price={p.price}
              initQuantity={p.quantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default CartItemsTable;
