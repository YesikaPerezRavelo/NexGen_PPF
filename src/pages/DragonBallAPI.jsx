import { useMemo, useState } from "react";
import useDragonBallProducts from "../hooks/useDragonBallProducts";
import { DEFAULT_IMAGE } from "../constants/shop";
import { dispatchAddToCart } from "../utils/cart";
import { toastAdded } from "../components/ToastSuccess";


import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";
import ProductGrid from "../components/ProductGrid";
import ShowMoreButton from "../components/ShowMoreButton";
import EmptyState from "../components/EmptyState";


export default function DragonBallAPI({ onAddToCart }) {
  const { items, loading, error } = useDragonBallProducts();
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);


  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return items.filter((c) => (c.name || "").toLowerCase().includes(needle));
  }, [items, q]);


  const visible = filtered.slice(0, limit);
  const canShowMore = filtered.length > limit;


  const handleAdd = (item) => {
    const payload = {
      id: item.id,
      name: item.name,
      image: item.image || DEFAULT_IMAGE,
      price: item.price,
    };
    dispatchAddToCart(payload);
    onAddToCart?.(payload);
    toastAdded();
  };


  return (
    <div className="py-5" style={{ marginTop: "5rem", paddingLeft: "3rem", paddingRight: "3rem" }}>
      <SearchBar q={q} setQ={setQ} />


      {loading && <LoadingSpinner />}
      <ErrorState message={error} />


      {!loading && !error && (
        <>
          {visible.length ? (
            <>
              <ProductGrid items={visible} onAdd={handleAdd} />
              <ShowMoreButton
                canShowMore={canShowMore}
                onClick={() => setLimit((n) => n + 12)}
              />
            </>
          ) : (
            <EmptyState label="No characters found" />
          )}
        </>
      )}
    </div>
  );
}
