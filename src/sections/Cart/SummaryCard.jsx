export default function SummaryCard({ subtotal, onCheckout, onClear }) {
  return (
    <div className="card shadow-sm position-sticky" style={{ top: 16 }}>
      <div className="card-body">
        <h5 className="card-title">Total</h5>
        <div className="d-flex justify-content-between">
          <span>Total:</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <hr />
        <div className="d-grid gap-2">
          <button className="btn btn-success" onClick={onCheckout}>
            Finish purchase
          </button>
          <button className="btn btn-outline-danger" onClick={onClear}>
            Empty cart
          </button>
        </div>
      </div>
    </div>
  );
}
