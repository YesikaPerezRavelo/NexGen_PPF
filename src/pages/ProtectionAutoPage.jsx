import ProtectionProducts from "../components/ProtectionProducts";

export default function AutomotiveProtectionPage({ onAddToCart }) {
  return (
    <div className="container py-5" style={{ marginTop: "5rem" }}>
      <h2 className="fw-bold mb-4">
        Automotive <span className="text-danger">Protection</span>
      </h2>
      <ProtectionProducts onAddToCart={onAddToCart} />
    </div>
  );
}
