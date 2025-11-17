import BuildingProducts from "../components/BuildingProducts";

export default function ArchitecturalPage({ onAddToCart }) {
  return (
    <div className="container py-5" style={{ marginTop: "5rem" }}>
      <h2 className="fw-bold mb-4">
        Architectural <span className="text-danger">Products</span>
      </h2>
      <BuildingProducts onAddToCart={onAddToCart} />
    </div>
  );
}
