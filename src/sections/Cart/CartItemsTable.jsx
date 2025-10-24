import CartItem from "./CartItem";

export default function CartItemsTable({ cartProducts }) {
  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="alert alert-secondary text-center">
       Cart is empty.
      </div>
    );

  return (
    <div className="table-responsive shadow-sm bg-white rounded">
      <table className="table align-middle m-0">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((p) => (
            <CartItem
              key={`cart-item-${p.id}`}
              id={p.id}
              name={p.name ?? p.title}
              image={p.image}
              price={p.price}
              initQuantity={p.quantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
