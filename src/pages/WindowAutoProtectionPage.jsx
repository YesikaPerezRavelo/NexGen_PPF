import WindowAuto from "../components/WindowAuto";

export default function AutomotiveWindowPage({ onAddToCart }) {
  return (
    <div className="container py-5" style={{ marginTop: "5rem" }}>
      <h2 className="fw-bold mb-4">
        Automotive <span className="text-danger">Window Films</span>
      </h2>

      <WindowAuto onAddToCart={onAddToCart} />
    </div>
  );
}
