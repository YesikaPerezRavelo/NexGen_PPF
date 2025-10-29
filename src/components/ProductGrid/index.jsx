import PropTypes from "prop-types";
import ProductCard from "../ProductCard";


export default function ProductGrid({ items, onAdd }) {
  // si no hay array o está vacío, no renderiza nada (o podrías mostrar un EmptyState)
  if (!Array.isArray(items) || items.length === 0) return null;


  return (
    <div className="row g-4">
      {items
        .filter(Boolean) // evita null/undefined dentro del array
        .map((c) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={c?.id ?? `${c?.name}-${Math.random()}`}>
            <ProductCard item={c} onAdd={onAdd} />
          </div>
        ))}
    </div>
  );
}


ProductGrid.propTypes = {
  items: PropTypes.array,
  onAdd: PropTypes.func,
};
